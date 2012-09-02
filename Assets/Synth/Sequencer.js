#pragma strict

class Sequencer {
    private var delta = 0.0;
    private var counter = 1.0;
    
    var currentNote = -1;
    
    static var seed : uint = 0;
    private function Random() {
        var a = seed++;
        a = (a ^ 61) ^ (a >> 16);
        a = a + (a << 3);
        a = a ^ (a >> 4);
        a = a * 0x27d4eb2d;
        a = a ^ (a >> 15);
        return a;
    }

    function Sequencer(aBpm : int) {
        delta = 4.0 * aBpm / (SynthConfig.kSampleRate * 60); 
    }

    function Reset() {
        counter = 1.0;
        currentNote = -1;
    }

    function Run() {
        var bang = (counter >= 1.0);
        
        if (bang) {
            currentNote = 45 + (Random() % 4) * 7;
            counter -= 1.0;
        }
        
        counter += delta;
        
        return bang;
    }
}
