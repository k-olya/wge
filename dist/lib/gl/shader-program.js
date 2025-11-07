import { Lifecycle } from "lib/lifecycle";
import { TYPE_SETTERS } from "./const";
import { assume } from "lib/assume";
// create and compile a shader
export function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const status = "Shader compilation error: " + gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(status);
    }
    return shader;
}
export function getAttribLocations(gl, program, ...args) {
    return args.reduce((a, v) => (Object.assign(Object.assign({}, a), { [v]: gl.getAttribLocation(program, v) })), {});
}
export function getUniformLocations(gl, program, ...args) {
    return args.reduce((a, v) => (Object.assign(Object.assign({}, a), { [v]: gl.getUniformLocation(program, v) })), {});
}
// create and link a program
export function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const status = "Program linking error: " + gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(status);
    }
    return program;
}
export class ShaderProgram extends Lifecycle {
    constructor(g, vertex, fragment) {
        super();
        this.glVertexShader = null;
        this.glFragmentShader = null;
        this.glProgram = null;
        this.attributeNames = [];
        this.attributeLocations = {};
        this.uniformNames = [];
        this.uniforms = {};
        this.matrixUniforms = {};
        this.textureUniforms = {};
        this.uniformLocations = {};
        this.g = g;
        this.vertexShader = vertex;
        this.fragmentShader = fragment;
    }
    // create() compiles the shader pair
    // and gathers attributes and uniforms
    onCreate() {
        const gl = this.g.gl;
        // compile
        this.glVertexShader = createShader(gl, gl.VERTEX_SHADER, this.vertexShader);
        this.glFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, this.fragmentShader);
        this.glProgram = createProgram(gl, this.glVertexShader, this.glFragmentShader);
        // gather attributes
        const program = this.glProgram;
        const numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < numAttributes; i++) {
            const info = gl.getActiveAttrib(program, i);
            const attributeName = info.name;
            this.attributeNames.push(attributeName);
        }
        this.attributeLocations = getAttribLocations(gl, program, ...this.attributeNames);
        // gather uniforms
        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        this.uniforms = {};
        for (let i = 0; i < numUniforms; i++) {
            const info = gl.getActiveUniform(program, i);
            const uniformName = info.name;
            const uniformType = info.type;
            // console.log("Uniform name:", uniformName, "Type:", uniformType);
            const ts = TYPE_SETTERS[uniformType];
            assume(ts !== undefined, `Uniform type not supported: ${uniformName}: ${uniformType}`);
            if (ts !== undefined) {
                this.uniformNames.push(uniformName);
                this.uniforms[uniformName] = ts;
            }
        }
        // matrix type uniforms and textures have special treatment
        this.matrixUniforms = {};
        this.uniformNames
            .filter((name) => this.uniforms[name].startsWith("Matrix"))
            .forEach((name) => {
            this.matrixUniforms[name] = this.uniforms[name];
        });
        this.textureUniforms = {};
        this.uniformNames
            .filter((name) => this.uniforms[name] === "Texture")
            .forEach((name) => {
            this.textureUniforms[name] = this.uniforms[name];
        });
        // obtain uniform locations
        this.uniformLocations = getUniformLocations(gl, program, ...this.uniformNames);
    }
    // set one texture uniform
    setTextureUniform(i, name, texture) {
        const gl = this.g.gl;
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, texture.run());
        gl.uniform1i(this.uniformLocations[name], i);
    }
    // set uniform values
    setUniforms(x) {
        if (!x)
            return;
        let tcounter = 0;
        for (let i = 0; i < this.uniformNames.length; i++) {
            const name = this.uniformNames[i];
            const type = this.uniforms[name];
            const location = this.uniformLocations[name];
            const value = x[name];
            // continue if no value was provided
            if (value === undefined)
                continue;
            if (this.textureUniforms[name]) {
                // set texture uniforms
                this.setTextureUniform(tcounter, name, value);
                tcounter++;
            }
            else if (this.matrixUniforms[name]) {
                // @ts-expect-error
                this.g.gl[`uniform${type}`](location, false, value);
            }
            else {
                // @ts-expect-error
                this.g.gl[`uniform${type}`](location, value);
            }
        }
    }
    // prepare the render
    onRun(x) {
        this.g.gl.useProgram(this.glProgram);
        this.setUniforms(x);
    }
    // free gpu resources
    onFree() {
        const gl = this.g.gl;
        if (this.glProgram)
            gl.deleteProgram(this.glProgram);
        if (this.glVertexShader)
            gl.deleteShader(this.glVertexShader);
        if (this.glFragmentShader)
            gl.deleteShader(this.glFragmentShader);
        if (this.attributeLocations) {
            for (let key in this.attributeLocations) {
                gl.disableVertexAttribArray(this.attributeLocations[key]);
            }
        }
    }
}
