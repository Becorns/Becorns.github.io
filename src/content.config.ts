import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 笔记集合：src/content/notes 下的所有 .md 文件。
 * 新增文章只需在对应分类目录下添加 md 文件（frontmatter 全部可选）。
 * 也可在 frontmatter 中设置 slug 自定义访问路径。
 */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

export const collections = { notes };
