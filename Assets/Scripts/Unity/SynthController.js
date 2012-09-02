#pragma strict

@script RequireComponent(AudioSource)

var bpm = 124.0;

@Range(1, 24)       var fm_mul = 1;
@Range(0.0, 1.0)    var fm_mod = 0.0;
@Range(0.01, 0.3)    var env_rel = 0.2;

private var osc1 = Oscillator();
private var osc2 = Oscillator();
private var env1 = Envelope();
private var env2 = Envelope();
private var amp1 = Amplifier(env1);
private var amp2 = Amplifier(env2);
private var bit1 = Bitcrusher();
private var bit2 = Bitcrusher();
private var seq1 : Sequencer;
private var seq2 : Sequencer;

function Start() {
    seq1 = Sequencer(bpm, 80, 0.0);
    seq2 = Sequencer(bpm, 80 - 12, 0.53);
    audio.clip = AudioClip.Create("(null)", 0xfffffff, 1, SynthConfig.kSampleRate, false, true, function(data:float[]){});
    audio.Play();
}

function Update() {
    osc1.mul = osc2.mul = fm_mul;
    osc1.mod = osc2.mod = fm_mod * fm_mod * fm_mod;
    env1.release = env2.release = env_rel;
}

function OnAudioFilterRead(data : float[], channels : int) {
    // Asserts channels == 2
    for (var i = 0; i < data.Length; i += 2) {
        if (seq1.Run()) {
            osc1.SetNote(seq1.currentNote);
            env1.Bang();
        }
        if (seq2.Run()) {
            osc2.SetNote(seq2.currentNote);
            env2.Bang();
        }
        var x = bit1.Run(amp1.Run(osc1.Run()));
        x += bit2.Run(amp2.Run(osc2.Run()));
        data[i] = data[i + 1] = x;
        env1.Update();
        env2.Update();
    }
}
