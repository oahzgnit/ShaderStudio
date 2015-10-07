#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    float size = fract(u_time*0.5)-0.5;
    
    // float pct = 0.0;
	float a = smoothstep(.45, .50, st.x+size) - smoothstep(.50, .55, st.x-size);
	float b = smoothstep(.45, .50, st.y+size) - smoothstep(.50, .55, st.y-size);

    gl_FragColor = vec4(vec3(a * b),1.0);
}