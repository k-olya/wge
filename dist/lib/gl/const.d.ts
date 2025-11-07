import { mat4 } from "gl-matrix";
import { UniformType } from "./shader-program";
export declare const REGULAR_UNIFORMS: readonly ["1f", "1i", "2f", "2i", "3f", "3i", "4f", "4i", "1ui", "2ui", "3ui", "4ui", "1fv", "1iv", "2fv", "2iv", "3fv", "3iv", "4fv", "4iv", "1uiv", "2uiv", "3uiv", "4uiv"];
export declare const MATRIX_UNIFORMS: readonly ["Matrix2fv", "Matrix3fv", "Matrix4fv"];
export declare const TYPE_SETTERS: {
    [key: number]: UniformType;
};
export declare const IDENTITY4: mat4;
