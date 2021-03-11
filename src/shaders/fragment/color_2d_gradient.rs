pub const SHADER: &str = r#"
    precision mediump float;
    varying lowp vec4 vColor;

    uniform float uOpacity;


    void main() {
        gl_FragColor = vec4(vColor.r, vColor.g, vColor.b, vColor.a * uOpacity);
    }
"#;