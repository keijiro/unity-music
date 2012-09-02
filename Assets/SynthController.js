#pragma strict

@script RequireComponent(AudioSource)

var bpm = 124.0;

@Range(1, 24)       var fm_mul = 1;
@Range(0.0, 1.0)    var fm_mod = 0.0;
@Range(0.01, 0.3)    var env_rel = 0.2;

private var osc = Oscillator();
private var env = Envelope();
private var amp = Amplifier(env);
private var bit = Bitcrusher();
private var seq : Sequencer;

function Start() {
    seq = Sequencer(bpm);
    audio.clip = AudioClip.Create("(null)", 0xfffffff, 1, SynthConfig.kSampleRate, false, true, function(data:float[]){});
    audio.Play();
}

function Update() {
    osc.mul = fm_mul;
    osc.mod = fm_mod * fm_mod * fm_mod;
    env.release = env_rel;
}

function OnAudioFilterRead(data : float[], channels : int) {
    // Asserts channels == 2
    for (var i = 0; i < data.Length; i += 2) {
        if (seq.Run()) {
            osc.SetNote(seq.currentNote);
            env.Bang();
        }
        var x = bit.Run(amp.Run(osc.Run()));
        data[i] = data[i + 1] = x;
        env.Update();
    }
}
