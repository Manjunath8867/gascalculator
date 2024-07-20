document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const gasType = document.getElementById('gas-type').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const inputUnit = document.getElementById('input-unit').value;
    const outputUnit = document.getElementById('output-unit').value;

    if (isNaN(inputValue) || inputValue <= 0) {
        document.getElementById('result').innerText = 'Please enter a valid input value.';
        return;
    }

    const molecularWeights = {
        'nitrogen': 28.02,
        'oxygen': 32.00,
        'helium': 4.00,
        'argon': 39.95,
        'hydrogen': 2.02,
        'carbon-dioxide': 44.01,
        'methane': 16.04,
        'ethane': 30.07,
        'propane': 44.10,
        'butane': 58.12,
        'ammonia': 17.03,
        'sulfur-hexafluoride': 146.06,
        'neon': 20.18,
        'krypton': 83.80,
        'xenon': 131.29,
        'chlorine': 70.90,
        'fluorine': 38.00,
        'phosphine': 34.00,
        'diborane': 27.67,
        'nitrous-oxide': 44.01,
        'ethylene': 28.05,
        'acetylene': 26.04,
        'carbon-monoxide': 28.01,
        'bromine': 159.80,
        'iodine': 253.80,
        'hydrogen-chloride': 36.46,
        'hydrogen-fluoride': 20.01,
        'silane': 32.12,
        'tetrafluoromethane': 88.00,
        'sulfur-dioxide': 64.07
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

    if (!molecularWeight) {
        document.getElementById('result').innerText = 'Gas type not found.';
        return;
    }

    if (inputUnit === 'cubic-meters' && outputUnit === 'kilograms') {
        result = convertToKg(inputValue, molecularWeight);
    } else if (inputUnit === 'kilograms' && outputUnit === 'cubic-meters') {
        result = convertToCubicMeters(inputValue, molecularWeight);
    }

    document.getElementById('result').innerText = `Result: ${result.toFixed(4)} ${outputUnit}`;
});
