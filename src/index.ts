import type { Preset, UtilObject } from "@unocss/core";
const pxToVwRE = /(-?[\.\d]+)px/g;

interface PxToVwOptions {
  viewportWidth: number;
  unitPrecision: number;
  viewportUnit: string;
  minPixelValue: number;
}

const defaultOptions: PxToVwOptions = {
  viewportWidth: 375,
  unitPrecision: 3,
  viewportUnit: 'vw',
  minPixelValue: 1,
};

export default function pxToVwPreset(options: Partial<PxToVwOptions> = defaultOptions): Preset {
  const mergedOptions: PxToVwOptions = { ...defaultOptions, ...options };

  return {
    name: '@unocss/preset-px-to-vw',
    postprocess: (util: UtilObject) => {
      const pxReplace = createPxReplace(mergedOptions);
      util.entries.forEach((i) => {
        const value = i[1];
        if (typeof value === 'string' && pxToVwRE.test(value)) {
          console.log(value);
          
          i[1] = value.replace(pxToVwRE, pxReplace);
        }
      });
    },
  };
}

function createPxReplace(opts: PxToVwOptions) {
  return function (m: string, $1: string) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    if (pixels <= opts.minPixelValue) return m;
    const parsedVal = toFixed((pixels / opts.viewportWidth * 100), opts.unitPrecision);
    return parsedVal === 0 ? '0' : parsedVal + opts.viewportUnit;
  };
}

function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}
