#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float time = u_time*0.2;

    st = st - 0.5;

    float r = length(st);
    float a = atan(st.y, st.x);

    float sides = 12.;
    float ma = mod(a, TWO_PI/sides);
    ma = abs(ma - PI/sides);

    st = r * vec2(cos(ma), sin(ma));
    st = fract(st+time);

    float x = cos(ma) *r;
    float y = sin(ma) *r;

    vec4 color = vec4(st.x,st.y,0.0,1.0);
    color = texture2D(u_tex0,st+x+y);

    gl_FragColor = color;
}