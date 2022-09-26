import * as wasm from "./build/release.js";

/**
 * Extracts the 2D array of numbers of the Sudoku field from the HTML table.
 */
function getField() {
    const field = [];
    for (let y = 0; y < 9; y++) {
        const row = [];
        for (let x = 0; x < 9; x++) {
            // Since we only have td elements in the table, we can get the n-th td element
            const cellOffset = (y * 9) + x
            const cellDom = document.getElementsByTagName("td")[cellOffset]
            let cellValue = cellDom.innerText
            cellValue = (cellValue === "" || cellValue === "-" || cellValue == "_")? 0 : parseInt(cellValue)
            row.push(cellValue)
        }
        field.push(row);
    }
    return field;
}

/**
 * Writes the 2D array of numbers into the Sudoku field in the HTML table.
 */
function setField(field) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            const cellOffset = (y * 9) + x
            const cellValue = field[y][x]
            const cellDom = document.getElementsByTagName("td")[cellOffset]
            cellDom.innerText = (cellValue !== 0)? cellValue : ""
        }
    }
}

/**
 * Gets the sudoku field from the HTML DOM, solves it using the WASM module
 * and writes the result back to the DOM.
 */
function solveSudoku() {
    const inputField = getField()
    console.log({ inputField })

    // Check whether the input field is valid and show an error message if not
    const isValid = wasm.isSudokuValid(inputField)
    if (!isValid) {
        alert("Invalid Sudoku")
    }

    // Solve the Sudoku and measure the time it took
    const startTime = performance.now()
    const sudokuResult = wasm.solveSudoku(inputField)
    const endTime = performance.now()

    // Show result statistics
    document.getElementById("result").innerText = `Success: ${sudokuResult.success}\n`
        + `Tried Permutations: ${new Intl.NumberFormat().format(sudokuResult.tries)}\n`
        + `Time: ${endTime - startTime}ms`
    

    console.log(sudokuResult)

    // Update the HTML table with the result
    setField(sudokuResult.field)
}

/**
 * Gets called when the user clicks the "Solve" button
 */
document.getElementById("solve").addEventListener("click", () => {
    try {
        solveSudoku()
    } catch (e) {
        alert("Error: " + e)
    }
});

document.getElementById("clear").addEventListener("click", () => {
    try {
        setField([
            [0, 0, 0,	0, 0, 0,	0, 0, 0],
            [0, 0, 0,	0, 0, 0,	0, 0, 0],
            [0, 0, 0,	0, 0, 0,	0, 0, 0],

            [0, 0, 0,	0, 0, 0,	0, 0, 0],
            [0, 0, 0,	0, 0, 0,	0, 0, 0],
            [0, 0, 0,	0, 0, 0,	0, 0, 0],

            [0, 0, 0,	0, 0, 0,	0, 0, 0],
            [0, 0, 0,	0, 0, 0,	0, 0, 0],
            [0, 0, 0,	0, 0, 0,	0, 0, 0],
        ])
    } catch (e) {
        alert("Error: " + e)
    }
})