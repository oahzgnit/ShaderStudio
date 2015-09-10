#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
//     gl_FragColor = gl_FragCoord.xy/u_mouse.x;
    vec2 mouse = u_mouse/u_resolution;
	gl_FragColor = vec4(st.x,mouse.x,mouse.y,1.0);
}
