#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');
const { program } = require('commander');

/**
 * Convert code file to HTML format
 * @param {string} filePath - Input code file path
 * @param {string} outputPath - Output HTML file path
 * @param {string} style - Highlight.js style name
 * @param {boolean} lineNumbers - Whether to display line numbers
 * @param {boolean} fullHtml - Whether to generate complete HTML document
 * @returns {string|null} - Output HTML file path or null if failed
 */
function codeToHtml(filePath, outputPath = null, style = 'default', lineNumbers = true, fullHtml = true) {
  try {
    // 如果没有指定输出路径，使用输入文件名+.html
    if (!outputPath) {
      outputPath = `${path.parse(filePath).dir}/${path.parse(filePath).name}.html`;
    }
    
    // 确保输出目录存在
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    
    // 读取源代码文件
    const code = fs.readFileSync(filePath, 'utf-8');
    
    // 根据文件扩展名获取语言
    const extension = path.extname(filePath).slice(1);
    let highlighted;
    
    try {
      highlighted = hljs.highlight(code, { language: extension });
    } catch (e) {
      // 如果找不到对应的语言，使用纯文本
      highlighted = hljs.highlight(code, { language: 'plaintext' });
    }
    
    // 处理行号
    const lines = code.split('\n');
    const codeLines = highlighted.value.split('\n');
    
    // 构建HTML内容
    let htmlContent;
    
    if (fullHtml) {
      htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.basename(filePath)}</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .source-code-container {
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .source-code {
      display: flex;
      font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 14px;
      line-height: 1.5;
      tab-size: 4;
    }
    .line-numbers {
      padding: 0.5em;
      text-align: right;
      user-select: none;
      border-right: 1px solid #ddd;
      background-color: #f7f7f7;
      color: #999;
      min-width: 3em;
    }
    .line-number {
      display: block;
      padding: 0 0.5em;
    }
    .code-content {
      padding: 0.5em 0;
      flex-grow: 1;
      overflow-x: auto;
    }
    pre {
      margin: 0;
      padding: 0 0.5em;
    }
    /* highlight.js样式 */
    ${getHighlightJsStyle(style)}
  </style>
</head>
<body>
  <h2>${path.basename(filePath)}</h2>
  <div class="source-code-container">
    <div class="source-code">`;
      
      if (lineNumbers) {
        htmlContent += `
      <div class="line-numbers">
${lines.map((_, i) => `        <span class="line-number">${i + 1}</span>`).join('\n')}
      </div>`;
      }
      
      htmlContent += `
      <div class="code-content">
        <pre class="hljs">${highlighted.value}</pre>
      </div>
    </div>
  </div>
</body>
</html>`;
    } else {
      // 只输出代码片段
      htmlContent = `<div class="source-code-container">
  <div class="source-code">`;
      
      if (lineNumbers) {
        htmlContent += `
    <div class="line-numbers">
${lines.map((_, i) => `      <span class="line-number">${i + 1}</span>`).join('\n')}
    </div>`;
      }
      
      htmlContent += `
    <div class="code-content">
      <pre class="hljs">${highlighted.value}</pre>
    </div>
  </div>
</div>`;
    }
    
    // 写入HTML文件
    fs.writeFileSync(outputPath, htmlContent, 'utf-8');
    
    return outputPath;
  } catch (err) {
    console.error(`错误: ${err.message}`);
    return null;
  }
}

/**
 * Process the entire directory, converting all files to HTML format
 * @param {string} inputDir - Input directory path
 * @param {string} outputDir - Output directory path
 * @param {string} style - Highlight.js style name
 * @param {boolean} lineNumbers - Whether to display line numbers
 * @param {boolean} fullHtml - Whether to generate complete HTML documents
 * @param {Array<string>} ignoredFiles - List of files to ignore
 * @returns {Array} - [successCount, failedCount, skippedCount]
 */
function processDirectory(inputDir, outputDir, style = 'default', lineNumbers = true, fullHtml = true, ignoredFiles = ['.DS_Store']) {
  let successCount = 0;
  let failedCount = 0;
  let skippedCount = 0;
  
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  
  // Process files recursively
  function processFiles(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const inputPath = path.join(dir, item);
      const stats = fs.statSync(inputPath);
      
      // Calculate relative path to maintain same structure in output directory
      const relPath = path.relative(inputDir, dir);
      const targetDir = path.join(outputDir, relPath);
      
      if (stats.isDirectory()) {
        // Process subdirectory
        fs.mkdirSync(path.join(targetDir, item), { recursive: true });
        processFiles(inputPath);
      } else {
        // Skip ignored files
        if (ignoredFiles.includes(item)) {
          skippedCount++;
          console.log(`Skipping ignored file: ${inputPath}`);
          continue;
        }
        
        // Process file
        const outputPath = path.join(targetDir, `${item}.html`);
        
        try {
          const result = codeToHtml(
            inputPath,
            outputPath,
            style,
            lineNumbers,
            fullHtml
          );
          
          if (result) {
            successCount++;
            console.log(`Conversion successful: ${inputPath} -> ${outputPath}`);
          } else {
            failedCount++;
            console.log(`Conversion failed: ${inputPath}`);
          }
        } catch (err) {
          failedCount++;
          console.error(`Error processing ${inputPath}: ${err.message}`);
        }
      }
    }
  }
  
  processFiles(inputDir);
  
  return [successCount, failedCount, skippedCount];
}

/**
 * Generate directory file structure and save as JSON file
 * @param {string} directory - Directory to scan
 * @param {string|null} outputPath - Output JSON file path
 * @param {Array<string>} ignoredFiles - List of files to ignore
 * @returns {string|null} - Output JSON file path or null if failed
 */
function generateFileStructure(directory, outputPath = null, ignoredFiles = ['.DS_Store']) {
  try {
    if (!outputPath) {
      outputPath = path.join(
        path.dirname(directory), 
        `${path.basename(directory)}_structure.json`
      );
    }
    
    // Get output directory path
    const outputDir = path.dirname(outputPath);
    
    // Convert directory to absolute path
    const absDirectory = path.resolve(directory);
    
    const fileStructure = {
      name: path.basename(absDirectory),
      path: path.relative(outputDir, absDirectory),
      type: 'directory',
      children: []
    };
    
    // Recursively scan directory
    function scanDirectory(dirPath, structure) {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        
        // Skip ignored files
        if (ignoredFiles.includes(item)) {
          continue;
        }
        
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          // Process subdirectory
          const dirInfo = {
            name: item,
            path: path.relative(outputDir, itemPath),
            type: 'directory',
            children: []
          };
          structure.children.push(dirInfo);
          scanDirectory(itemPath, dirInfo);
        } else {
          // Process file
          const fileInfo = {
            name: item,
            path: path.relative(outputDir, itemPath),
            type: 'file',
            size: stats.size,
            extension: path.extname(item),
            last_modified: stats.mtimeMs
          };
          structure.children.push(fileInfo);
        }
      }
    }
    
    scanDirectory(absDirectory, fileStructure);
    
    // Write JSON file
    fs.writeFileSync(outputPath, JSON.stringify(fileStructure, null, 2), 'utf-8');
    
    return outputPath;
  } catch (err) {
    console.error(`Error generating file structure: ${err.message}`);
    return null;
  }
}

/**
 * Get highlight.js style CSS
 * @param {string} style - Highlight.js style name
 * @returns {string} - CSS content
 */
function getHighlightJsStyle(style = 'default') {
  // 首先尝试加载指定的样式
  try {
    // 使用require方式加载highlight.js的样式
    const stylePath = require.resolve(`highlight.js/styles/${style}.css`);
    return fs.readFileSync(stylePath, 'utf-8');
  } catch (e) {
    console.warn(`警告: 找不到样式 "${style}"，使用默认样式`);
    try {
      // 尝试加载默认样式
      const defaultStylePath = require.resolve('highlight.js/styles/default.css');
      return fs.readFileSync(defaultStylePath, 'utf-8');
    } catch (e) {
      // 如果加载失败，返回基础样式
      return `
        /* 基础highlight.js样式 */
        .hljs {
          display: block;
          overflow-x: auto;
          padding: 0.5em;
          background: #f0f0f0;
        }
        .hljs-keyword, .hljs-selector-tag { color: #0000ff; }
        .hljs-string { color: #008000; }
        .hljs-comment { color: #800; font-style: italic; }
        .hljs-number { color: #00a; }
      `;
    }
  }
}

// Main function to handle CLI
function main() {
  program
    .name('code-to-html')
    .description('Convert code files to HTML format')
    .argument('<input>', 'Input code file path or directory path')
    .option('-o, --output <path>', 'Output HTML file path or directory')
    .option('-s, --style <name>', 'Code highlight style', 'default')
    .option('-n, --no-line-numbers', 'Do not display line numbers')
    .option('--fragment', 'Output HTML fragment only, not complete HTML document')
    .option('--ignore <items...>', 'Files to ignore', ['.DS_Store'])
    .option('--structure-output <path>', 'Specify output path for structure JSON file')
    .action((input, options) => {
      try {
        const stats = fs.statSync(input);
        
        if (stats.isDirectory()) {
          // Process entire directory
          if (!options.output) {
            options.output = input + '_html';
          }
          
          // 默认生成结构文件，无需使用 --structure 标志
          const structureOutput = generateFileStructure(
            input,
            options.structureOutput,
            options.ignore
          );
          
          if (structureOutput) {
            console.log(`Directory structure file generated: ${structureOutput}`);
          }
          
          console.log(`Processing directory ${input}, output to ${options.output}`);
          console.log(`Ignored files: ${options.ignore.join(', ')}`);
          
          const [success, failed, skipped] = processDirectory(
            input,
            options.output,
            options.style,
            options.lineNumbers,
            !options.fragment,
            options.ignore
          );
          
          console.log(`\nProcessing complete! Success: ${success} files, Failed: ${failed} files, Skipped: ${skipped} files`);
          console.log('\nTip: Available styles include default, github, vs, atom-one-dark, etc.');
          console.log('     For more styles, refer to highlight.js documentation');
        } else {
          // Process single file
          if (options.ignore.includes(path.basename(input))) {
            console.log(`Skipping ignored file: ${input}`);
            return;
          }
          
          const outputPath = codeToHtml(
            input,
            options.output,
            options.style,
            options.lineNumbers,
            !options.fragment
          );
          
          if (outputPath) {
            console.log(`HTML file generated: ${outputPath}`);
            console.log('Tip: Available styles include default, github, vs, atom-one-dark, etc.');
            console.log('     For more styles, refer to highlight.js documentation');
          }
        }
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    })
    .parse();
}

// Run the program if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  codeToHtml,
  processDirectory,
  generateFileStructure
};