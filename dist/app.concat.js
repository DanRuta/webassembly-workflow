"use strict"

class Main {

    constructor (module) {

        if (module==undefined) {
            throw new Error("No WASM module provided")
        }

        this.module = module
        this.multTwo = this.module.cwrap("multTwo", ["number"], ["number", "number"])
    }

    addFour (a, b, c, d) {
        const e = this.module.ccall("addTwo", ["number"], ["number", "number"], [a, b])
        return this.module.ccall("addThree", ["number"], ["number", "number", "number"], [c, d, e])
    }
}

typeof window=="undefined" && (exports.Main = Main)
"use strict"

class Util {

    static addTwo (a, b) {
        return a + b
    }

    static addThree (a, b, c) {
        return a + b + c
    }
}

typeof window=="undefined" && (exports.Util = Util)
//# sourceMappingURL=app.concat.js.map