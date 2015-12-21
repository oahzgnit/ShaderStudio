#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846


uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st, float zoom){
    st *= zoom;
    return fract(st);
}

float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 0.75;
    return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*3.14);
}

float pattern(vec2 st, float radius) {
    return  circle(st+vec2(0.,-.5), radius)+
            circle(st+vec2(0.,.5), radius)+
            circle(st+vec2(-.5,0.), radius)+
            circle(st+vec2(.5,0.), radius);
}
mat2 rotationMatrix(float a) {
    return mat2(vec2(cos(a),-sin(a)),
            vec2(sin(a),cos(a)));
}


vec4 color1 = vec4(0.075,0.114,0.329, 1.0);
vec4 color2 = vec4(0.973,0.843,0.675, 1.0);
vec4 color3 = vec4(0.761,0.247,0.102, 1.0);

float curRotation = 0.0;
float curRotationContra = 0.0;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec4 color = vec4(0.0);
    float time = u_time * 0.25;
    float timeFrag = fract (time);

    curRotation += (u_time - curRotation);
    curRotationContra -= (u_time + curRotationContra);

    vec2 layer1 = st;
    if (timeFrag > 0.5) {
        layer1 -= .5;
        layer1 *= rotationMatrix ((PI * 0.5) * curRotation);
        layer1 += .5;
    }
    
    vec2 grid1 = tile(layer1, 3.);
    if (timeFrag <= 0.5) {
        grid1 -= .5;
        grid1 *= rotationMatrix ((PI * 0.25) * curRotationContra);
        grid1 += .5;

    }
    color = mix(color1, color2, pattern(grid1, 0.5));

    vec2 layer2 = st;
    if (timeFrag <= 0.5) {
        layer2 -= .5;
        layer2 *= rotationMatrix ((PI * 0.5) * curRotationContra);
        layer2 += .5;
    } 
    
    vec2 grid2 = tile(layer2, 6.);
    if (timeFrag > 0.5) {
        grid2 -= .5;
        grid2 *= rotationMatrix ((PI * 0.25) * curRotation);
        grid2 += .5;

    }
    color = mix(color, color3, pattern(grid2, 1.2));
    gl_FragColor = vec4(color);
}