#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
      sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

vec2 offset(vec2 _st, vec2 _offset){
    vec2 uv;

    if(_st.x>0.5){
        uv.x = _st.x - 0.5;
    } else {
        uv.x = _st.x + 0.5;
    } 

    if(_st.y>0.5){
        uv.y = _st.y - 0.5;
    } else {
        uv.y = _st.y + 0.5;
    } 

    return uv;
}

bool grid(vec2 _pos, float _res){
    vec2 grid = fract(_pos*_res*250.);
    return grid.x < _res || grid.y < _res;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;

    st *=vec2(1., 1.);

    vec3 color = vec3(0.);

    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float time = floor(u_time*8.);
    float pct = random(time-i_st.x);

    if(i_st.y == 1.){
        f_st.y = 1.-f_st.y;
    }

    vec2 vel = floor(vec2(u_time*10.)); 
    vel *= vec2(0.,1.); 

    st = tile(st,10.);
    if(grid(st,0.01)) color += vec3(0.25);
    if(grid(st,0.1)) color += vec3(0.15);

    vec2 offsetSt = offset(st,vec2(0.5));

    st = rotate2D(st,PI*0.25);

    color.r = random(floor(st+offsetSt)*u_mouse.x/u_resolution);
    // color.g *= random(floor(st+vel)*u_mouse.x/u_resolution);
    color.b = random(floor(st-offsetSt)*u_mouse.x/u_resolution);

    color += vec3( box(offsetSt,vec2(0.5),0.01) - box(st,vec2(0.3),0.01) + 2.*box(st,vec2(0.9),pct) );
    color += vec3( box(offsetSt,vec2(0.1),0.01) - box(st,vec2(0.3),0.01) + 2.*box(st,vec2(0.1),pct) );
    // color = vec3( box(offsetSt,vec2(0.1),0.01) - box(st,vec2(0.3),0.01) + 2.*box(st,vec2(0.2),0.01) );
    // color = vec3(step(pct,f_st.y)-step(0.7,f_st.x));

    gl_FragColor = vec4(color,1.0);    
}