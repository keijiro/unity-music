#pragma strict

static class PRNG {
    var seed : uint = 0;

    function Range(min : int, max : int) {
        var a : uint = seed++;
        a = (a ^ 61) ^ (a >> 16);
        a = a + (a << 3);
        a = a ^ (a >> 4);
        a = a * 0x27d4eb2d;
        a = a ^ (a >> 15);
        a = a & 0x3fffffff;
        return min + a % (max - min);
    }
}
