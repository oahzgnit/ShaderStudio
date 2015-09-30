#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), 
                 vec4(c.gb, K.xy), 
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), 
                 vec4(c.r, p.yzx), 
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), 
                d / (q.x + e), 
                q.x);
}

//  Function from Iñigo Quiles 
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*4.0+vec3(0.82,1.13,1.15)+vec3(1.88,0.51,0.01), 6.0)-3.2)-0.8, 0.1, 0.8 );
    //vec3(1.12,1.09,1.12)+vec3(1.56,1.41,1.20)
    //vec3(0.25, 1.12, 1.69)+vec3(1.12,1.09,1.02)
    //vec3(0.25, 1.12, 1.79)

    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    //float y = st.y;
    float dayNight = abs(sin(u_time));
    color = hsb2rgb(vec3(st.y,0.79,dayNight));

    gl_FragColor = vec4(color,1.0);
}
