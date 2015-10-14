#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size, _size+vec2(0.001), _st);
    uv *= smoothstep(_size, _size+vec2(0.001), vec2(1.0)-_st);
    return uv.x*uv.y;
}

float shape(vec2 _st, vec2 _size){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;  
    float pct = 0.0;
    _size = vec2(0.01);
    _st -= .5;
    // pct = distance(vec2(0.5),_st);
    pct = dot(_st,_st)*100.;
    return 
            // length(max(abs(_st)-_size,.0));
            (step(1.5,pct) - step(1.0, pct)) - (step(0.5,pct) - step(0.01, pct));
}

float cross(in vec2 _st, float _size){
    return  shape(_st, vec2(_size,_size/4.)) * 
            shape(_st, vec2(_size/4.,_size));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    float sinX = sin(u_time*2.0)*PI*0.4 + 1.5;
    float cosX = cos(u_time*0.5) - 0.5;
    vec2 translate = vec2(cos(sinX),sin(sinX));
    st += translate*0.35;

    // Show the coordinates of the space on the background
    // color = vec3(st.x,st.y,0.0);

    // Add the shape on the foreground
    color += vec3(cross(st,0.25));

    gl_FragColor = vec4(color, 1.0);

}