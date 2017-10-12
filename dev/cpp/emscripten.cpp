#include <stdio.h>
#include <emscripten.h>
#include "main.cpp"

int main(int argc, char const *argv[]) {
    printf("[WASM] Loaded\n");

    EM_ASM(
        if (typeof window!="undefined") {
            window.dispatchEvent(new CustomEvent("wasmLoaded"))
        } else {
            global.onWASMLoaded && global.onWASMLoaded()
        }
    );

    return 0;
}

extern "C" {

    EMSCRIPTEN_KEEPALIVE
    int addTwo (int a, int b) {
        return Util::addTwo(a, b);
    }

    EMSCRIPTEN_KEEPALIVE
    int addThree (int a, int b, int c) {
        return Util::addThree(a, b, c);
    }

    EMSCRIPTEN_KEEPALIVE
    int multTwo (int a, int b) {
        return Util::multTwo(a, b);
    }

    EMSCRIPTEN_KEEPALIVE
    void setName (int i) {
        Main::getInstance()->name = i;
    }

    EMSCRIPTEN_KEEPALIVE
    int getName (void) {
        return Main::getInstance()->name;
    }
}