#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                        -0.577350269189626,
                        0.024390243902439);

    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx);

    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;


    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // m -= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 300.0 * dot(m, g);
}

float cascade(vec2 st, vec2 zoom, float time, float warp) {
    vec2 pos = st*zoom*vec2(1.,pow(st.y,warp))+vec2(0.,time);
    return (.5+snoise(pos)*.5)*(st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec2 pos = st-vec2(.5);
    float r = dot(pos,pos);
    float a = atan(pos.y,pos.x);

    st = vec2(a,r*8.);

    color = vec3(1.)*smoothstep(.5,.8, cascade(st,vec2(30.,3.),u_time*3.,5.));
    color *= vec3(.5)*smoothstep(.6,.7, cascade(st,vec2(50.,5.),u_time*2.,1.));
    // color -= smoothstep(.03,.20,r)*.5;
    color *= 1.0-smoothstep(.10,.9,r);

    gl_FragColor = vec4(color+vec3(0.103, 0.251, 0.556),1.0);
}