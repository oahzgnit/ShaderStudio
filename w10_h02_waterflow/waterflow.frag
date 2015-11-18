#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233))) 
                * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ), 
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ), 
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
    float scale = 3.0;
    pos += scale;
    return smoothstep(0.0,
                    1.5+b*.5,
                    abs((sin(pos.x*3.1415)+b*2.0))*.9);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;
    vec3 color = vec3(0.0);
    st = st -0.5;

    // st += noise(st*2.)*abs(1.0-sin(u_time*.1))*5.; 
    float sinX = sin(u_time*0.3)-0.5;
    float cosX = cos(u_time*0.1)-0.5;

    vec2 pos = st.yx*vec2(13.,2.);
    float pattern = pos.x;

    pos = rotate2d( noise(pos)) * pos *abs(1.0-sin(u_time*.1));

    pattern = lines(pos,.5);

    
    color = vec3(1.) * smoothstep(.18,.2,noise(st));
    // color += smoothstep(.15,.2,noise(st*10.));
    // color -= smoothstep(.35,.4,noise(st*10.));

    gl_FragColor = vec4(pattern*vec3(0.132, 0.484, 0.857),1.0);
}