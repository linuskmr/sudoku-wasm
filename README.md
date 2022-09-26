# sudoku-wasm

A sudoku solver written in [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) / WebAssembly.


## Compile & Run

```bash
$ npm run asbuild
$ npm run serve
```


## Structure

### [assembly/](assembly/)

Contains files with `.ts` extension, but they are [AssemblyScript](https://www.assemblyscript.org/) files
that get compiled to WebAssembly. Here is where the core logic lives.
