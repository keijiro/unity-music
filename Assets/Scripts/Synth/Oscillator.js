#pragma strict

class Oscillator {
	var multiplier = 1.0;
	var modulation = 0.0;

	private var mx = 0.0;
	private var cx = 0.0;
	private var step = 0.0;

	static private var kPI2 = 6.28318530718;
	
	function SetNote(note : int) {
		var freq = 440.0 * Mathf.Pow(2.0, 1.0 * (note - 69) / 12.0);
		step = freq / SynthConfig.kSampleRate;
	}
	
	function Run() {
		mx += step * multiplier;
		cx += step;
		mx -= Mathf.Floor(mx);
		cx -= Mathf.Floor(cx);
		return Mathf.Sin(kPI2 * (cx + modulation * Mathf.Sin(kPI2 * mx)));
	}
}
