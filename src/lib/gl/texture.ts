import { assert } from "lib/assume";
import { GLContext } from "./gl-context";
import { Lifecycle } from "lib/lifecycle";

export type TexturePixels =
  | ImageData
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLVideoElement
  | ImageBitmap
  | ArrayBufferView;

export interface CreateTextureOptions {
  framebuffer?: WebGLFramebuffer;
  pixels?: TexturePixels | null;
  minFilter?: number;
  magFilter?: number;
  wrapS?: number;
  wrapT?: number;
  flip?: boolean;
  premultiply?: boolean;
  glTexture?: number;
  format?: number;
  internalFormat?: number;
  type?: number;
}

// create and configure a texture
export function createTexture(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  options: CreateTextureOptions,
): WebGLTexture {
  const opts = {
    framebuffer: null,
    pixels: null,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE,
    flip: false,
    premultiply: false,
    glTexture: gl.TEXTURE0,
    format: gl.RGBA,
    internalFormat: options.format || gl.RGBA,
    type: gl.UNSIGNED_BYTE,
    ...options,
  };
  var texture = gl.createTexture()!;
  gl.activeTexture(opts.glTexture);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  if (opts.flip) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  } else {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  }
  if (opts.premultiply) {
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  } else {
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  }
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    opts.internalFormat,
    width,
    height,
    0,
    opts.format,
    opts.type,
    // @ts-ignore
    opts.pixels || null,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, opts.minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, opts.magFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, opts.wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, opts.wrapT);

  if (opts.framebuffer) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, opts.framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0,
    );
  }

  return texture;
}

export interface TextureOptions {
  pixels?: TexturePixels | null;
  width?: number;
  height?: number;
  minFilter?: number;
  magFilter?: number;
  wrapS?: number;
  wrapT?: number;
  flip?: boolean;
  premultiply?: boolean;
  mipMap?: boolean;
  texture?: WebGLTexture;
}

export class Texture extends Lifecycle<WebGLTexture> {
  width: number;
  height: number;
  glTexture: WebGLTexture | null = null;
  g: GLContext;
  minFilter: number;
  magFilter: number;
  wrapS: number;
  wrapT: number;
  flip: boolean;
  premultiply: boolean;
  pixels: TexturePixels | null;
  mipMap?: boolean = false;

  constructor(g: GLContext, options?: TextureOptions) {
    super();
    this.g = g;
    const gl = g.gl;
    const opts = options || {};
    // @ts-expect-error
    const w = opts.width || opts.pixels?.naturalWidth || opts.pixels?.width;
    // @ts-expect-error
    const h = opts.height || opts.pixels?.naturalHeight || opts.pixels?.height;
    assert(w && h, "Texture: width and height must be specified");
    this.width = w;
    this.height = h;
    this.minFilter = opts.minFilter || gl.LINEAR_MIPMAP_LINEAR;
    this.magFilter = opts.magFilter || gl.LINEAR;
    this.wrapS = opts.wrapS || gl.CLAMP_TO_EDGE;
    this.wrapT = opts.wrapT || gl.CLAMP_TO_EDGE;
    this.flip = opts.flip || false;
    this.premultiply = opts.premultiply || false;
    this.mipMap = opts.mipMap;
    this.pixels = opts.pixels || null;

    if (opts.texture) {
      this.glTexture = opts.texture;
      this.created = true;
    }
  }

  // create gpu texture from pixels
  onCreate() {
    const gl = this.g.gl;
    this.glTexture = createTexture(gl, this.width, this.height, {
      pixels: this.pixels,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      wrapS: this.wrapS,
      wrapT: this.wrapT,
      flip: this.flip,
      premultiply: this.premultiply,
    });
    if (this.pixels) {
      this.generateMipmap();
      this.updated = true;
    }
  }

  generateMipmap() {
    const gl = this.g.gl;
    if (
      // generate mipmaps if they were explicitly enabled
      // or implied by filtering settings and not explicitly disabled
      this.mipMap ||
      (this.mipMap === undefined &&
        [
          gl.LINEAR_MIPMAP_LINEAR,
          gl.LINEAR_MIPMAP_NEAREST,
          gl.NEAREST_MIPMAP_LINEAR,
          gl.NEAREST_MIPMAP_NEAREST,
          // @ts-expect-error
        ].includes(this.minFilter))
    ) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }
  }

  // update texture from pixels
  onUpdate() {
    if (this.pixels) {
      const gl = this.g.gl;
      gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
      if (this.flip) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      } else {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      }
      if (this.premultiply) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      } else {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      }
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        this.width,
        this.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        // @ts-ignore
        this.pixels,
      );
      this.generateMipmap();
    }
  }

  onRun() {
    return this.glTexture;
  }

  onFree() {
    this.g.gl.deleteTexture(this.glTexture);
  }
}
