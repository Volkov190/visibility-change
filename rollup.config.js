import typescript from "rollup-plugin-typescript2";
import autoExternal from "rollup-plugin-auto-external";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "esm",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    autoExternal(),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
  ],
};
