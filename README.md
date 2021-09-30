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

AssemblyScript(https://github.com/AssemblyScript/assemblyscript) files with typescript `.ts` extension.

[Why `.ts` extension?](https://github.com/AssemblyScript/assemblyscript/issues/1003)

### [tests/](tests/)

Unit tests
