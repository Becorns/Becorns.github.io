// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages 部署时可通过环境变量覆盖：
//   SITE_URL   站点地址，例如 https://becorns.github.io
//   ASTRO_BASE  子路径，例如 /notes（项目站点）或留空（用户 / 组织站点，默认 /）
const site = process.env.SITE_URL ?? 'https://becorns.github.io';
const base = process.env.ASTRO_BASE ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    // 修复 dev 下 oxc transform 对 Astro 前端(?)脚本 lang 推断错误的问题：
    // Astro 编译器产出的模块已是合法 ESM JS，无需再经过 oxc 转换；
    // 排除 .astro 相关模块可避免 oxc 将其当作 .astro 语言解析而报 PARSE_ERROR。
    oxc: {
      exclude: /\.astro/,
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
