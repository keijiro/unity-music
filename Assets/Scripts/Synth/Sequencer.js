#pragma strict

class Sequencer {
    private var delta = 0.0;
    private var counter = 1.0;
    
    private var scale = Scale(80);
    private var riff1 = [0, 0, 0, 0, 0, 0];
    private var riff2 = [0, 0, 0, 0];
    private var position = 0;
    
    var currentNote = -1;

    function Sequencer(aBpm : int) {
        delta = 4.0 * aBpm / (SynthConfig.kSampleRate * 60);
        Regenerate();
    }

    function Regenerate() {
        var number = 0;
        for (var i = 0; i < riff1.Length; i++) {
            riff1[i] = number;
            number += PRNG.Range(0, 2) ? 1 : -1;
        }

        number = 0;
        for (i = 0; i < riff2.Length; i++) {
            riff2[i] = number;
            number += PRNG.Range(0, 2) ? 1 : -1;
        }
    }

    function Reset() {
        counter = 1.0;
        position = 0;
        currentNote = -1;
    }

    function Run() {
        var bang = (counter >= 1.0);
        
        if (bang) {
            if (position < riff1.Length * 3) {
                currentNote = scale.GetNote(riff1[position % riff1.Length]);
            } else {
                currentNote = scale.GetNote(riff2[position - riff1.Length * 3]);
            }
            position = (position + 1) % (riff1.Length * 3 + riff2.Length);
            counter -= 1.0;
        }
        
        counter += delta;
        
        return bang;
    }
}
