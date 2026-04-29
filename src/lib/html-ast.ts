import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { visit } from 'unist-util-visit';
import type { Root as HastRoot } from 'hast';

/**
 * 解析 HTML 字符串为 AST (hast)
 * @param html HTML 字符串
 * @returns HTML AST 对象
 */
export function parseHtml(html: string): HastRoot {
  // fragment: true 表示解析为 HTML 片段，而不是完整的 HTML 文档
  const processor = unified().use(rehypeParse, { fragment: true });
  return processor.parse(html) as HastRoot;
}

/**
 * 遍历 HTML AST 并执行回调
 * @param ast HTML AST 对象
 * @param callback 遍历每个节点时执行的回调函数
 */
export function traverseHtmlAst(ast: any, callback: (node: any) => void) {
  visit(ast, (node) => {
    callback(node);
  });
}
