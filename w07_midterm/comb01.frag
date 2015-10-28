#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

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

vec2 rotateTilePattern(vec2 st){
 
    st *= 12.0;

    float index = 0.0;    
    index += step(1., mod(st.x,2.0));
    index += step(1., mod(st.y,2.0))*2.0;

    st = fract(st);

    if(index == 1.0){

        st = rotate2D(st,PI*0.5);
    } else if(index == 2.0){

        st = rotate2D(st,PI*-0.5);
    } else if(index == 3.0){
 
        st = rotate2D(st,PI);
    }

    return st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // float sinX = sin(u_time*.5)-.5;
    // float cosX = cos(u_time*.5)-.5;

    st = tile(st,3.0);
    st = rotateTilePattern(st);

    st = rotate2D(st,-PI*u_time*0.25);
    // st += rotate2D(st, 0.5*sinX*cosX);

    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}