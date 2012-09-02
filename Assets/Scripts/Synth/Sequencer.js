#pragma strict

class Sequencer {
    private var delta = 0.0;
    private var counter = 1.0;
    
    private var scale = Scale(80);
    private var position = 0.0;
    
    var currentNote = -1;
    private var prevNote = -1;

    function Sequencer(aBpm : int, base : int, seed : float) {
        delta = 4.0 * aBpm / (SynthConfig.kSampleRate * 60);
        scale = Scale(base);
        position = seed;
    }

    function Run() {
        var bang = (counter >= 1.0);
        
        if (bang) {
            currentNote = scale.GetNote(Perlin.Fbm(position, 4) * 25);
            if (currentNote == prevNote) {
                bang = false;
            } else {
                prevNote = currentNote;
            }
            position += 0.13;
            counter -= 1.0;
        }
        
        counter += delta;
        
        return bang;
    }
}
