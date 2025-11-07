import { Collection } from "lib/collection";
import { GLContext } from "lib/gl/gl-context";
import { Lifecycle } from "lib/lifecycle";
import { Texture } from "./texture";
import { REGULAR_UNIFORMS, MATRIX_UNIFORMS } from "./const";
import { mat2, mat3, mat4, vec2, vec3, vec4 } from "gl-matrix";
export type RegularUniformType = (typeof REGULAR_UNIFORMS)[number];
export type MatrixUniformType = (typeof MATRIX_UNIFORMS)[number];
export type UniformType = RegularUniformType | MatrixUniformType | "Texture";
export type UniformValue = boolean | number | number[] | Float32Array | vec2 | vec3 | vec4 | mat2 | mat3 | mat4 | Texture;
export declare function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null;
export declare function getAttribLocations(gl: WebGL2RenderingContext, program: WebGLProgram, ...args: string[]): {
    [key: string]: number;
};
export declare function getUniformLocations(gl: WebGL2RenderingContext, program: WebGLProgram, ...args: string[]): {
    [key: string]: WebGLUniformLocation;
};
export declare function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null;
export declare class ShaderProgram extends Lifecycle<ShaderProgram> {
    g: GLContext;
    vertexShader: string;
    fragmentShader: string;
    glVertexShader: WebGLShader | null;
    glFragmentShader: WebGLShader | null;
    glProgram: WebGLShader | null;
    attributeNames: string[];
    attributeLocations: Collection<number>;
    uniformNames: string[];
    uniforms: Collection<UniformType>;
    matrixUniforms: Collection<UniformType>;
    textureUniforms: Collection<UniformType>;
    uniformLocations: Collection<WebGLUniformLocation>;
    constructor(g: GLContext, vertex: string, fragment: string);
    onCreate(): void;
    setTextureUniform(i: number, name: string, texture: Texture): void;
    setUniforms(x?: Collection<UniformValue>): void;
    onRun(x?: Collection<UniformValue>): void;
    onFree(): void;
}
