"use strict"

const chai = require("chai")
const sinonChai = require("sinon-chai")
const sinon = require("sinon")
chai.use(sinonChai)
const expect = chai.expect

const {Main, Util} = require("../dist/app.concat.js")

// For mocking
const fakeModule = {
    ccall: x => {},
    cwrap: () => fakeModule.cwrapReturnFunction,
    cwrapReturnFunction: () => {}
}

describe("Main", () => {

    describe("constructor", () => {

        it("Throws an error if no module is given", () => {
            const wrapperFn = () => new Main()
            expect(wrapperFn).to.throw("No WASM module provided")
        })

        it("Assigns the given module to the Main instance", () => {
            const main = new Main(fakeModule)
            expect(main.module).to.deep.equal(fakeModule)
        })

        it("Cwraps the WASM module's multTwo function and sets it to the instance's multTwo attribute", () => {
            sinon.stub(fakeModule, "cwrap").callsFake(() => "fake")
            const main = new Main(fakeModule)
            expect(fakeModule.cwrap).to.be.calledWith("multTwo", ["number"], ["number", "number"])
            expect(main.multTwo).to.equal("fake")
            fakeModule.cwrap.restore()
        })
    })

    describe("addFour", () => {

        let main

        beforeEach(() => {
            main = new Main(fakeModule)
            sinon.stub(fakeModule, "ccall").callsFake(() => "fake")
            main.addFour(1, 2, 3, 4)
        })

        afterEach(() => fakeModule.ccall.restore())

        it("CCalls the WASM module's addTwo function with the first two number parameters", () => {
            expect(fakeModule.ccall).to.be.calledWith("addTwo", ["number"], ["number", "number"], [1, 2])
        })

        it("CCalls the WASM module's addThree function with the last 2 number parameters and the result of the addTwo function", () => {
            expect(fakeModule.ccall).to.be.calledWith("addThree", ["number"], ["number", "number", "number"], [3, 4, "fake"])
        })
    })

    describe("multTwo", () => {
        it("Calles the cwrap-ed multTwo with the correct values", () => {
            sinon.spy(fakeModule, "cwrap")
            sinon.stub(fakeModule, "cwrapReturnFunction")
            const main = new Main(fakeModule)
            main.multTwo(2, 3)
            expect(fakeModule.cwrap.callCount).to.equal(1)
            expect(fakeModule.cwrapReturnFunction).to.be.calledWith(2, 3)
            fakeModule.cwrap.restore()
            fakeModule.cwrapReturnFunction.restore()
        })
    })
})

describe("Util", () => {

    it("addTwo", () => {
        expect(Util.addTwo(1, 2)).to.equal(3)
        expect(Util.addTwo(-3, 2)).to.equal(-1)
    })

    it("addThree", () => {
        expect(Util.addThree(1, 2, 3)).to.equal(6)
        expect(Util.addThree(1, 2, -3)).to.equal(0)
    })
})