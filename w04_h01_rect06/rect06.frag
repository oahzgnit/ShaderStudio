#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec3 rectShape(float a, float b, float c, float d){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float size = fract(u_time*0.5)-0.5;
	float e = (step(.10, st.x) - step(.15, st.x)) + (step(.40, st.y) - step(.45, st.y));
	float f = (step(.55, st.x) - step(.60, st.x)) + (step(.75, st.y) - step(.80, st.y));
	float g = (step(.75, st.x) - step(.80, st.x)) + (step(.85, st.y) - step(.90, st.y));
	float h = (step(.25, st.x) - step(.30, st.x)) + (step(.35, st.y) - step(.40, st.y));
	vec3 color = vec3(a+b+c+d)*e+f+g+h;

	return color;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    color = mix(color, vec3(1.0), rectShape(0.0, 0.0, 0.0, 0.0));

    gl_FragColor = vec4(color,1.0);
}