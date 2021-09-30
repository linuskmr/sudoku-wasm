
export class Sudoku {
  private static readonly LENGTH: u8 = 9;
  private static readonly BOX_SIZE: u8 = 3;
  private static readonly EMPTY_CELL: u8 = 0;
  private static readonly CELL_MIN_VALUE: u8 = 1;
  private static readonly CELL_MAX_VALUE: u8 = 9;
  private field: StaticArray<u8> = new StaticArray<u8>(Sudoku.LENGTH * Sudoku.LENGTH)

  constructor() {
    this.field = [
        0, 0, 0,  0, 0, 2,  0, 0, 0,
        0, 6, 2,  0, 0, 0,  5, 0, 4,
        9, 5, 1,  7, 0, 4,  6, 2, 0,
        0, 0, 0,  4, 0, 9,  0, 8, 3,
        7, 8, 6,  0, 2, 3,  0, 0, 0,
        0, 0, 0,  0, 0, 0,  2, 1, 6,
        5, 0, 3,  0, 8, 7,  0, 6, 0,
        0, 0, 0,  0, 0, 5,  0, 3, 7,
        2, 0, 7,  0, 1, 6,  0, 5, 0
    ]
  }

  /**
   * Calculates the index in the `field` array from the x and y coordinates.
   */
  @inline
  indexFromXY(x: u8, y: u8): u8 {
    return y * Sudoku.LENGTH + x
  }

  /**
   * Checks whether the row specified by `y` is valid, i.e. does not contain any number twice. Empty cells (zeros)
   * will be ignored.
   */
  validRow(y: u8): bool {
    const foundNumbers = new StaticArray<bool>(Sudoku.CELL_MAX_VALUE+1)
    for (let xi: u8 = 0; xi < Sudoku.LENGTH; xi++) {
      const cell = this.field[this.indexFromXY(xi, y)]
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
  validColumn(x: u8): bool {
    const foundNumbers = new StaticArray<bool>(Sudoku.CELL_MAX_VALUE+1)
    for (let yi: u8 = 0; yi < Sudoku.LENGTH; yi++) {
      const cell = this.field[this.indexFromXY(x, yi)]
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
  validBox(boxX: u8, boxY: u8): bool {
    const foundNumbers = new StaticArray<bool>(Sudoku.CELL_MAX_VALUE+1)
    const x = boxX * Sudoku.BOX_SIZE
    const y = boxY * Sudoku.BOX_SIZE
    for (let yi: u8 = y; yi < y + Sudoku.BOX_SIZE; yi++) {
      for (let xi: u8 = x; xi < x + Sudoku.BOX_SIZE; xi++) {
        const cell = this.field[this.indexFromXY(xi, yi)]
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
      if (!this.validRow(i) || !this.validColumn(i)) {
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
    for (let yi: u8 = 0; yi < Sudoku.BOX_SIZE; yi++) {
      for (let xi: u8 = 0; xi < Sudoku.BOX_SIZE; xi++) {
        if (!this.validBox(xi, yi)) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Checks whether the field is valid, i.e. all rows, columns and boxes are valid.
   */
  valid(): bool {
    return this.allRowsAndColumnsValid() && this.allBoxesValid()
  }

  /**
   * Returns the index of the first empty cell in `this.field` or -1 if no cell is empty. Empty means the value is 0.
   */
  firstEmptyCellIndex(): i16 {
    // TODO: Add parameter where this function starts searching
    for (let i: u8 = 0; i < (this.field.length as u8); i++) {
      if (this.field[i] == Sudoku.EMPTY_CELL) {
        return i
      }
    }
    return -1
  }

  /**
   * Solves `this.field` in-place. Returns true if the field was successfully solved or false if the field is not
   * solvable.
   */
  solve(): bool {
    // Check if field is valid
    if (!this.valid()) {
      return false
    }

    // Search first free cell
    const firstEmptyCellIndex = this.firstEmptyCellIndex()
    if (firstEmptyCellIndex == -1) {
      // Field is valid and no cells are empty -> solved
      return true
    }

    this.field[firstEmptyCellIndex] = Sudoku.CELL_MIN_VALUE
    while (true) {
      if (this.solve()) {
        return true
      }
      if (this.field[firstEmptyCellIndex] == Sudoku.CELL_MAX_VALUE) {
        break
      }
      this.field[firstEmptyCellIndex]++
    }
    // No valid value for current cell found
    this.field[firstEmptyCellIndex] = Sudoku.EMPTY_CELL
    return false
  }

  toString(): string {
    let s = ""
    for (let yi: u8 = 0; yi < Sudoku.LENGTH; yi++) {
      for (let xi: u8 = 0; xi < Sudoku.LENGTH; xi++) {
        const cell = this.field[this.indexFromXY(xi, yi)]
        s += cell != Sudoku.EMPTY_CELL ? cell.toString() : "_"
        s += ' '
      }
      s += '\n'
    }
    return s
  }
}
