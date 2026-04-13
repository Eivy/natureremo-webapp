import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  base: "/natureremo-webapp/",
  build: {
    target: "esnext",
  },
});
