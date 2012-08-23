#pragma strict

class Timer {
	
	function getRawValue() {
		return 1.0;
	}
	
	function getValue() {
		return getRawValue() > 1 ? 1 : ( 0 > getRawValue() ? 0 : getRawValue());
	}

}