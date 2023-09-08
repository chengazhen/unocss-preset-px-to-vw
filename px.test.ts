import { expect, test } from 'vitest'
import { createGenerator } from '@unocss/core'
import pxToVwPreset from './src/index'

const fixture = `<div class="text-red text-12px">hello</div>`
const uno =  createGenerator({
  rules: [
    // ['text-red', { color: 'red' }],
    ['text-12px', { 'font-size': '16px' }]
  ],
  presets: [
    pxToVwPreset()
  ]
})

const { css } = await uno.generate(fixture)

test('pass', async () => {
  expect(css).toContain('4.267vw')
})

test.fails('not pass', async () => {
  expect(css).toContain('16px')
})

