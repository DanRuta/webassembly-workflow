"use strict"

const {Main, Util} = require("./app.min.js")
const wasmModule = require("./appWASM.js")

global.onWASMLoaded = () => {
    const main = new Main(wasmModule)
    console.log("main.addFour(1, 2, 3, 4) ==", main.addFour(1, 2, 3, 4))
}