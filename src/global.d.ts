/**
 * @filename global.d.ts
 * @description 全局ts声明
 */

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.tsx';