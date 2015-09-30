#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.0,0.0,1.0);
vec3 colorB = vec3(1.0,0.0,1.0);

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.2, pct, st.x) - 
          smoothstep( pct, pct+0.2, st.x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // float y = st.x;
    float y = pow(st.x, 2.0);
    vec3 pct = vec3(st.y);

    // pct.r = smoothstep(0.0, 0.4, pct.r);//pow(pct.r, 1.0);
    // pct.g = sin(pct.g * PI);
    // pct.b = pow(pct.b, 1.0);

    color = mix(colorA, colorB, pct);
    color += plot(st, y);

    //color = vec3(1.0, 0.0, 0.0);
    //color = vec3(0.0, 0.0, 1.0);

    // color.r += plot(st,pct.r);
    // color.g += plot(st,pct.g);
    // color.b += plot(st,pct.b);

    gl_FragColor = vec4(color,1.0);
}
