document.getElementById('calculator-form').addEventListener('submit', function(e) {
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
        document.getElementById('result').innerText = 'Please enter valid input values.';
        return;
    }

    const gasData = {
        'AR': { molarWeight: 39.948 },
        'H2': { molarWeight: 2.016 },
        'O2': { molarWeight: 32.00 },
        'CO2': { molarWeight: 44.01 },
        'N2': { molarWeight: 28.014 },
        'Ethylene': { molarWeight: 28.054 }
        // Add more gases as needed
    };

    const calculateWeight = (comp, conc) => {
        return pressure * wc * gasData[comp].molarWeight * (conc / 100) * 0.0402;
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

    document.getElementById('result').innerHTML = `
        <p>Component 1 Weight: ${weightComp1.toFixed(2)} KG</p>
        <p>Component 1 Pressure: ${pressureComp1.toFixed(2)} KG/CM2</p>
        <p>Component 2 Weight: ${weightComp2.toFixed(2)} KG</p>
        <p>Component 2 Pressure: ${pressureComp2.toFixed(2)} KG/CM2</p>
        ${comp3Conc > 0 ? `<p>Component 3 Weight: ${weightComp3.toFixed(2)} KG</p>` : ''}
        ${comp3Conc > 0 ? `<p>Component 3 Pressure: ${pressureComp3.toFixed(2)} KG/CM2</p>` : ''}
    `;
});
