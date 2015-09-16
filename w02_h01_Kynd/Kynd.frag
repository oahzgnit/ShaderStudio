#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //float y = pow(st.x,5.0);
    // Kynd1-7
    // float y = 1.0 - pow(abs(st.x),0.5);
    // float y = 1.0 - pow(abs(st.x),1.0);
    // float y = 1.0 - pow(abs(st.x),1.5);
    // float y = 1.0 - pow(abs(st.x),2.0);
    // float y = 1.0 - pow(abs(st.x),2.5);
    // float y = 1.0 - pow(abs(st.x),3.0);
    // float y = 1.0 - pow(abs(st.x),3.5);

    // Kynd8-14
    // float y = pow(cos(PI * st.x / 2.0), 0.5);
    // float y = pow(cos(PI * st.x / 2.0), 1.0);
    // float y = pow(cos(PI * st.x / 2.0), 1.5);
    // float y = pow(cos(PI * st.x / 2.0), 2.0);
    // float y = pow(cos(PI * st.x / 2.0), 2.5);
    // float y = pow(cos(PI * st.x / 2.0), 3.0);
    // float y = pow(cos(PI * st.x / 2.0), 3.5);

    //Kynd15-21
    float y = 1.0 - pow(abs(sin(u_time * st.x /2.0)), 0.5);
    // float y = 1.0 - pow(abs(sin(PI * st.x /2.0)), 1.0);
    // float y = 1.0 - pow(abs(sin(PI * st.x /2.0)), 1.5);
    // float y = 1.0 - pow(abs(sin(PI * st.x /2.0)), 2.0);
    // float y = 1.0 - pow(abs(sin(PI * st.x /2.0)), 2.5);
    // float y = 1.0 - pow(abs(sin(PI * st.x /2.0)), 3.0);
    // float y = 1.0 - pow(abs(sin(PI * st.x /2.0)), 3.5);

    //Kynd22-28
    // float y = pow(min(cos(PI * st.x /2.0), 1.0 - abs(st.x)), 0.5);
    // float y = pow(min(cos(PI * st.x /2.0), 1.0 - abs(st.x)), 1.0);
    // float y = pow(min(cos(PI * st.x /2.0), 1.0 - abs(st.x)), 1.5);
    // float y = pow(min(cos(PI * st.x /2.0), 1.0 - abs(st.x)), 2.0);
    // float y = pow(min(cos(PI * st.x /2.0), 1.0 - abs(st.x)), 2.5);
    // float y = pow(min(cos(PI * st.x /2.0), 1.0 - abs(st.x)), 3.0);
    // float y = pow(min(cos(PI * st.x /2.0), 1.0 - abs(st.x)), 3.5);

    //Kynd29-35
    // float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 0.5);
    // float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 1.0);
    // float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 1.5);
    // float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 2.0);
    // float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 2.5);
    // float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 3.0);
    // float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 3.5);


    vec3 color = vec3(y);

    float pct = plot(st,y);
    //color = (1.0-pct)*color+pct*vec3(1.0,0.0,0.0);
    color = vec3(step(.5, pct), 0.0, 0.3);
    
    gl_FragColor = vec4(color,1.0);
}
