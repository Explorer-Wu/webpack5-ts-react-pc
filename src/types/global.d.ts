/**
 * @filename global.d.ts
 * @description 全局ts声明
 */
//  declare module 'slash2';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

//  declare module 'omit.js';
//  declare module 'numeral';
//  declare module '@antv/data-set';
//  declare module 'mockjs';
//  declare module 'react-fittext';
//  declare module 'bizcharts-plugin-slider';

//  declare const REACT_APP_ENV: 'test' | 'dev' | 'uat' | 'prod' | false;

declare module '*.css';
declare module '*.less';
declare module '*.sass';
declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.ts';
declare module '*.tsx';