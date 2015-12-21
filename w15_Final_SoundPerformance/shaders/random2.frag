#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ), 
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ), 
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),sin(angle),
                sin(angle),cos(angle));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.);

    st *= vec2 (100., 80.);

    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    float time = floor(u_time * 40. * random(st_i.x));
    float pct = random(st_i.y + time);
    vec2 pos = st.x * vec2(1., 1.);
    // pct = step(pct, 0.2) - step(0.6,st_f.x) - step(0.8,st_f.y);
    pct = smoothstep(0.01*sin(u_time), 0.2, noise(st)) - smoothstep(0.2*sin(u_time), 0.3, noise(st_i));

    color = vec3(1.) * smoothstep(0.1, 0.2, noise(st));

    gl_FragColor = vec4(pct*color,1.0);
}