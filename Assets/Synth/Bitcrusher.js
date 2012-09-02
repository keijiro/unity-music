#pragma strict

class Bitcrusher {
    private var counter = 0;
    private var sampled = 0.0;

    function Run(input : float) {
        if (counter++ % 4 == 0) {
            sampled = input;
        }
        return sampled;
    }
}
