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

vec2 tile(vec2 st, float _zoom){
  st *= _zoom;
  return fract(st);
}

float box(in vec2 st, in vec2 size){
    st += 0.5;
    size = vec2(0.53) - size;
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
    return  box(rotate2D(PI*0.1)*st, vec2(size*0.125,size*0.9)) + 
            box(rotate2D(PI*0.2)*st, vec2(size*0.125,size*0.9)) +
            box(rotate2D(PI*0.3)*st, vec2(size*0.125,size*0.9)) +
            box(rotate2D(PI*0.4)*st, vec2(size*0.125,size*0.9)) +
            box(rotate2D(PI*0.5)*st, vec2(size*0.125,size*0.9)) +
            box(rotate2D(PI*0.6)*st, vec2(size*0.125,size*0.9)) +
            box(rotate2D(PI*0.7)*st, vec2(size*0.125,size*0.9));
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  st = tile(st,1.0);
  vec3 color = vec3( clamp(cross(fract(st),0.3),0.0,1.0) );

  gl_FragColor = vec4(color,1.0);
}