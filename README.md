# Becorn 的笔记（Astro + GitHub Pages）

基于 [Astro](https://astro.build) 的个人笔记站，Obsidian 风格的三栏布局：

- **左侧**：笔记目录树（按分类文件夹组织，默认收起，点击展开）
- **中间**：文章内容
- **右侧**：文章大纲，**树状目录**（按标题层级嵌套、可折叠展开，随滚动自动展开当前章节所在分支并高亮，文件目录风格）
- **左上角**：个人头像与昵称

## ✨ 新增文章

只需在对应分类下添加一个 Markdown 文件，无需改任何代码：

```
src/content/notes/
├── web/
│   ├── sql.md          → https://becorns.github.io/web/sql/
│   └── upload.md       → https://becorns.github.io/web/upload/
├── 小程序/
│   └── 抓包.md         → https://becorns.github.io/小程序/抓包/
└── web/前端/
    └── 异步编程.md      → 支持任意层级嵌套
```

frontmatter 全部可选（不写也能正常显示，标题自动取正文第一个 `#` 或文件名）：

```yaml
---
title: 文章标题        # 可选：侧边栏与页面标题
description: 简介      # 可选：页面描述
date: 2025-01-15      # 可选：首页“最近更新”排序用
tags: [数据库, SQL]    # 可选：文章标签
order: 1              # 可选：分类内排序权重（小的在前）
slug: custom-path     # 可选：自定义访问路径
---
```

## 🧞 本地开发

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

## 🚀 部署到 GitHub Pages

1. 将仓库推送到 GitHub（例如 `becorns/notes` 或用户主页仓库 `becorns/becorns.github.io`）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 推送 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并部署。

### 站点地址配置

默认按用户主页站点（`https://becorns.github.io`，根路径）配置，改 `astro.config.mjs`：

```js
const site = process.env.SITE_URL ?? 'https://becorns.github.io';
const base = process.env.ASTRO_BASE ?? '/';
```

- 用户 / 组织站点（`xxx.github.io`）：`base` 保持 `/`
- 项目站点（`xxx.github.io/仓库名`）：`ASTRO_BASE=/仓库名`（或直接改 `base`）

### 个人信息

编辑 `src/site.config.ts` 可修改昵称、简介、站点标题；头像放在 `public/` 下并更新 `avatar` 字段即可。

## 📁 目录结构

```text
src/
├── content.config.ts       # 笔记内容集合定义
├── content/notes/          # ← 笔记都放这里（按分类建文件夹）
├── layouts/NoteLayout.astro  # 三栏布局
├── components/             # Sidebar / TreeItem / Toc
├── lib/notes.ts            # 目录树构建、标题提取、链接工具
├── pages/
│   ├── index.astro         # 首页
│   ├── [...slug].astro     # 笔记动态路由
│   └── 404.astro
└── styles/global.css       # 全局样式（含暗色模式）
```
