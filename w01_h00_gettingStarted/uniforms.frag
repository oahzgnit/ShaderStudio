#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	gl_FragColor = vec4(st.x,u_mouse.x,1.0-u_mouse.y,1.0);
}
