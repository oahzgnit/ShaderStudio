#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
      sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = u_time*_speed*0.5;
    if( fract(time)>0.5 ){
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        } 
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        } 
    }
    return fract(_st);
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

    vec3 color = vec3(0.0);

    float sinX = sin(u_time*0.5) - 0.5;
    float cosX = cos(u_time*0.5) - 0.5;

    st = tile(st,10.);
    if(grid(st,0.01)) color += vec3(0.25);
    if(grid(st,0.1)) color += vec3(0.15);

    vec2 offsetSt = offset(st,vec2(0.5));

    st = rotate2D(st,PI*0.25);

    color += vec3( box(offsetSt,vec2(0.5),0.01) - box(st,vec2(0.3),0.01) + 2.*box(st,vec2(0.9),0.01) );
    color += vec3( box(offsetSt,vec2(0.1),0.01) - box(st,vec2(0.3),0.01) + 2.*box(st,vec2(0.1),0.01) );
    // vec3 color = vec3( box(offsetSt,vec2(0.1),0.01) - box(st,vec2(0.3),0.01) + 2.*box(st,vec2(0.2),0.01) );

    gl_FragColor = vec4(color,1.0);    
}