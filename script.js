document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const gasType = document.getElementById('gas-type').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const inputUnit = document.getElementById('input-unit').value;
    const outputUnit = document.getElementById('output-unit').value;

    // Molecular weights for different gases
    const molecularWeights = {
        'nitrogen': 28.02,
        'oxygen': 32.00,
        'helium': 4.00,
        'argon': 39.95
    };

    function calculateDensity(molecularWeight) {
        return molecularWeight / 24.63;
    }

    function convertToKg(cubicMeters, molecularWeight) {
        const density = calculateDensity(molecularWeight);
        return cubicMeters * density;
    }

    function convertToCubicMeters(kg, molecularWeight) {
        const density = calculateDensity(molecularWeight);
        return kg / density;
    }

    let result;
    const molecularWeight = molecularWeights[gasType];

    if (inputUnit === 'cubic-meters' && outputUnit === 'kilograms') {
        result = convertToKg(inputValue, molecularWeight);
    } else if (inputUnit === 'kilograms' && outputUnit === 'cubic-meters') {
        result = convertToCubicMeters(inputValue, molecularWeight);
    }

    document.getElementById('result').innerText = `Result: ${result.toFixed(4)} ${outputUnit}`;
});
