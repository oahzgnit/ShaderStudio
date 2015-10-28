#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D (vec2 st, float angle) {
    st -= 0.5;
    st =  mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle)) * st;
    st += 0.5;
    return st;
}

vec2 tile (vec2 st, float _zoom) {
    st *= _zoom;
    return fract(st);
}

vec2 seamlessTile(vec2 st){
    st *= 2.0;
    float d = 0.0;    
    d += step(1., mod(st.x,2.0));
    d += step(1., mod(st.y,2.0))*2.0;

    st = fract(st);

    if(d == 1.0){
        // st.x = 1.0-st.x;
        st = rotate2D(st, PI*0.5);
    } else if(d == 2.0){
        // st.y = 1.0-st.y;
        st = rotate2D(st, PI*-0.5);
    } else if(d == 3.0){
        // st = 1.0-st;
        st = rotate2D(st, PI);
    }
    return st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,1.0);
    st = seamlessTile(st);

    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}