#pragma strict

@script RequireComponent(AudioSource)

var bpm = 124.0;
var base = 46.0;

@Range(1, 24)       var fm_mul = 1;
@Range(0.0, 1.0)    var fm_mod = 0.0;
@Range(0.01, 0.3)   var env_rel = 0.2;

class ASynth {
    static private var seed = 0.0;

    var osc = Oscillator();
    var env = Envelope();
    var amp = Amplifier(env);
    var bit = Bitcrusher();
    var seq : Sequencer;

    function ASynth(bpm: int, base: int, octave : int) {
        seq = Sequencer(bpm, base + 12 * octave, seed);
        seed += 3.1415926;
    }

    function SetParam(fm_mul : int, fm_mod : float, env_rel : float) {
        osc.multiplier = fm_mul;
        osc.modulation = fm_mod;
        env.release = env_rel;
    }

    function Run() {
        if (seq.Run()) {
            osc.SetNote(seq.currentNote);
            env.Bang();
        }
        var x = bit.Run(amp.Run(osc.Run()));
        env.Update();
        return x;
    }
}

private var arp1 = ASynth(bpm, base, 1);
private var arp2 = ASynth(bpm, base, 3);

function Start() {
    audio.clip = AudioClip.Create("(null)", 0xfffffff, 1, SynthConfig.kSampleRate, false, true, function(data:float[]){});
    audio.Play();
}

function Update() {
    arp1.SetParam(fm_mul, fm_mod, env_rel);
    arp2.SetParam(fm_mul, fm_mod, env_rel);
}

function OnAudioFilterRead(data : float[], channels : int) {
    // Asserts channels == 2
    for (var i = 0; i < data.Length; i += 2) {
        data[i] = data[i + 1] = arp1.Run() + arp2.Run();
    }
}
