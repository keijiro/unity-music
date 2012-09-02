#pragma strict

class Sequencer {
    private var delta = 0.0;
    private var counter = 1.0;
    
    var currentNote = -1;
    
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
            currentNote = 45 + (PRNG.Run() % 4) * 7;
            counter -= 1.0;
        }
        
        counter += delta;
        
        return bang;
    }
}
