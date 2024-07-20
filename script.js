<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GasCalc</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>GasCalc</h1>
    </header>
    <main>
        <form id="calculator-form">
            <label for="gas-type">Select Gas Type:</label>
            <select id="gas-type">
                <option value="nitrogen">Nitrogen</option>
                <option value="oxygen">Oxygen</option>
                <option value="helium">Helium</option>
                <option value="argon">Argon</option>
                <option value="hydrogen">Hydrogen</option>
                <option value="carbon-dioxide">Carbon Dioxide</option>
                <option value="methane">Methane</option>
                <option value="ethane">Ethane</option>
                <option value="propane">Propane</option>
                <option value="butane">Butane</option>
                <option value="ammonia">Ammonia</option>
                <option value="sulfur-hexafluoride">Sulfur Hexafluoride</option>
                <option value="neon">Neon</option>
                <option value="krypton">Krypton</option>
                <option value="xenon">Xenon</option>
                <option value="chlorine">Chlorine</option>
                <option value="fluorine">Fluorine</option>
                <option value="phosphine">Phosphine</option>
                <option value="diborane">Diborane</option>
                <option value="nitrous-oxide">Nitrous Oxide</option>
                <option value="ethylene">Ethylene</option>
                <option value="acetylene">Acetylene</option>
                <option value="carbon-monoxide">Carbon Monoxide</option>
                <option value="bromine">Bromine</option>
                <option value="iodine">Iodine</option>
                <option value="hydrogen-chloride">Hydrogen Chloride</option>
                <option value="hydrogen-fluoride">Hydrogen Fluoride</option>
                <option value="silane">Silane</option>
                <option value="tetrafluoromethane">Tetrafluoromethane</option>
                <option value="sulfur-dioxide">Sulfur Dioxide</option>
            </select>

            <label for="input-value">Input Value:</label>
            <input type="number" id="input-value" required>

            <label for="input-unit">Input Unit:</label>
            <select id="input-unit">
                <option value="cubic-meters">Cubic Meters</option>
                <option value="kilograms">Kilograms</option>
            </select>

            <label for="output-unit">Output Unit:</label>
            <select id="output-unit">
                <option value="cubic-meters">Cubic Meters</option>
                <option value="kilograms">Kilograms</option>
            </select>

            <button type="submit">Calculate</button>
        </form>
        <div id="result"></div>
    </main>
    <footer>
        Created by Manjunath, PeenyaGas Bangalore
    </footer>
    <script src="script.js"></script>
</body>
</html>
