// Calculator Functions
function openCalculator() {
    document.getElementById('calculatorModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCalculator() {
    document.getElementById('calculatorModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('calculatorModal');
    if (event.target === modal) {
        closeCalculator();
    }
}

function calculateSolar() {
    // Get form values
    const name = document.getElementById('name').value;
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const consumption = parseFloat(document.getElementById('consumption').value);
    const propertyType = document.getElementById('propertyType').value;
    const city = document.getElementById('city').value;

    // Validation
    if (!name || !billAmount || !consumption || !propertyType || !city) {
        alert('Por favor completa todos los campos obligatorios (*)');
        return;
    }

    // Solar calculation logic
    const kwhPrice = billAmount / consumption; // Price per kWh
    const dailyConsumption = consumption / 30;
    
    // System sizing (considering 4.5 peak sun hours average in Colombia)
    const systemSizeKW = Math.ceil(dailyConsumption / 4.5);
    const numPanels = Math.ceil(systemSizeKW * 1000 / 450); // 450W panels
    
    // Cost calculation (prices in COP)
    const costPerWatt = 2800; // Average cost per watt installed
    const totalInvestment = systemSizeKW * 1000 * costPerWatt;
    
    // Savings calculation (assuming 90% offset)
    const monthlySavings = billAmount * 0.9;
    const yearlySavings = monthlySavings * 12;
    
    // Payback time
    const paybackYears = (totalInvestment / yearlySavings).toFixed(1);
    
    // CO2 reduction (0.4 kg CO2 per kWh in Colombia)
    const co2ReductionKg = consumption * 12 * 0.4;
    const co2ReductionTons = (co2ReductionKg / 1000).toFixed(1);

    // Display results
    document.getElementById('investment').textContent = `${totalInvestment.toLocaleString('es-CO')} COP`;
    document.getElementById('monthlySavings').textContent = `${monthlySavings.toLocaleString('es-CO')} COP`;
    document.getElementById('yearlySavings').textContent = `${yearlySavings.toLocaleString('es-CO')} COP`;
    document.getElementById('paybackTime').textContent = `${paybackYears} años`;
    document.getElementById('co2Reduction').textContent = `${co2ReductionTons} toneladas CO₂`;
    document.getElementById('systemSize').textContent = `${systemSizeKW} kW (${numPanels} paneles)`;

    // Show results
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });

    // Save data for WhatsApp message
    window.calculatorData = {
        name: name,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        city: city,
        billAmount: billAmount,
        consumption: consumption,
        propertyType: propertyType,
        investment: totalInvestment,
        monthlySavings: monthlySavings,
        paybackYears: paybackYears,
        systemSize: `${systemSizeKW} kW (${numPanels} paneles)`
    };
}

function contactSales() {
    if (!window.calculatorData) {
        alert('Por favor calcula tu proyecto solar primero');
        return;
    }
    
    const data = window.calculatorData;
    
    const message = `Hola Sun Tech! Soy ${data.name}, realicé el cálculo solar en su página web.

📊 *Mis datos:*
• Ciudad: ${data.city}
• Factura mensual: ${parseInt(data.billAmount).toLocaleString('es-CO')} COP
• Consumo: ${data.consumption} kWh/mes
• Tipo de propiedad: ${data.propertyType}
• Teléfono: ${data.phone}

💡 *Resultados del cálculo:*
• Inversión estimada: ${parseInt(data.investment).toLocaleString('es-CO')} COP
• Ahorro mensual: ${parseInt(data.monthlySavings).toLocaleString('es-CO')} COP
• Retorno de inversión: ${data.paybackYears} años
• Sistema recomendado: ${data.systemSize}

Me interesa recibir una cotización detallada para mi proyecto solar. ¿Cuándo podemos agendar una visita técnica?`;

    const whatsappURL = `https://wa.me/573106876100?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Optional: Send data to Google Sheets (if you want to keep leads)
function sendToSheet() {
    if (!window.calculatorData) return;
    
    const data = window.calculatorData;
    
    // Add additional fields
    data.roofArea = document.getElementById('roofArea').value;
    data.roofType = document.getElementById('roofType').value;
    data.timestamp = new Date().toISOString();
    
    // Replace with your Google Apps Script URL
    const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
    
    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.text())
    .then(res => console.log("Enviado a Google Sheets:", res))
    .catch(err => console.error("Error al enviar:", err));
}
