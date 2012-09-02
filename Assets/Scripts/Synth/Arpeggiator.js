#pragma strict

class Arpeggiator {
    private var delta = 0.0;
    private var counter = 1.0;
    
    private var scale : MusicalScale;
    private var position = 0.0;
    
    var currentNote = -1;
    private var prevNote = -1;

    function Arpeggiator(aBpm : int, base : int, seed : float) {
        delta = 4.0 * aBpm / (SynthConfig.kSampleRate * 60);
        scale = MusicalScale(base);
        position = seed;
    }

    function Run() {
        var bang = (counter >= 1.0);
        
        if (bang) {
            currentNote = scale.GetNote(Perlin.Fbm(position, 4) * 24);
            if (currentNote == prevNote) {
                bang = false;
            } else {
                prevNote = currentNote;
            }
            position += 0.1713;
            counter -= 1.0;
        }
        
        counter += delta;
        
        return bang;
    }
}
