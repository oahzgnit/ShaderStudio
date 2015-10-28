#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2D (float angle) {
    return  mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

// vec2 rotate2D (vec2 st, float angle) {
//     st -= 0.5;
//     st =  mat2(cos(angle),-sin(angle),
//                 sin(angle),cos(angle)) * st;
//     st += 0.5;
//     return st;
// }

vec2 movingTiles(vec2 st, float _zoom, float _speed){
    st *= _zoom;
    float time = u_time*_speed;
    if( fract(time)>0.5 ){
        if (fract( st.x * 0.5) > 0.5){
            st.y += fract(time)*2.0;
        } else {
            st.y -= fract(time)*2.0;
        } 
    } else {
        if (fract( st.x * 0.5) > 0.5){
            st.y += fract(time)*2.0;
        } else {
            st.y -= fract(time)*2.0;
        } 
    }
    return fract(st);
}

vec2 tile(vec2 st, float _zoom){
  st *= _zoom;
  return fract(st);
}

float box(in vec2 st, in vec2 size){
    st += 0.5;

    float sinX = sin(u_time) - 0.5;
    float cosX = cos(u_time) - 0.5;


    size = vec2(0.525) - size;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float cross(in vec2 st, float size){
    st -= 0.5;

    float sin1 = sin(u_time*.5) - 0.5;
    float sin2 = sin(u_time*.55) - 0.5;
    float sin3 = sin(u_time*.6) - 0.5;
    float sin4 = sin(u_time*.65) - 0.5;
    float sin5 = sin(u_time*.7) - 0.5;
    float sin6 = sin(u_time*.75) - 0.5;
    float sin7 = sin(u_time*.8) - 0.5;
    float sin8 = sin(u_time*.85) - 0.5;
    float sin9 = sin(u_time*.9) - 0.5;
    float sin10 = sin(u_time*.95) - 0.5;

    return  box(rotate2D(PI*0.1)*st, vec2(size*0.115,size*0.9-sin1)) + 
            box(rotate2D(PI*0.2)*st, vec2(size*0.115,size*0.9-sin2)) +
            box(rotate2D(PI*0.3)*st, vec2(size*0.115,size*0.9-sin3)) +
            box(rotate2D(PI*0.4)*st, vec2(size*0.115,size*1.9)) +
            box(rotate2D(PI*0.5)*st, vec2(size*0.115,size*0.9-sin4)) +
            box(rotate2D(PI*0.6)*st, vec2(size*0.115,size*1.9)) +
            box(rotate2D(PI*0.7)*st, vec2(size*0.115,size*0.9-sin5)) +
            box(rotate2D(PI*0.8)*st, vec2(size*0.115,size*0.9-sin6)) +
            box(rotate2D(PI*0.9)*st, vec2(size*0.115,size*0.9-sin7)) +
            box(rotate2D(PI*1.0)*st, vec2(size*0.115,size*0.9-sin8));
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  float sinX = sin(u_time*0.5) - 0.5;
  float cosX = cos(u_time*0.5) - 0.5;

  vec2 st_f = fract(st);

  st = tile(st, 10.0);
  vec3 color = vec3( clamp(cross(fract(st),0.3),0.0,1.0));

  gl_FragColor = vec4(color,1.0);
}