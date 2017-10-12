#include <stdio.h>
#include <vector>

class Main;
class Util;
class Stuff;
class Things;

// App
class Main {
public:

    int name;

    static Main* getInstance(void);

    static Main* instance;

private:
    Main ();
};

class Util {
public:
    static int addTwo (int a, int b);
    static int addThree (int a, int b, int c);
    static int multTwo (int a, int b);
};


// Example testing mocks
class Stuff {
public:
    virtual void test () = 0;

    virtual void fn1 () = 0;

    virtual void fn2 () = 0;

    virtual int multTwo (int a, int b) = 0;

    virtual int addTwo (int a, int b) = 0;

    virtual int addThree (int a, int b, int c) = 0;
};

class Things {
public:

    Things (Stuff* s);

    Stuff* stuff;

    void test (void);

    void callFn1AndFn2Twice (void);

    int multTwo (int a, int b);

    int addFour (int a, int b, int c, int d);

    int testMockingParamSequence (int x);

};