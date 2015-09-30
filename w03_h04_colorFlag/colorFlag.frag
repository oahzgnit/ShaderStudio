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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.y);
    
    
    pct.r = step(0.32, st.y);
    pct.g = step(0.67, st.y);
    pct.b = step(1.0, st.y);

    vec3 colorA = vec3(0.00, 0.10, 0.20);
    vec3 colorB = vec3(1.0, 1.0, 1.0);

    color = mix(colorA, colorB, pct);
    //color = mix(colorB, colorC, y);

    //Plot transition lines for each channel
    //color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    //color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    //color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(pct.r, pct.g, pct.b,1.0);
}
