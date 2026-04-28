import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { visit } from 'unist-util-visit';

/**
 * 解析 HTML 字符串为 AST (hast)
 * @param html HTML 字符串
 * @returns HTML AST 对象
 */
export function parseHtml(html: string) {
  // fragment: true 表示解析为 HTML 片段，而不是完整的 HTML 文档
  const processor = unified().use(rehypeParse, { fragment: true });
  return processor.parse(html);
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

// 示例用法 (直接运行该文件时执行)
if (import.meta.url === `file://${process.argv[1]}`) {
  const sampleHtml = `<div><h1>Hello World</h1><p>This is a <strong>bold</strong> text.</p></div>`;
  const ast = parseHtml(sampleHtml);
  
  console.log('--- HTML AST ---');
  console.log(JSON.stringify(ast, null, 2));

  console.log('\n--- 提取所有的标签名 ---');
  traverseHtmlAst(ast, (node) => {
    if (node.type === 'element') {
      console.log('Element tag:', node.tagName);
    }
  });
}
