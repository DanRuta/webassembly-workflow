
Things::Things (Stuff* s) {
    stuff = s;
}

void Things::test (void) {
    stuff->test();
}

void Things::callFn1AndFn2Twice (void) {
    stuff->fn1();
    stuff->fn1();
    stuff->fn2();
    stuff->fn2();
}

int Things::multTwo (int a, int b) {
    return stuff->multTwo(a, b);
}

int Things::addFour (int a, int b, int c, int d) {
    int e = stuff->addTwo(a, b);
    return stuff->addThree(c, d, e);
}

// Call addTwo with every even number. Otherwise, call addThree, unless x is 3
int Things::testMockingParamSequence (int x) {

    if (!(x%2)) {
        return stuff->addTwo(1, 2);
    } else if (x==3) {
        return 0;
    }

    return stuff->addThree(1, 2, 3);
}