import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type { Root as MdastRoot } from 'mdast';

/**
 * 解析 Markdown 字符串为 AST (mdast)
 * @param markdown Markdown 字符串
 * @returns Markdown AST 对象
 */
export function parseMarkdown(markdown: string): MdastRoot {
  const processor = unified().use(remarkParse);
  return processor.parse(markdown) as MdastRoot;
}

/**
 * 遍历 Markdown AST 并执行回调
 * @param ast Markdown AST 对象
 * @param callback 遍历每个节点时执行的回调函数
 */
export function traverseMarkdownAst(ast: any, callback: (node: any) => void) {
  visit(ast, (node) => {
    callback(node);
  });
}
