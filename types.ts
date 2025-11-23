export enum AvatarStyle {
  Anime = '日系动漫',
  Realistic = '写实照片',
  PixelArt = '像素艺术',
  ThreeDRender = '3D 渲染',
  Watercolor = '水彩画',
  Cyberpunk = '赛博朋克',
  OilPainting = '油画风格',
  FlatDesign = '扁平插画',
  Clay = '粘土风'
}

export interface GenerationConfig {
  prompt: string;
  style: AvatarStyle;
  count: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  timestamp: number;
}
