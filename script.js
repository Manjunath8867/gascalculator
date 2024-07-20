document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const gasType = document.getElementById('gas-type').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const inputUnit = document.getElementById('input-unit').value;
    const outputUnit = document.getElementById('output-unit').value;

    let conversionFactor;

    // Define conversion factors for different gases and units
    if (gasType === 'nitrogen') {
        if (inputUnit === 'liters' && outputUnit === 'kilograms') {
            conversionFactor = 0.0012506; // Example conversion factor
        } else if (inputUnit === 'cubic-meters' && outputUnit === 'kilograms') {
            conversionFactor = 1.2506; // Example conversion factor
        }
    }

    const result = inputValue * conversionFactor;
    document.getElementById('result').innerText = `Result: ${result} ${outputUnit}`;
});
