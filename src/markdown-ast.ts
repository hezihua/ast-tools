import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

/**
 * 解析 Markdown 字符串为 AST (mdast)
 * @param markdown Markdown 字符串
 * @returns Markdown AST 对象
 */
export function parseMarkdown(markdown: string) {
  const processor = unified().use(remarkParse);
  return processor.parse(markdown);
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

// 示例用法 (直接运行该文件时执行)
if (import.meta.url === `file://${process.argv[1]}`) {
  const sampleMd = `# Hello World\n\nThis is a **bold** text.`;
  const ast = parseMarkdown(sampleMd);
  
  console.log('--- Markdown AST ---');
  console.log(JSON.stringify(ast, null, 2));

  console.log('\n--- 提取所有的文本节点 ---');
  traverseMarkdownAst(ast, (node) => {
    if (node.type === 'text') {
      console.log('Text node:', node.value);
    }
  });
}
