// 文件图标 SVG 模板
export const folderIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 4H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
    <path d="M12 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4"/>
</svg>`;

export const fileIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13 2H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
    <path d="M13 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2"/>
</svg>`;

// HTML 模板
export const indexHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anonymous Codes</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Anonymous Codes</h1>
        
        <div class="repo-info">
            <h2>About this viewer</h2>
            <p>This viewer contains the codes as described in our paper. </p>
        </div>

        <div class="file-tree">
            
            <div id="loading">
                <div class="loading-spinner"></div>
                <span>Loading repository structure...</span>
            </div>
            
            <div id="error"></div>
            
            <div id="file-tree-root"></div>
        </div>
    
    </div>

    <script src="script.js"></script>
</body>
</html>`;

// package.json 模板
export const packageJsonTemplate = `{
  "name": "anonymous-codes",
  "version": "1.0.0",
  "description": "A static file tree viewer for repositories",
  "main": "index.html",
  "scripts": {
    "start": "npx serve ."
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`;


// styles.css 模板
export const stylesCssTemplate = `
                :root {
  /* Color Theme */
  --bg-color: #f8f9fa;
  --panel-bg: #ffffff;
  --border-color: #e1e4e8;
  --text-color: #24292e;
  --text-secondary: #586069;
  --accent-color: #0366d6;
  --hover-bg: #f6f8fa;
  --folder-icon: #79b8ff;
  --file-default: #959da5;
  --shadow-color: rgba(0, 0, 0, 0.05);
  
  /* File type colors */
  --js-color: #f1e05a;
  --html-color: #e34c26;
  --css-color: #563d7c;
  --ts-color: #2b7489;
  --py-color: #3572A5;
  --md-color: #083fa1;
  --json-color: #40a9ff;
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0d1117;
    --panel-bg: #161b22;
    --border-color: #30363d;
    --text-color: #c9d1d9;
    --text-secondary: #8b949e;
    --accent-color: #58a6ff;
    --hover-bg: #1f2428;
    --folder-icon: #79b8ff;
    --file-default: #8b949e;
    --shadow-color: rgba(0, 0, 0, 0.3);
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
}

/* File Tree */
.file-tree {
  background-color: var(--panel-bg);
  border-radius: 6px;
  box-shadow: 0 1px 3px var(--shadow-color);
  margin-bottom: 2rem;
  overflow: hidden;
}

.file-tree-header {
  background-color: var(--hover-bg);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  font-weight: 600;
}

.tree-controls {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: var(--hover-bg);
  border-bottom: 1px solid var(--border-color);
}

.tree-control-btn {
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.tree-control-btn:hover {
  background-color: var(--hover-bg);
}

/* Tree List */
.tree-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
}

.tree-list ul {
  list-style: none;
  margin: 0;
  padding-left: 1.5rem;
  border-left: 1px dotted var(--border-color);
  margin-left: 0.5rem;
}

/* 确保文件夹内容在文件夹名称下方 */
.tree-item {
  margin: 0;
  padding: 0;
  display: block; /* 改为块级元素 */
  position: relative;
}

.tree-item:before {
  content: "";
  position: absolute;
  left: -1rem;
  top: 0.7rem;
  width: 0.5rem;
  height: 1px;
  background-color: var(--border-color);
}

/* Remove connection lines from root level */
#file-tree-root > ul {
  border-left: none;
}

#file-tree-root > ul > .tree-item:before {
  display: none;
}

.item-content {
  display: flex;
  align-items: center;
  padding: 0.25rem 1rem;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

.directory-item > .item-content {
  cursor: pointer;
}

.directory-item > .item-content:hover {
  background-color: var(--hover-bg);
}

.file-item > .item-content:hover {
  background-color: var(--hover-bg);
}

/* 文件夹子元素容器 */
.directory-children {
  width: 100%;
  overflow: hidden; /* 包含子元素的动画 */
}

/* Ensure folder stays visible */
.directory-item {
  position: relative;
}

.toggle {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.75rem;
  user-select: none;
}

/* 更新图标样式以适配图片图标 */
.icon {
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.folder-icon, .file-icon {
  vertical-align: middle;
  object-fit: contain;
}

.folder-name {
  color: var(--text-color);
  font-weight: 500;
}

.file-link {
  color: var(--text-color);
  text-decoration: none;
  display: inline-block;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-link:hover {
  color: var(--accent-color);
  text-decoration: underline;
}

/* Loading and Error states */
#loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--accent-color);
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

#error {
  display: none;
  background-color: #ffebe9;
  border: 1px solid #ffc1ba;
  color: #b62324;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 6px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
                `;

// script.js 模板
export const scriptJsTemplate = `

                
/**
 * Repository Tree Viewer
 * Loads repository structure from JSON and renders an interactive tree view
 * with modern UI and improved interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const fileTreeRoot = document.getElementById('file-tree-root');
    const loadingIndicator = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    /**
     * Fetch the repository structure from repos.json
     */
    fetch('./processed_repos/file_structure.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadingIndicator.style.display = 'none';
            renderTree(data, fileTreeRoot);
            initializeTreeInteractions();
            
            // 添加自动展开根文件夹的代码
            setTimeout(() => {
                // 查找根文件夹的toggle元素并点击它
                const rootToggle = document.querySelector('#file-tree-root > ul > li.tree-item.directory-item > div.item-content > span.toggle');
                if (rootToggle) {
                    rootToggle.click();
                }
            }, 100);
        })
        .catch(error => {
            console.error('Error loading repository data:', error);
            loadingIndicator.style.display = 'none';
            errorElement.style.display = 'block';
            errorElement.textContent = \`Failed to load repository structure: \${error.message}\`;
        });

    /**
     * Add tree-wide interaction handlers
     */
    function initializeTreeInteractions() {
        // Add expand all / collapse all buttons
        const treeControls = document.createElement('div');
        treeControls.className = 'tree-controls';
        
        const expandAll = document.createElement('button');
        expandAll.textContent = 'Expand All';
        expandAll.className = 'tree-control-btn';
        expandAll.addEventListener('click', () => toggleAllFolders(true));
        
        const collapseAll = document.createElement('button');
        collapseAll.textContent = 'Collapse All';
        collapseAll.className = 'tree-control-btn';
        collapseAll.addEventListener('click', () => toggleAllFolders(false));
        
        treeControls.appendChild(expandAll);
        treeControls.appendChild(collapseAll);
        
        fileTreeRoot.parentNode.insertBefore(treeControls, fileTreeRoot);
    }
    
    /**
     * Toggle all folders open or closed
     * @param {boolean} expand - Whether to expand or collapse
     */
    function toggleAllFolders(expand) {
        const allLists = document.querySelectorAll('#file-tree-root ul ul');
        const allToggles = document.querySelectorAll('.tree-item .toggle');
        
        allLists.forEach(list => {
            list.style.display = expand ? 'block' : 'none';
        });
        
        allToggles.forEach(toggle => {
            if (toggle.innerHTML !== '&nbsp;') {
                toggle.innerHTML = expand ? '▼' : '▶';
            }
        });
    }

    /**
     * Render a directory node with toggle functionality
     * @param {Object} node - Directory node from the JSON structure
     * @param {HTMLElement} item - List item element
     * @param {HTMLElement} itemContent - Container for item content
     */
    function renderDirectory(node, item, itemContent) {
        // 1. 首先创建文件夹标题行
        const toggle = document.createElement('span');
        toggle.className = 'toggle';
   
        toggle.innerHTML = '▶';
        
        const icon = document.createElement('img');
        icon.className = 'icon folder-icon';
        icon.src = 'icons/folder.svg'; // 使用 SVG 图标
        icon.alt = 'Folder';
        
        const folderName = document.createElement('span');
        folderName.className = 'folder-name';
        folderName.textContent = node.name;
        
        itemContent.appendChild(toggle);
        itemContent.appendChild(icon);
        itemContent.appendChild(folderName);
        
        // 其余代码保持不变...
        
        // 2. 将标题行添加到item
        item.appendChild(itemContent);
        
        // 3. 创建子元素容器
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'directory-children';
        item.appendChild(childrenContainer);
        
        // 4. 在子容器中渲染子元素
        if (node.children && node.children.length > 0) {
            const childList = document.createElement('ul');
            childList.className = 'tree-list';
            childrenContainer.appendChild(childList);
            
            // 默认显示根目录的子列表，其余隐藏
            const isRootLevel = node.path === 'repos' || node.path === '';
            childList.style.display = isRootLevel ? 'block' : 'none';
            
            // 渲染每个子元素
            node.children.forEach(child => {
                if (!child.type) {
                    console.warn('Node missing type:', child);
                    return;
                }
                
                const childItem = document.createElement('li');
                childItem.className = 'tree-item';
                if (child.type === 'directory') childItem.className += ' directory-item';
                if (child.type === 'file') childItem.className += ' file-item';
                
                const childItemContent = document.createElement('div');
                childItemContent.className = 'item-content';
                
                if (child.type === 'directory') {
                    renderDirectory(child, childItem, childItemContent);
                } else if (child.type === 'file') {
                    renderFile(child, childItemContent);
                    childItem.appendChild(childItemContent);
                }
                
                childList.appendChild(childItem);
            });
        }
        
        // 5. 设置点击事件处理
        toggle.onclick = function(e) {
            e.stopPropagation();
            const childList = childrenContainer.querySelector('ul');
            if (childList) {
                const isHidden = childList.style.display === 'none';
                childList.style.display = isHidden ? 'block' : 'none';
                toggle.innerHTML = isHidden ? '▼' : '▶';
                
                // 添加动画类
                if (isHidden) {
                    childList.classList.add('folder-open');
                    setTimeout(() => childList.classList.remove('folder-open'), 300);
                } else {
                    childList.classList.add('folder-close');
                    setTimeout(() => childList.classList.remove('folder-close'), 300);
                }
            }
        };
        
        // 使整个目录行可点击
        itemContent.addEventListener('click', function(e) {
            if (e.target !== toggle) {
                toggle.click();
            }
        });
    }

    /**
     * 注意：由于我们改变了目录渲染逻辑，不再需要原来的renderTree函数递归调用
     * 而是在renderDirectory中直接处理子节点。为兼容现有代码，保留一个简化版本。
     */
    function renderTree(node, parentElement) {
        const list = document.createElement('ul');
        list.className = 'tree-list';
        parentElement.appendChild(list);
        
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => {
                if (!child.type) {
                    console.warn('Node missing type:', child);
                    return;
                }
                
                const item = document.createElement('li');
                item.className = 'tree-item';
                if (child.type === 'directory') item.className += ' directory-item';
                if (child.type === 'file') item.className += ' file-item';
                
                const itemContent = document.createElement('div');
                itemContent.className = 'item-content';
                
                if (child.type === 'directory') {
                    renderDirectory(child, item, itemContent);
                } else if (child.type === 'file') {
                    renderFile(child, itemContent);
                    item.appendChild(itemContent);
                }
                
                list.appendChild(item);
            });
        }
    }

    /**
     * Render a file node with appropriate icon and link
     * @param {Object} node - File node from the JSON structure
     * @param {HTMLElement} itemContent - Container for item content
     */
    function renderFile(node, itemContent) {
        const toggle = document.createElement('span');
        toggle.className = 'toggle';
        toggle.innerHTML = '&nbsp;';
        itemContent.appendChild(toggle);

        const icon = document.createElement('img');
        icon.className = 'icon file-icon';
        icon.src = 'icons/file.svg'; // 使用 SVG 图标
        icon.alt = 'File';
        itemContent.appendChild(icon);

        const link = document.createElement('a');
        link.className = 'file-link';
        link.textContent = node.name;
        link.href = \`processed_repos/\${node.path}\`;
        link.target = '_blank';
        
        itemContent.appendChild(link);
    }

    /**
     * Get an appropriate icon for a file based on its extension
     * @param {string} extension - File extension including dot
     * @return {string} Icon character or HTML
     */
    function getFileIcon(extension) {
        // 不再需要这个函数，我们在renderFile中直接使用了本地图标
        // 但为兼容性保留此函数
        return 'icons/file.svg';
    }
});`;

// 源代码查看器 HTML 模板
export const sourceCodeViewerTemplate = (fileName, highlightedCode, lines, theme = 'default') => `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/${theme}.min.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .source-code-container {
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 20px;
            background-color: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
        h2 {
            color: #333;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        .hljs {
            background: transparent;
        }
    </style>
</head>
<body>
    <h2>${fileName}</h2>
    <div class="source-code-container">
        <div class="source-code">
            <div class="line-numbers">
                ${lines.map((_, i) => `<span class="line-number">${i + 1}</span>`).join('')}
            </div>
            <div class="code-content">
                <pre class="hljs">${highlightedCode}</pre>
            </div>
        </div>
    </div>
</body>
</html>`; 