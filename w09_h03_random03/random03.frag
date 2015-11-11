#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // Grid
    vec2 grid = vec2(120.0,15.);
    st *= grid;

    vec2 ipos = floor(st); 
    
    vec2 vel = floor(vec2(u_time*10.)); 
    vel *= vec2(0.,1.); 
    
    // 100%
    float totalCells = grid.x*grid.y;
    float t = mod(max(grid.x,grid.y)+floor(1.0+u_time*50.),totalCells);
    vec2 head = vec2(mod(t,grid.y), floor(t/grid.x));

    vec2 offset = vec2(0.2,0.);

    vec3 color = vec3(1.0);
    color *= step(grid.y-head.y,ipos.y);  
    color = clamp(color,vec3(0.),vec3(1.));

    // Assign a random value base on the integer coord
    color.r *= random(floor(st+vel+offset));
    color.g *= random(floor(st+vel));
    color.b *= random(floor(st+vel-offset));

    color = smoothstep(0.,.5+u_mouse.x/u_resolution.x*.5,color*color); 
    color = step(0.5+u_mouse.x/u_resolution.x*0.5,color);

    //  Margin
    color *= step(.1,floor(st.x+vel.x))*step(.1,floor(st.y+vel.x));

    gl_FragColor = vec4(1.0-color,1.0);
}