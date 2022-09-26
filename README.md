# sudoku-wasm

A sudoku solver written in [AssemblyScript](https://www.assemblyscript.org) / [WebAssembly](https://webassembly.org/).

Live demo at [sudoku-wasm.pages.dev](https://sudoku-wasm.pages.dev/).


## Compile & Run

Requires node ≥ 16.0.0 and npm ≥ 7.0.0.

```bash
$ npm run asbuild
$ npm run serve
```


## Structure

### [assembly/](assembly/)

Contains files with `.ts` extension, but they are [AssemblyScript](https://www.assemblyscript.org/) files
that get compiled to WebAssembly. Here is where the core logic lives.
