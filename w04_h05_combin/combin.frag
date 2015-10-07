#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*5.678+vec3(0.0,1.976,2.0),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

float shape(vec2 st, int N){
    st = st *2.-1.;
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(N);
    float size = sin(u_time*2.0) +1.5;
    return cos(floor(.9+a/r*u_time)*r-a)*length(st)*size;
}

// Antialiazed Step function
// from http://webstaff.itn.liu.se/~stegu/webglshadertutorial/shadertutorial.html
float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
  float afwidth = 0.6 * length(vec2(dFdx(value), dFdy(value)));
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
  return step(threshold, value);
  #endif
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  float d = 0.0;
  float size = sin(u_time*2.0) +1.5;

  d = min(shape(st-0.2,6),shape(st+vec2(0.1,0.2),6));

  vec3 color = hsb2rgb(vec3(1.0-aastep(.3,d)));

  gl_FragColor = vec4(color*size,1.0);
}