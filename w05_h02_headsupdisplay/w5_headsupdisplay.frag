//Sci-fi radar based on the work of gmunk for Oblivion
//http://work.gmunk.com/OBLIVION-GFX
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 u_resolution;
uniform float u_time;
// uniform float iChannelTime[4];
// uniform vec3 iChannelResolution[4];
uniform vec4 u_mouse;
// uniform samplerXX iChannel0..3;
// uniform vec4 iDate;
// uniform float iSampleRate;

#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))
#define RANGE(a,b,x) ( step(a,x)*(1.0-step(b,x)) )
#define RS(a,b,x) ( smoothstep(a-1.0,a+1.0,x)*(1.0-smoothstep(b-1.0,b+1.0,x)) )
#define PI 3.14159265359

#define blue1 vec3(0.74,0.95,1.00)
#define blue2 vec3(0.87,0.98,1.00)
#define blue3 vec3(0.35,0.76,0.83)
#define blue4 vec3(0.953,0.969,0.89)
#define red   vec3(1.00,0.38,0.227)

#define MOV(a,b,c,d,t) (vec2(a*cos(t)+b*cos(0.1*(t)), c*sin(t)+d*cos(0.1*(t))))


float movingLine(vec2 uv, vec2 center, float radius)
{
    //angle of the line
    float theta0 = 90.0 * u_time;
    vec2 d = (uv - center) *1.5;
    float r = sqrt( dot( d, d ) );
    if(r<radius)
    {
        //compute the distance to the line theta=theta0
        vec2 p = radius*vec2(cos(theta0*PI/180.0),
                            -sin(theta0*PI/180.0));
        float l = length( d - p*clamp( dot(d,p)/dot(p,p), 0.0, 1.0) );
        d = normalize(d);
        //compute gradient based on angle difference to theta0
        float theta = mod(180.0*atan(d.y,d.x)/PI+theta0,360.0);
        float gradient = clamp(1.0-theta/90.0,0.0,1.0);
        return SMOOTH(l,1.0)+0.5*gradient;
    }
    else return 0.0;
}

float circle(vec2 uv, vec2 center, float radius, float width)
{
    // float r = length(uv - center) * 1.5;
    // return SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius);
    vec2 d = (uv - center) * 1.5;
    float r = sqrt( dot( d, d ) );
    d = normalize(d);
    float theta = 180.0*(atan(d.y,d.x)/PI);
    return smoothstep(2.0, 2.1, abs(mod(theta+2.0,45.0)-2.0)) *
        mix( 0.5, 1.0, step(45.0, abs(mod(theta, 180.0)-90.0)) ) *
        (SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius));
}

float circle2(vec2 uv, vec2 center, float radius, float width, float opening)
{
    vec2 d = (uv - center) * 1.5;
    float r = sqrt( dot( d, d ) );
    d = normalize(d);
    if( abs(d.y) > opening )
        return SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius);
    else
        return 0.0;
}
float circle3(vec2 uv, vec2 center, float radius, float width)
{
    vec2 d = (uv - center) * 1.4;
    float r = sqrt( dot( d, d ) );
    d = normalize(d);
    float theta = 90.0*(atan(d.y,d.x)/PI);
    return smoothstep(2.0, 2.1, abs(mod(theta+2.0,45.0)-2.0)) *
        mix( 0.5, 1.0, step(45.0, abs(mod(theta, 180.0)-90.0)) ) *
        (SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius));
}

float triangles(vec2 uv, vec2 center, float radius)
{
    vec2 d = (uv - center) * 1.5;
    return RS(-9.0, 150.0, d.x-radius) * (1.0-smoothstep( 7.0+d.x-radius,9.0+d.x-radius, abs(d.y*8.0)))
         + RS(-150.0, 9.0, d.x+radius) * (1.0-smoothstep( 7.0-d.x-radius,9.0-d.x-radius, abs(d.y*8.0)))
         + RS(-9.0, 150.0, d.y-radius) * (1.0-smoothstep( 7.0+d.y-radius,9.0+d.y-radius, abs(d.x*8.0)))
         + RS(-150.0, 9.0, d.y+radius) * (1.0-smoothstep( 7.0-d.y-radius,9.0-d.y-radius, abs(d.x*8.0)));
}

float cross(vec2 uv, vec2 center, float radius)
{
    vec2 d = (uv - center) * 1.5;
    int x = int(d.x);
    int y = int(d.y);
    float r = sqrt( dot( d, d ) );
    if( (r<radius) && ( (x==y) || (x==-y) ) )
        return 1.0;
    else return 0.0;
}
float dots(vec2 uv, vec2 center, float radius)
{
    vec2 d = uv - center;
    float r = sqrt( dot( d, d ) );
    if( r <= 2.5 )
        return 1.0;
    if( ( r<= radius) && ( (abs(d.y+0.5)<=1.0) && ( mod(d.x+1.0, 50.0) < 2.0 ) ) )
        return 1.0;
    else if ( (abs(d.y+0.5)<=1.0) && ( r >= 50.0 ) && ( r < 115.0 ) )
        return 0.5;
    else
        return 0.0;
}
float bip1(vec2 uv, vec2 center)
{
    return SMOOTH(length(uv - center),16.0);
}
float bip3(vec2 uv, vec2 center)
{
    return SMOOTH(length(uv - center),12.0);
}
float bip4(vec2 uv, vec2 center)
{
    return SMOOTH(length(uv - center),5.0);
}
float bip5(vec2 uv, vec2 center)
{
    return SMOOTH(length(uv - center),20.0);
}
float bip2(vec2 uv, vec2 center)
{
    float r = length(uv - center) * 1.5;
    float R = 8.0+mod(87.0*u_time, 80.0);
    return (0.5-0.5*cos(30.0*u_time)) * SMOOTH(r,5.0)
        + SMOOTH(6.0,r)-SMOOTH(8.0,r)
        + smoothstep(max(8.0,R-20.0),R,r)-SMOOTH(R,r);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
void main()
{
    // vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec3 finalColor;
    vec2 uv = gl_FragCoord.xy - 250.;
    //center of the image
    vec2 c = u_resolution.xy/2.0;
    float sinX = sin(u_time*2.0) + 1.2;
    float cosX = cos(u_time*0.5) - 0.5;
    finalColor = vec3( 0.3*cross(uv, c, 240.0) );
    finalColor += ( circle(uv, c, 100.0, 1.0)
                  + circle(uv, c, 165.0, 100.0) ) * blue1;
    finalColor += (circle(uv, c, 240.0, 2.0) );//+ dots(uv,c,240.0)) * blue4;
    finalColor += circle3(uv, c, 313.0, 4.0) * blue1;
    finalColor += triangles(rotate2d( sin(u_time)*PI ) * uv, c, 90.0) * blue2 * sinX;
    // finalColor += triangles(uv, c, 315.0 + 30.0*sin(u_time)) * blue2;
    finalColor += movingLine(uv, c, 240.0) * blue3;
    finalColor += circle(uv, c, 1.0, 30.0) * blue3;
    finalColor += 0.7 * circle2(uv, c, 262.0, 10.0, 0.5+0.2*cos(u_time)) * blue3;
    if( length(uv-c) < 240.0 )
    {
        //animate some bips with random movements
        vec2 
        p = 147.0*MOV(1.3,1.0,1.0,1.4,3.0);
        finalColor += bip1(rotate2d( cos(cosX)*PI*0.35 ) * uv, c+p) * vec3(1,1,1)*0.5;
        p = 147.0*MOV(1.3,1.0,1.0,1.4,3.0);
        finalColor += bip3(rotate2d( cos(cosX)*PI*0.35 ) * uv, c+p) * vec3(1,1,1)*0.3;
        p = 147.0*MOV(1.3,1.0,1.0,1.4,3.0);
        finalColor += bip4(rotate2d( cos(cosX)*PI*0.35 ) * uv, c+p) * vec3(1,1,1)*0.5*sinX;

        p = 127.0*MOV(0.9,-1.1,1.3,0.8,-2.0+sin(0.1)+0.25);
        finalColor += bip5(rotate2d( u_time ) * uv, c+p) * vec3(1,1,1)*0.5;
        p = 127.0*MOV(0.9,-1.1,1.3,0.8,-2.0+sin(0.1)+0.25);
        finalColor += bip3(rotate2d( u_time ) * uv, c+p) * vec3(1,1,1)*0.3;
        p = 127.0*MOV(0.9,-1.1,1.3,0.8,-2.0+sin(0.1)+0.25);
        finalColor += bip4(rotate2d( u_time ) * uv, c+p) * vec3(1,1,1)*0.5*sinX;

        p = 50.0*MOV(1.54,1.7,1.37,1.8,sin(0.1*u_time+7.0)+0.2*u_time);
        finalColor += bip2(uv,c+p) * vec3(1,1,1)*0.5;
    }

    gl_FragColor = vec4( finalColor, 1.0 );
}