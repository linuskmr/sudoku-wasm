
class Sudoku {
	private static readonly LENGTH: u8 = 9
	private static readonly BOX_SIZE: u8 = 3
	private static readonly EMPTY_CELL: u8 = 0
	private static readonly CELL_MIN_VALUE: u8 = 1
	private static readonly CELL_MAX_VALUE: u8 = 9
	field: StaticArray<StaticArray<u8>>
	tries: u32 = 0

	constructor(field: StaticArray<StaticArray<u8>>) {
		this.field = field
	}

	/**
	 * Solves `this.field` in-place. Returns true if the field was successfully solved, or false if the field is not
	 * solvable.
	 */
	solve(): bool {
		// Check if field is valid
		if (!this.isValid()) {
			return false
		}

		// Search first free cell
		const firstEmptyCell: CellPosition | null = this.firstEmptyCellIndex()
		if (firstEmptyCell == null) {
			// Field is valid and no cells are empty -> already solved
			return true
		}

		this.field[firstEmptyCell.y][firstEmptyCell.x] = Sudoku.CELL_MIN_VALUE
		while (true) {
			this.tries++
			if (this.solve()) {
				return true
			}
			if (this.field[firstEmptyCell.y][firstEmptyCell.x] == Sudoku.CELL_MAX_VALUE) {
				break
			}
			this.field[firstEmptyCell.y][firstEmptyCell.x]++
		}
		// No valid value for current cell found
		this.field[firstEmptyCell.y][firstEmptyCell.x] = Sudoku.EMPTY_CELL
		return false
	}

	/**
	 * Checks whether the row specified by `y` is valid, i.e. does not contain any number twice. Empty cells (zeros)
	 * will be ignored.
	 */
	isValidRow(y: u8): bool {
		const foundNumbers = new StaticArray<bool>(Sudoku.CELL_MAX_VALUE+1)
		for (let x: u8 = 0; x < Sudoku.LENGTH; x++) {
			const cell = this.field[y][x]
			if (cell == Sudoku.EMPTY_CELL) {
				// Ignore empty cells
				continue
			}
			if (foundNumbers[cell]) {
				// This number was already found, so it exists twice
				return false
			}
			// Mark current number as found
			foundNumbers[cell] = true
		}
		return true
	}

	/**
	 * Checks whether the column specified by `x` is valid, i.e. does not contain any number twice. Empty cells (zeros)
	 * will be ignored.
	 */
	isValidColumn(x: u8): bool {
		const foundNumbers = new StaticArray<bool>(Sudoku.CELL_MAX_VALUE+1)
		for (let y: u8 = 0; y < Sudoku.LENGTH; y++) {
			const cell = this.field[y][x]
			if (cell == Sudoku.EMPTY_CELL) {
				// Ignore empty cells
				continue
			}
			if (foundNumbers[cell]) {
				// This number was already found, so it exists twice
				return false
			}
			// Mark current number as found
			foundNumbers[cell] = true
		}
		return true
	}

	/**
	 * Checks whether the box specified by `boxX` and `boxY` is valid, i.e. does not contain any number twice. Empty
	 * cells (zeros) will be ignored.
	 */
	isValidBox(boxX: u8, boxY: u8): bool {
		const foundNumbers = new StaticArray<bool>(Sudoku.CELL_MAX_VALUE+1)
		boxX *= Sudoku.BOX_SIZE
		boxY *= Sudoku.BOX_SIZE
		for (let y: u8 = boxY; y < boxX + Sudoku.BOX_SIZE; y++) {
			for (let x: u8 = boxX; x < boxY + Sudoku.BOX_SIZE; x++) {
			const cell = this.field[y][x]
			if (cell == Sudoku.EMPTY_CELL) {
				// Ignore empty cells
				continue
			}
			if (foundNumbers[cell]) {
				// This number was already found, so it exists twice
				return false
			}
			// Mark current number as found
			foundNumbers[cell] = true
			}
		}
		return true
	}

	/**
	 * Checks whether all rows and columns in `field` are valid, i.e. do not contain any number twice. Empty cells
	 * (zeros) will be ignored.
	 */
	allRowsAndColumnsValid(): bool {
		for (let i: u8 = 0; i < Sudoku.LENGTH; i++) {
			if (!this.isValidRow(i) || !this.isValidColumn(i)) {
				return false
			}
		}
		return true
	}

	/**
	 * Checks whether all boxes in `field` are valid, i.e. do not contain any number twice. Empty cells (zeros) will
	 * be ignored.
	 */
	allBoxesValid(): bool {
		for (let y: u8 = 0; y < Sudoku.BOX_SIZE; y++) {
			for (let x: u8 = 0; x < Sudoku.BOX_SIZE; x++) {
				if (!this.isValidBox(x, y)) {
					return false
				}
			}
		}
		return true
	}

	/**
	 * Checks whether the field is valid, i.e. all rows, columns and boxes are valid.
	 */
	isValid(): bool {
		return this.allRowsAndColumnsValid() && this.allBoxesValid()
	}

	/**
	 * Returns the index of the first empty cell in `this.field` or -1 if no cell is empty. Empty means the value is 0.
	 */
	firstEmptyCellIndex(): CellPosition | null {
		// TODO: Add parameter where this function starts searching
		for (let y: u8 = 0; y < Sudoku.LENGTH; y++) {
			for (let x: u8 = 0; x < Sudoku.LENGTH; x++) {
				if (this.field[y][x] == Sudoku.EMPTY_CELL) {
					return { x, y }
				}
			}
		}
		return null
	}

	toString(): string {
		let s = ""
		for (let y: u8 = 0; y < Sudoku.LENGTH; y++) {
			for (let x: u8 = 0; x < Sudoku.LENGTH; x++) {
				const cell = this.field[y][x]
					s += cell != Sudoku.EMPTY_CELL ? cell.toString() : "_"
					s += ' '
				}
			s += '\n'
		}
		return s
	}
}

class CellPosition {
	x: u8
	y: u8
}

class SudokuResult {
	field: StaticArray<StaticArray<u8>>
	success: bool
	tries: u32
}


export function solveSudoku(inputField: StaticArray<StaticArray<u8>>): SudokuResult {
	const sudoku = new Sudoku(inputField)
	const success = sudoku.solve()

	return {
		field: sudoku.field,
		success: success,
		tries: sudoku.tries,
	}
}

export function isSudokuValid(inputField: StaticArray<StaticArray<u8>>): bool {
	return new Sudoku(inputField).isValid()
}