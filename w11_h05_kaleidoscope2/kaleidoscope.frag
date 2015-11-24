#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

const float USE_K = 1.0;
const float NUM_SIDES = 6.0;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

float field( vec2 p, vec2 center, float r ) {
    float d = length( p - center ) / r;
    
    float t   = d  * d;
    float tt  = t  * d;
    float ttt = tt * d;
    
    float v =
        ( - 5.0 / 5.0 ) * ttt + //3.0
        (  15.0 / 9.0 ) * tt + //17.0
        ( -20.0 / 5.0 ) * t + //22.0
        1.0;
    
    return clamp( v, 0.0, 1.0 );
}

vec2 Kaleidoscope( vec2 st, float n, float bias ) {
    float angle = PI / n;
    
    float r = length( st );
    float a = atan( st.y, st.x ) / angle;
    
    a = mix( fract( a ), 1.0 - fract( a ), mod( floor( a ), 2.0 ) ) * angle;
    
    return vec2( cos( a ), sin( a ) ) * r;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 ratio = u_resolution.xy / min( u_resolution.x, u_resolution.y );
    // float time = u_time*0.2;

    st = st - 0.5;

    // float r = length(st);
    // float a = atan(st.y, st.x);

    // float sides = 12.;
    // float ma = mod(a, TWO_PI/sides);
    // ma = abs(ma - PI/sides);

    // st = r * vec2(cos(ma), sin(ma));
    // st = fract(st+time);

    st = mix( st, Kaleidoscope( st, NUM_SIDES, u_time * 0.5 ), USE_K);

    // float x = cos(ma) *r;
    // float y = sin(ma) *r;

    vec3 final_color = vec3( 0.0 );
    float final_density = 0.0;
    for ( int i = 0; i < 128; i++ ) {

        vec4 noise  = texture2D( u_tex0, vec2( float( i ) + 0.5, 0.5 ) / 256.0 );
        vec4 noise2 = texture2D( u_tex0, vec2( float( i ) + 0.5, 0.5 ) / 256.0 );
        
        // velocity
        vec2 vel = noise.xy * 2.0 - vec2( 1.0 );
        
        // center
        vec2 pos = noise.xy;
        pos += u_time * vel * 0.2;
        pos = mix( fract( pos ), 1.0 - fract( pos ), mod( floor( pos ), 2.0 ) );
        
        // remap to screen
        pos = ( pos * 2.0 - 1.0 ) * ratio;
        
        // radius
        float radius = clamp( noise.w, 0.1, 0.8 );
        radius *= radius * 0.4;
        
        // color
        vec3 color = noise2.xyz;
        
        // density
        float density = field( st, pos, radius );

        // accumulate
        final_density += density;       
        final_color += density * color;
    }

    final_density = clamp( final_density - 0.1, 0.0, 1.0 );
    final_density = pow( final_density, 3.0 );

    // vec4 color = vec4(st.x,st.y,0.0,1.0);
    // color = texture2D(u_tex0,st);

    gl_FragColor = vec4( final_color * final_density, 1.0 );
}