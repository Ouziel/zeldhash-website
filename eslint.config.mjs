import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: ["public/wasm/**"],
  },
  ...nextConfig,
];

export default eslintConfig;
