#include "app.h"
#include "util.cpp"
#include "mockExamples.cpp"

Main::Main () {
    printf("[WASM] - New Main\n");
}

Main* Main::getInstance (void) {

    if (!instance) {
        instance = new Main();
    }

    return instance;
}

Main* Main::instance = 0;