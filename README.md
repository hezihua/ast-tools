# AST Tools

这个项目包含了两个用于解析和遍历抽象语法树 (AST) 的工具：
1. **Markdown AST** (`src/markdown-ast.ts`)
2. **HTML AST** (`src/html-ast.ts`)

## 依赖
本项目使用 Node.js，并基于 `unified` 生态系统构建：
- `remark-parse` 用于解析 Markdown (mdast)
- `rehype-parse` 用于解析 HTML (hast)
- `unist-util-visit` 用于遍历 AST 节点

## 安装
```bash
npm install
```

## 运行示例

### 1. Markdown AST 工具
解析 Markdown 字符串，并提取其中的文本节点。
```bash
npx tsx src/markdown-ast.ts
```

### 2. HTML AST 工具
解析 HTML 字符串，并提取其中的标签名。
```bash
npx tsx src/html-ast.ts
```

## API 使用
你可以在其他文件中导入并使用它们：

```typescript
import { parseMarkdown, traverseMarkdownAst } from './src/markdown-ast.js';
import { parseHtml, traverseHtmlAst } from './src/html-ast.js';

// Markdown
const mdAst = parseMarkdown('# Title');
traverseMarkdownAst(mdAst, (node) => {
  console.log(node.type);
});

// HTML
const htmlAst = parseHtml('<div>Hello</div>');
traverseHtmlAst(htmlAst, (node) => {
  console.log(node.type);
});
```
# ast-tools
