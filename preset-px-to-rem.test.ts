import { expect, test } from 'vitest'
import { createGenerator } from '@unocss/core'
import pxToVwPreset from './src/index'
import presetMini from '@unocss/preset-mini'
import presetRemToPx from '@unocss/preset-rem-to-px'

const fixture = `<div class="text-red text-12px">hello</div>`
const uno = createGenerator({
  presets: [
    presetMini(),
    presetRemToPx(),
    pxToVwPreset({
      viewportWidth: 1920,
    })
  ]
})

test('should works', async () => {
  expect((await uno.generate(new Set(['m4', 'mx2', '-p2', 'gap2', '-w-0.5px', 'w-1']), { preflights: false })).css)
  .toMatchInlineSnapshot(`
    "/* layer: default */
    .-p2{padding:-0.417vw;}
    .m4{margin:0.833vw;}
    .mx2{margin-left:0.417vw;margin-right:0.417vw;}
    .gap2{gap:0.417vw;}
    .-w-0\\\\.5px{width:-0.5px;}
    .w-1{width:0.208vw;}"
  `)
})

test('important prefix should works', async () => {
  expect((await uno.generate(new Set(['!m4', '!mx2', '!-p2', '!gap2', '!w-0.5px',]), { preflights: false })).css)
  .toMatchInlineSnapshot(`
    "/* layer: default */
    .\\\\!-p2{padding:-0.417vw !important;}
    .\\\\!m4{margin:0.833vw !important;}
    .\\\\!mx2{margin-left:0.417vw !important;margin-right:0.417vw !important;}
    .\\\\!gap2{gap:0.417vw !important;}
    .\\\\!w-0\\\\.5px{width:0.5px !important;}"
  `)
})

