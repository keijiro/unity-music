#pragma strict

class Oscillator {
	var mul = 1.0;
	var mod = 0.0;

	private var x = 0.0;
	private var y = 0.0;
	private var step = 0.0;
	
	function SetNote(note : int) {
		var freq = 440.0 * Mathf.Pow(2.0, 1.0 * (note - 69) / 12.0);
		step = freq / SynthConfig.kSampleRate;
	}
	
	function Run() {
		x += step;
		y += step * mul;
		if (x > 1.0) x -= 1.0;
		while (y > 1.0) y -= 1.0;
		return Mathf.Sin(Mathf.PI * 2.0 * (x + mod * Mathf.Sin(Mathf.PI * 2.0 * y)));
	}
}
