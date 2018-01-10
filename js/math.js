Math.isEven = function(value) {
	return Math.ceil(value) % 2 == 0;
}

Math.isOdd = function(value) {
	return Math.ceil(value) % 2 != 0;
}

Math.normalize = function(value, min, max) {
	return (value - min) / (max - min);
}

Math.clamp = function(value, min, max) {
	if (value < min)
	{
		value = min;
	}
	else if (value > max)
	{
		value = max;
	}
	return value;
}

Math.repeat = function(t, length) {
	return Math.clamp(t - Math.floor(t / length) * length, 0, length);
}

Math.pingPong = function(t, length) {
	t = Math.repeat(t, length * 2);
	return length - Math.abs(t - length);
}

Math.randomRange = function(min, max) {
	if (min >= 0) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * ((Math.abs(min) + max) + 1)) - Math.abs(min);
	}
}

Math.lerp = function (a, b, n) {
  return (1 - n) * a + n * b;
}