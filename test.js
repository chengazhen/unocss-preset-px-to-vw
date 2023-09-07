import pxToVwPreset from './src/index.js'

const func = pxToVwPreset()

const css = {
  'font-size': '19px'
}
func.postprocess({
  css,
  entries: Object.entries(css)
})