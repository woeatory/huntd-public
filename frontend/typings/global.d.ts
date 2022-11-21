import sbjs from 'sourcebuster';

declare global {
  interface Window {
    sbjs: typeof sbjs
    ga: any
    dataLayer: Array<any>
  }
}
