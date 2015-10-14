#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {

  // vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  // vec3 finalColor;
  vec3 finalColor = vec3(0.0);

  st -= vec2(0.5);
  
  finalColor.b = sin(sin(u_time));
  finalColor.g = cos(cos(u_time));
  finalColor.r = (finalColor.b + finalColor.g) / 1.0;
  
  float _exrate = abs(sin(u_time));
  
  float f = 0.0;

  //circles
  for(float i = 0.0; i < 10.0; ++i)
  {
    float s = sin(u_time + i * 0.628318) * _exrate;
    float c = cos(u_time + i * 0.628318) * _exrate;
    f += 0.001 / abs(length(st + vec2(c, s)*0.5) - 0.5);
  }

  for(float i = 0.0; i < 10.0; ++i)
  {
    float s = sin(u_time + i * 0.628318) * _exrate;
    float c = cos(u_time + i * 0.628318) * _exrate;
    f += 0.001 / abs(length(st + vec2(c, s))*0.9 - 0.5);
  }
  for(float i = 0.0; i < 10.0; ++i)
  {
    float s = sin(u_time + i * 0.628318) * _exrate;
    float c = cos(u_time + i * 0.628318) * _exrate;
    f += 0.001 / abs(length(st + vec2(c, s))*0.8 - 0.5);
  }

  //dots
  for(float i = 0.0; i < 15.0; ++i)
  {
    float j = i + 1.0;
    vec2 st = st + vec2(cos(u_time * j), sin(u_time * j)) * 0.5;
    finalColor.b += 0.05 / length(st);
  }

  for(float i = 0.0; i < 15.0; ++i)
  {
    float j = i + 1.0;
    vec2 st = st + vec2(cos(u_time * j), sin(u_time * j)) * 0.2;
    finalColor.b += 0.05 / length(st);
  }

  for(float i = 0.0; i < 10.0; ++i)
  {
    float j = i + 1.0;
    vec2 st = st + vec2(cos(u_time * j), sin(u_time * j)) * 0.05;
    finalColor.b += 0.05 / length(st);
  }

  gl_FragColor = vec4(vec3(finalColor * f), 1.0);
}