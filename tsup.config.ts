import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: {
    resolve: true,
    entry: "./src/index.ts",
    compilerOptions: {
      moduleResolution: "node",
    }
  },
  format: ['esm', 'cjs'],
})