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