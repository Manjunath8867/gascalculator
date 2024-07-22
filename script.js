document.addEventListener('DOMContentLoaded', function() {
    const gases = {
        'AR+H2(95:5)': { molecularWeight: 39.948 * 0.95 + 2 * 0.05 },
        'AR+O2(98:2)': { molecularWeight: 39.948 * 0.98 + 32 * 0.02 },
        // Add all other gases here
        'N2': { molecularWeight: 28.014 },
        'O2': { molecularWeight: 32 },
        'H2': { molecularWeight: 2 },
        // Continue adding gases...
    };

    const comp1Select = document.getElementById('comp1');
    const comp2Select = document.getElementById('comp2');
    const comp3Select = document.getElementById('comp3');
    const gasTypeSelect = document.getElementById('gas-type');

    Object.keys(gases).forEach(gas => {
        const option = document.createElement('option');
        option.value = gas;
        option.text = gas;
        comp1Select.add(option.cloneNode(true));
        comp2Select.add(option.cloneNode(true));
        comp3Select.add(option.cloneNode(true));
        gasTypeSelect.add(option.cloneNode(true));
    });

    // Weight and Pressure Calculator form submission
    document.getElementById('weight-pressure-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const comp1 = document.getElementById('comp1').value;
        const comp1Conc = parseFloat(document.getElementById('comp1-conc').value) || 0;
        const comp2 = document.getElementById('comp2').value;
        const comp2Conc = parseFloat(document.getElementById('comp2-conc').value) || 0;
        const comp3 = document.getElementById('comp3').value;
        const comp3Conc = parseFloat(document.getElementById('comp3-conc').value) || 0;
        const wc = parseFloat(document.getElementById('wc').value);
        const pressure = parseFloat(document.getElementById('pressure').value);

        const totalConc = comp1Conc + comp2Conc + comp3Conc;

        if (totalConc !== 100) {
            alert('The total percentage of components must be 100%.');
            return;
        }

        const calcWeight = (pressure, wc, molecularWeight, conc) => 
            pressure * wc * molecularWeight * (conc / 100) * 0.0402;

        const weightComp1 = calcWeight(pressure, wc, gases[comp1].molecularWeight, comp1Conc);
        const weightComp2 = calcWeight(pressure, wc, gases[comp2].molecularWeight, comp2Conc);
        const weightComp3 = calcWeight(pressure, wc, gases[comp3]?.molecularWeight, comp3Conc || 0);

        const calcPressure = (pressure, conc) => pressure * (conc / 100);

        const pressureComp1 = calcPressure(pressure, comp1Conc);
        const pressureComp2 = calcPressure(pressure, comp2Conc);
        const pressureComp3 = calcPressure(pressure, comp3Conc);

        document.getElementById('weight-pressure-result').innerHTML = `
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

        const density = 1 / (gases[gas].molecularWeight / 24.63);

        const convert = (qty, from, to, density) => {
            let convertedQty = qty;

            if (from === 'kg' && to === 'm3') {
                convertedQty = qty / density;
            } else if (from === 'm3' && to === 'kg') {
                convertedQty = qty * density;
            }

            return convertedQty;
        };

        const result = convert(quantity, fromUnit, toUnit, density);
        document.getElementById('converter-result').innerHTML = `
            <p>${quantity} ${fromUnit} of ${gas} is equal to ${result.toFixed(2)} ${toUnit}</p>
        `;
    });
});
