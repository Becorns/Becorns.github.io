import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

/** 目录树节点：本质是一棵多叉树，depth 为标题层级，children 为子节点 */
export interface TocNode extends Heading {
  children: TocNode[];
}

/**
 * 将扁平 heading 列表按层级组织成树（Obsidian / 文件目录风格）。
 * 处理跳级（例如只有 h2 与 h4 时，h4 挂到最近的 h2 之下）。
 */
export function buildHeadingTree(headings: Heading[], baseDepth: number): TocNode[] {
  const items = headings.filter((h) => h.depth >= baseDepth);
  if (items.length === 0) return [];
  const min = Math.min(...items.map((h) => h.depth));
  const stack: { level: number; node: TocNode }[] = [];
  const roots: TocNode[] = [];

  for (const h of items) {
    const level = h.depth - min; // 归一化层级，根为 0
    const node: TocNode = { ...h, children: [] };
    // 弹出层级 >= 当前层级的祖先，使当前节点挂到最近且层级更小的节点下
    while (stack.length > 0 && stack[stack.length - 1].level >= level) stack.pop();
    if (stack.length === 0) {
      roots.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }
    stack.push({ level, node });
  }
  return roots;
}

export interface FileNode {
  type: 'file';
  id: string; // 笔记 id，如 'web/sql'
  name: string; // 树中显示名称
  order?: number; // frontmatter 中的排序权重
}

export interface DirNode {
  type: 'dir';
  name: string;
  pathSegs: string[];
  children: TreeNode[];
}

export type TreeNode = FileNode | DirNode;

const collator = new Intl.Collator('zh-Hans-CN', { numeric: true, sensitivity: 'base' });

/** 笔记标题：frontmatter.title > 文件名（不再取正文第一个 H1） */
export function titleOf(note: Note): string {
  if (note.data.title?.trim()) return note.data.title.trim();
  return note.id.split('/').pop() ?? note.id;
}

export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection('notes');
  return notes.sort((a, b) => collator.compare(a.id, b.id));
}

/**
 * 将笔记列表组织成目录树（Obsidian 风格）：
 * 目录在前、文件在后，同级按名称排序；文件可按 frontmatter order 置前。
 */
export function buildTree(notes: Note[]): TreeNode[] {
  const roots: TreeNode[] = [];
  const dirMap = new Map<string, DirNode>();

  const getDir = (pathSegs: string[]): DirNode => {
    const key = pathSegs.join('/');
    let dir = dirMap.get(key);
    if (dir) return dir;
    const parentSegs = pathSegs.slice(0, -1);
    const parent = parentSegs.length ? getDir(parentSegs) : null;
    dir = { type: 'dir', name: pathSegs[pathSegs.length - 1], pathSegs, children: [] };
    dirMap.set(key, dir);
    (parent ? parent.children : roots).push(dir);
    return dir;
  };

  for (const note of notes) {
    const segs = note.id.split('/');
    const dirSegs = segs.slice(0, -1);
    const dir = dirSegs.length ? getDir(dirSegs) : null;
    const node: FileNode = {
      type: 'file',
      id: note.id,
      name: titleOf(note),
      order: note.data.order,
    };
    (dir ? dir.children : roots).push(node);
  }

  const sortNodes = (nodes: TreeNode[]): void => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      if (a.type === 'file' && b.type === 'file') {
        const oa = a.order ?? Number.MAX_SAFE_INTEGER;
        const ob = b.order ?? Number.MAX_SAFE_INTEGER;
        if (oa !== ob) return oa - ob;
      }
      return collator.compare(a.name, b.name);
    });
    for (const n of nodes) if (n.type === 'dir') sortNodes(n.children);
  };
  sortNodes(roots);
  return roots;
}

export interface Group {
  /** 目录完整路径，如 "web / 前端" */
  label: string;
  files: FileNode[];
}

/** 收集所有“直接含有笔记文件”的目录分组，用于首页索引 */
export function collectGroups(tree: TreeNode[], prefix: string[] = []): Group[] {
  const groups: Group[] = [];
  for (const node of tree) {
    if (node.type === 'dir') {
      const segs = [...prefix, node.name];
      const files = node.children.filter((c): c is FileNode => c.type === 'file');
      if (files.length > 0) groups.push({ label: segs.join(' / '), files });
      groups.push(...collectGroups(node.children, segs));
    }
  }
  return groups;
}

/** 生成带 base 的页面链接（末尾带 /，兼容 GitHub Pages 静态目录） */
export function pageHref(id: string): string {
  return import.meta.env.BASE_URL + id + '/';
}
