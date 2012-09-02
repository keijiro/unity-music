#pragma strict

class Scale {
	static private var intervals = [0, 5, 7];

	private var base = 0;
	private var offset_octave = 0;

	function Scale(aBase : int) {
		offset_octave = aBase / 12;
		base = aBase % 12;
	}

	function GetNote(number : int) {
		number = Mathf.Max(0, number + intervals.Length * offset_octave);
		return base + 12 * (number / intervals.Length) + intervals[number % intervals.Length];
	}
}
