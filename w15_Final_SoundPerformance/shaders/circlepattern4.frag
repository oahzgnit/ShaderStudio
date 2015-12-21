#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st, float zoom){
    st *= zoom;
    return fract(st);
}

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = u_time*_speed;
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

float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 1.75;
    return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*3.14);
}

float circlePattern(vec2 st, float radius) {
    return  circle(st+vec2(0.,-.5), radius)+
            circle(st+vec2(0.,0.5), radius)+
            circle(st+vec2(-0.5,0.), radius)+
            circle(st+vec2(0.5,0.), radius);
}

float circle2(vec2 st, float radius) {
    return  circle(st+vec2(0.2, -0.2), radius)+
            circle(st+vec2(-0.2, 0.2), radius);
            // circle(st+vec2(-0.3, 0.), radius);
            // circle(st+vec2(0., 0.), radius);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 grid1 = tile(st,7.);
    grid1 = movingTiles(st + vec2(cos(u_time),sin(u_time))*0.01,15., .5);
    color += mix(vec3(0.075,0.114,0.329),vec3(0.973,0.843,0.675),circle2(grid1,0.1)-circle2(grid1,0.0001));

    vec2 grid2 = tile(st,4.);
    grid2 = tile(st + vec2(cos(u_time),sin(u_time))*0.02 ,5.);
    color = mix(color, vec3(0.761,0.247,0.102), circlePattern(grid2,0.5)) - circlePattern(grid2,0.005),

    gl_FragColor = vec4(color,1.0);
}