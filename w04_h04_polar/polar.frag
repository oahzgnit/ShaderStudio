#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*5.678+vec3(0.0,1.976,2.0),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;

    float sizeS = sin(u_time*1.0) +0.5;
    float sizeC = cos(u_time*1.0) +0.5;

    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = cos(a*3.);
    // f = abs(cos(a*3.))*sizeS;
    // f = abs(cos(a*2.5))*.5+.3;
    f = abs(cos(a*12.+sizeS)*sin(a*3.+sizeC))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    vec3 color = hsb2rgb(vec3(1. - smoothstep(f,f+0.02,r)));

	gl_FragColor = vec4( color, 1.0 );
}