#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*3.676+vec3(1.876,0.976,0.145),
                             3.238)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    float size = fract(u_time*0.5)-0.5;
    
    float pct = 0.0;
	float a = smoothstep(.3, .4, st.x+size) - smoothstep(.6, .7, st.x-size);
	float b = smoothstep(.3, .4, st.y+size) - smoothstep(.6, .7, st.y-size);
	pct = cos(floor(2. +a*b)*a-b)*length(st);

	color = hsb2rgb(vec3(1.0 - smoothstep(a, b, pct)));

    gl_FragColor = vec4(color,1.0);
}