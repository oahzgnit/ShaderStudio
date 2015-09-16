#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
// uniform vec2 u_mouse;
uniform float u_time;


float parabola( float x, float k ){
    return pow( 4.0*x*(1.0-x), k );
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 k = vec2(cos(u_time*.5),sin(u_time*.5))*.35+.5;
    float y = parabola(st.x,k.x);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,1.0);

    gl_FragColor = vec4(color,1.0);
}
