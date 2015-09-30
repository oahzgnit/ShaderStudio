#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



float plot (vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    float y = pow(st.x, 5.);
    //vec3 pac = pal(st.y, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );
    vec3 pct = vec3(st.y);
    
    pct.r = smoothstep(0.0,0.0, st.x);
    pct.g = sin(st.y*PI);
    pct.b = pow(st.y,0.5);

    vec3 colorA = vec3(0.00, 0.10, 0.20);
    vec3 colorB = vec3(1.0, 1.0, 1.0);
    vec3 colorC = vec3(0.5, 0.5, 0.5);
    vec3 colorD = vec3(0.5, 0.5, 0.5);
    color = mix(colorA, colorB, y);
    //color = mix(colorB, colorC, y);

    //Plot transition lines for each channel
    //color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    //color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    //color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(pct.r, pct.g, pct.b,1.0);
}
