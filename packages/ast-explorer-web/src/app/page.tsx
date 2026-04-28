'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import dynamic from 'next/dynamic';
import { parseMarkdown, parseHtml } from '@ast-tools/core';

// react-json-view 需要客户端渲染
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

type Mode = 'markdown' | 'html';

const DEFAULT_MARKDOWN = `# AST Explorer

This is a **live** AST explorer built with Next.js and \`unified\`.

- Try editing this text
- Switch between Markdown and HTML modes
`;

const DEFAULT_HTML = `<div class="container">
  <h1>AST Explorer</h1>
  <p>This is a <strong>live</strong> AST explorer built with Next.js and <code>unified</code>.</p>
  <ul>
    <li>Try editing this text</li>
    <li>Switch between Markdown and HTML modes</li>
  </ul>
</div>`;

export default function Home() {
  const [mode, setMode] = useState<Mode>('markdown');
  const [code, setCode] = useState(DEFAULT_MARKDOWN);
  const [ast, setAst] = useState<any>({});

  // 模式切换时更新默认代码
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === 'markdown') {
      setCode(DEFAULT_MARKDOWN);
    } else {
      setCode(DEFAULT_HTML);
    }
  };

  // 手动解析 AST
  const handleParse = () => {
    try {
      const newAst = mode === 'markdown' ? parseMarkdown(code) : parseHtml(code);
      setAst(newAst);
    } catch (error) {
      setAst({ type: 'error', message: String(error) });
    }
  };

  // 监听模式变化，切换模式时重新解析
  useEffect(() => {
    handleParse();
  }, [mode]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800">AST Explorer Web</h1>
        </div>
        
        {/* Mode Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => handleModeChange('markdown')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              mode === 'markdown' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Markdown
          </button>
          <button
            onClick={() => handleModeChange('html')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              mode === 'html' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            HTML
          </button>
        </div>
      </header>

      {/* Main Content - Split View */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="w-1/2 h-full border-r border-gray-200 flex flex-col">
          <div className="bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 flex justify-between items-center">
            <span>Source Code ({mode})</span>
            <button
              onClick={handleParse}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              解析 AST
            </button>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={mode}
              theme="vs-light"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                padding: { top: 16 },
              }}
            />
          </div>
        </div>

        {/* Right Panel - AST Viewer */}
        <div className="w-1/2 h-full flex flex-col bg-white">
          <div className="bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 flex justify-between items-center">
            <span>Abstract Syntax Tree ({mode === 'markdown' ? 'mdast' : 'hast'})</span>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {typeof window !== 'undefined' && (
              <ReactJson 
                src={ast} 
                theme="rjv-default"
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={true}
                collapsed={2}
                name={null}
                style={{ fontSize: '13px', backgroundColor: 'transparent' }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
