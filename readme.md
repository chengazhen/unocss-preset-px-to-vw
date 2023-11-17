
插件需要依赖 presetRemToPx 把 rem 转为 px, 然后把 px 转为 vw
```ts

interface PxToVwOptions {
  viewportWidth: number;  // 设计稿宽度 默认 375
  unitPrecision: number;  // 保留小数位 默认 3
  viewportUnit: string;   // 视窗单位 默认 vw
  minPixelValue: number; // 最小值不被转换 默认 1px
}

// uno.config.ts
import { defineConfig } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetPxTovw from 'unocss-preset-px-to-viewport'

export default defineConfig({
  presets: [
    presetRemToPx(),
    presetPxTovw(),
  ],
})
```
