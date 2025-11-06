import { mat4 } from "gl-matrix";
import { UniformType } from "./shader-program";

export const REGULAR_UNIFORMS = [
  "1f",
  "1i",
  "2f",
  "2i",
  "3f",
  "3i",
  "4f",
  "4i",
  "1ui",
  "2ui",
  "3ui",
  "4ui",
  "1fv",
  "1iv",
  "2fv",
  "2iv",
  "3fv",
  "3iv",
  "4fv",
  "4iv",
  "1uiv",
  "2uiv",
  "3uiv",
  "4uiv",
] as const;

export const MATRIX_UNIFORMS = ["Matrix2fv", "Matrix3fv", "Matrix4fv"] as const;

export const TYPE_SETTERS = {
  // float
  5126: "1f",
  35674: "Matrix2fv",
  35675: "Matrix3fv",
  35676: "Matrix4fv",
  35664: "2fv",
  35665: "3fv",
  35666: "4fv",
  36336: "1f",
  5131: "1f",
  36338: "1f",
  36337: "1f",
  // int
  5124: "1i",
  35667: "2iv",
  35668: "3iv",
  35669: "4iv",
  // unsigned int
  5125: "1ui",
  36294: "2uiv",
  36295: "3uiv",
  36296: "4uiv",
  // bool
  35670: "1i",
  35671: "2iv",
  35672: "3iv",
  35673: "4iv",
  35678: "Texture",
} as { [key: number]: UniformType };

// identity matrix
export const IDENTITY4 = mat4.identity(mat4.create());
