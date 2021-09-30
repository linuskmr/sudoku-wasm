# sudoku-wasm

A sudoku solver written in [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) / WebAssembly.

## Run

Compile AssemblyScript to WebAssembly
```
asc assembly/index.ts --target release
```

Serve files
```
npx serve
```

Visit [http://localhost:5000](http://localhost:5000)

## Structure

### [assembly/](assembly/)

Contains files with `.ts` extension, but they are [AssemblyScript](https://www.assemblyscript.org/) files
that get compiled to WebAssembly. Here is where the core logic lives.

[Why `.ts` extension?](https://github.com/AssemblyScript/assemblyscript/issues/1003)

AssemblyScript(https://github.com/AssemblyScript/assemblyscript) files with typescript `.ts` extension.

[Why `.ts` extension?](https://github.com/AssemblyScript/assemblyscript/issues/1003)

### [tests/](tests/)

Unit tests
