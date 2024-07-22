document.addEventListener('DOMContentLoaded', function() {
    // Populate gas type dropdown
    const gases = {
        'AR': { molarWeight: 39.948, density: 1.784 },
        'H2': { molarWeight: 2.016, density: 0.08988 },
        'O2': { molarWeight: 32.00, density: 1.429 },
        'CO2': { molarWeight: 44.01, density: 1.977 },
        'N2': { molarWeight: 28.014, density: 1.251 },
        'Ethylene': { molarWeight: 28.054, density: 1.178 }
        // Add more gases as needed
    };

    const gasTypeSelect = document.getElementById('gas-type');
    for (const gas in gases) {
        const option = document.createElement('option');
        option.value = gas;
        option.text = gas;
        gasTypeSelect.add(option);
    }

    // Component calculator form submission
    document.getElementById('component-calculator-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const comp1 = document.getElementById('comp1').value;
        const comp1Conc = parseFloat(document.getElementById('comp1-conc').value);
        const comp2 = document.getElementById('comp2').value;
        const comp2Conc = parseFloat(document.getElementById('comp2-conc').value);
        const comp3 = document.getElementById('comp3').value;
        const comp3Conc = parseFloat(document.getElementById('comp3-conc').value || 0);
        const wc = parseFloat(document.getElementById('wc').value);
        const pressure = parseFloat(document.getElementById('pressure').value);

        if (isNaN(comp1Conc) || isNaN(comp2Conc) || isNaN(wc) || isNaN(pressure) || comp1Conc <= 0 || comp2Conc <= 0 || wc <= 0 || pressure <= 0) {
            document.getElementById('component-result').innerText = 'Please enter valid input values.';
            return;
        }

        const calculateWeight = (comp, conc) => {
            return pressure * wc * gases[comp].molarWeight * (conc / 100) * 0.0402;
        };

        const calculateComponentPressure = (totalPressure, conc) => {
            return totalPressure * (conc / 100);
        };

        const weightComp1 = calculateWeight(comp1, comp1Conc);
        const weightComp2 = calculateWeight(comp2, comp2Conc);
        const weightComp3 = comp3Conc > 0 ? calculateWeight(comp3, comp3Conc) : 0;

        const pressureComp1 = calculateComponentPressure(pressure, comp1Conc);
        const pressureComp2 = calculateComponentPressure(pressure, comp2Conc);
        const pressureComp3 = comp3Conc > 0 ? calculateComponentPressure(pressure, comp3Conc) : 0;

        document.getElementById('component-result').innerHTML = `
            <p>Component 1 Weight: ${weightComp1.toFixed(2)} KG</p>
            <p>Component 1 Pressure: ${pressureComp1.toFixed(2)} KG/CM2</p>
            <p>Component 2 Weight: ${weightComp2.toFixed(2)} KG</p>
            <p>Component 2 Pressure: ${pressureComp2.toFixed(2)} KG/CM2</p>
            ${comp3Conc > 0 ? `<p>Component 3 Weight: ${weightComp3.toFixed(2)} KG</p>` : ''}
            ${comp3Conc > 0 ? `<p>Component 3 Pressure: ${pressureComp3.toFixed(2)} KG/CM2</p>` : ''}
        `;
    });

    // Converter form submission
    document.getElementById('converter-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const gas = document.getElementById('gas-type').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const fromUnit = document.getElementById('from-unit').value;
        const toUnit = document.getElementById('to-unit').value;

        if (isNaN(quantity) || quantity <= 0) {
            document.getElementById('converter-result').innerText = 'Please enter a valid quantity.';
            return;
        }

        const convert = (gas, qty, from, to) => {
            const density = gases[gas].density;
            let convertedQty = qty;

            if (from === 'kg' && to === 'm3') {
                convertedQty = qty / density;
            } else if (from === 'm3' && to === 'kg') {
                convertedQty = qty * density;
            } else if (from === 'ltr' && to === 'm3') {
                convertedQty = qty / 1000;
            } else if (from === 'm3' && to === 'ltr') {
                convertedQty = qty * 1000;
            } else if (from === 'kg' && to === 'ltr') {
                convertedQty = (qty / density) * 1000;
            } else if (from === 'ltr' && to === 'kg') {
                convertedQty = (qty / 1000) * density;
            }

            return convertedQty;
        };

        const result = convert(gas, quantity, fromUnit, toUnit);
        document.getElementById('converter-result').innerHTML = `
            <p>${quantity} ${fromUnit} of ${gas} is equal to ${result.toFixed(2)} ${toUnit}</p>
        `;
    });
});
