#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 pos = gl_FragCoord.xy/vec2(500,500);
    gl_FragColor = vec4(0.0,0.0,pos.y,1.0); //blue to black
//     gl_FragColor.rg = pos.xy
    
//     vec2 pos = gl_FragCoord.xy/u_resolution;
//     vec2 pos = gl_FragCoord.xy/u_time;
//     gl_FragColor = vec4(pos.x,1.0,0.0,1.0);
//     gl_FragColor.rg = pos.xy;
//     gl_FragColor.b = abs(sin(u_time));
}
