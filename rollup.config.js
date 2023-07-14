import typescript from "rollup-plugin-typescript2"

const pkg = require('./package.json')

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      strict: false,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({ 
      rollupCommonJSResolveHack: false,
      clean: true,
     }),
  ],
  external: ["react"],
}