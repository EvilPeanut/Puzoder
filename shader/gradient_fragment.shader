uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float starOpacity;
uniform float offset;
uniform float exponent;

varying vec2 vUv;
varying vec3 vWorldPosition;

vec3 nrand3(vec2 co) {
    vec3 a = fract(cos(co.x * 8.3e-3 + co.y) * vec3(1.3e5, 4.7e5, 2.9e5));
    vec3 b = fract(sin(co.x * 0.3e-3 + co.y) * vec3(8.1e5, 1.0e5, 0.1e5));
    vec3 c = mix(a, b, 0.5);
    return c;
}

void main() {
	float h = normalize( vWorldPosition + offset ).y;
	gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

	vec2 resolution = vec2(1920, 1080);
    vec2 seed = vUv.xy * 1.8;
    seed = floor(seed * resolution);
    vec3 rnd = nrand3(seed);
    gl_FragColor += vec4(pow(rnd.y, 40.0) * starOpacity);
}