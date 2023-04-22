// vite.config.ts
import { defineConfig } from "file:///D:/vue/omp-vue-h5/node_modules/.pnpm/vite@3.1.7/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/vue/omp-vue-h5/node_modules/.pnpm/@vitejs+plugin-vue@3.1.2_vite@3.1.7+vue@3.2.40/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import styleImport, { VantResolve } from "file:///D:/vue/omp-vue-h5/node_modules/.pnpm/vite-plugin-style-import@1.4.1_vite@3.1.7/node_modules/vite-plugin-style-import/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\vue\\omp-vue-h5";
var pathResolve = (dir) => {
  return resolve(__vite_injected_original_dirname, ".", dir);
};
var alias = {
  "@": pathResolve("src")
};
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `../es/${name}/style`
        }
      ]
    })
  ],
  resolve: {
    alias
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "http://112.74.78.101:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dWVcXFxcb21wLXZ1ZS1oNVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdnVlXFxcXG9tcC12dWUtaDVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Z1ZS9vbXAtdnVlLWg1L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgc3R5bGVJbXBvcnQsIHsgVmFudFJlc29sdmUgfSBmcm9tIFwidml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0XCI7XG5cbmNvbnN0IHBhdGhSZXNvbHZlID0gKGRpcjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgXCIuXCIsIGRpcik7XG59O1xuXG5jb25zdCBhbGlhczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgXCJAXCI6IHBhdGhSZXNvbHZlKFwic3JjXCIpXG59O1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIuL1wiLFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgc3R5bGVJbXBvcnQoe1xuICAgICAgcmVzb2x2ZXM6IFtWYW50UmVzb2x2ZSgpXSxcbiAgICAgIGxpYnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpYnJhcnlOYW1lOiBcInZhbnRcIixcbiAgICAgICAgICBlc01vZHVsZTogdHJ1ZSxcbiAgICAgICAgICByZXNvbHZlU3R5bGU6IG5hbWUgPT4gYC4uL2VzLyR7bmFtZX0vc3R5bGVgXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXNcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgcG9ydDogNTE3MyxcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHA6Ly8xOTIuMTY4LjEuNjE6MTAyMzAvXCIsXG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vMTEyLjc0Ljc4LjEwMTo4MDgwL1wiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIilcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuLy8gdGFyZ2V0OiBcImh0dHA6Ly80Ny4xMDcuNzYuMTY5OjgwODAvXCIsXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJPLFNBQVMsb0JBQW9CO0FBQ3hRLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxlQUFlLG1CQUFtQjtBQUh6QyxJQUFNLG1DQUFtQztBQUt6QyxJQUFNLGNBQWMsQ0FBQyxRQUFnQjtBQUNuQyxTQUFPLFFBQVEsa0NBQVcsS0FBSyxHQUFHO0FBQ3BDO0FBRUEsSUFBTSxRQUFnQztBQUFBLEVBQ3BDLEtBQUssWUFBWSxLQUFLO0FBQ3hCO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLE1BQ1YsVUFBVSxDQUFDLFlBQVksQ0FBQztBQUFBLE1BQ3hCLE1BQU07QUFBQSxRQUNKO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsVUFDVixjQUFjLFVBQVEsU0FBUztBQUFBLFFBQ2pDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBRU4sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxVQUFRLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
