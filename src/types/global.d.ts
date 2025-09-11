// src/types/js-image-compressor.d.ts
declare module "js-image-compressor" {
  interface ImageCompressorOptions {
    file: File;
    quality?: number;
    convertSize?: number;
    redressOrientation?: boolean;
    beforeCompress?(file: File): void;
    success?(file: File): void;
    error?(err: Error): void;
  }

  export default class ImageCompressor {
    constructor(options: ImageCompressorOptions);
  }
}