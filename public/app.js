document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const processButton = document.getElementById('processButton');
    const downloadButton = document.getElementById('downloadButton');
    const status = document.getElementById('status');
    const dropZone = document.getElementById('dropZone');
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const fileList = document.getElementById('fileList');
    const filterControls = document.getElementById('filterControls');
    const selectAllButton = document.getElementById('selectAll');
    const deselectAllButton = document.getElementById('deselectAll');
    let processedZip = null;
    let uploadedZip = null;
    let selectedFiles = new Set();

    // 定义需要忽略的文件和目录
    const ignoredFiles = [
        '.DS_Store',
        '.localized',
        '._*',
        '.Spotlight-V100',
        '.Trashes',
        '.fseventsd',
        '.TemporaryItems',
        '.apdisk'
    ];

    // 检查文件是否应该被忽略
    function shouldIgnoreFile(path) {
        return ignoredFiles.some(pattern => {
            if (pattern.endsWith('*')) {
                return path.includes(pattern.slice(0, -1));
            }
            return path.includes(pattern);
        });
    }

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 创建目录项
    function createDirectoryItem(name, path) {
        const item = document.createElement('div');
        item.className = 'directory';
        item.dataset.path = path; // 添加完整路径作为数据属性
        
        const header = document.createElement('div');
        header.className = 'directory-header';
        
        const icon = document.createElement('span');
        icon.className = 'directory-icon';
        icon.textContent = '▶';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.addEventListener('change', (e) => {
            const content = item.querySelector('.directory-content');
            const items = content.querySelectorAll('input[type="checkbox"]');
            items.forEach(item => {
                item.checked = checkbox.checked;
            });
            updateSelectedFiles();
        });
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'file-name';
        nameSpan.textContent = name;
        
        header.appendChild(icon);
        header.appendChild(checkbox);
        header.appendChild(nameSpan);
        
        const content = document.createElement('div');
        content.className = 'directory-content';
        content.style.display = 'none';
        
        item.appendChild(header);
        item.appendChild(content);
        
        header.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                const isExpanded = content.style.display !== 'none';
                content.style.display = isExpanded ? 'none' : 'block';
                icon.textContent = isExpanded ? '▶' : '▼';
            }
        });
        
        return item;
    }

    // 创建文件列表项
    function createFileItem(path, size, isDirectory) {
        if (isDirectory) {
            return createDirectoryItem(path.split('/').pop(), path);
        }
        
        const item = document.createElement('div');
        item.className = 'file-item';
        item.dataset.path = path; // 添加完整路径作为数据属性
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.addEventListener('change', updateSelectedFiles);
        
        const icon = document.createElement('span');
        icon.className = 'file-icon';
        icon.textContent = '📄';
        
        const name = document.createElement('span');
        name.className = 'file-name';
        name.textContent = path.split('/').pop();
        
        const sizeSpan = document.createElement('span');
        sizeSpan.className = 'file-size';
        const fileSize = size && size._data ? size._data.uncompressedSize : 0;
        sizeSpan.textContent = formatFileSize(fileSize);
        
        item.appendChild(checkbox);
        item.appendChild(icon);
        item.appendChild(name);
        item.appendChild(sizeSpan);
        
        return item;
    }

    // 更新选中的文件
    function updateSelectedFiles() {
        selectedFiles.clear();
        const checkboxes = fileList.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            const item = checkbox.closest('.file-item, .directory');
            if (item) {
                const path = item.dataset.path;
                if (path) {
                    selectedFiles.add(path);
                }
            }
        });
        updateProcessButton();
    }

    // 获取项目的完整路径
    function getItemPath(item) {
        const path = [];
        while (item && !item.classList.contains('file-list')) {
            const name = item.querySelector('.file-name')?.textContent;
            if (name) {
                path.unshift(name);
            }
            item = item.parentElement;
        }
        return path.join('/');
    }

    // 更新处理按钮状态
    function updateProcessButton() {
        processButton.disabled = selectedFiles.size === 0;
    }

    // 显示文件列表
    function displayFileList(zip) {
        fileList.innerHTML = '';
        selectedFiles.clear();
        
        // 创建目录树结构
        const tree = {};
        for (const [path, entry] of Object.entries(zip.files)) {
            if (shouldIgnoreFile(path)) continue;
            
            const parts = path.split('/');
            let current = tree;
            
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (i === parts.length - 1) {
                    // 文件
                    current[part] = entry;
                } else {
                    // 目录
                    if (!current[part]) {
                        current[part] = { dir: true, children: {} };
                    }
                    current = current[part].children;
                }
            }
        }
        
        // 递归创建目录树
        function createTreeItems(items, parentPath = '') {
            if (!items || Object.keys(items).length === 0) return null;
            
            const container = document.createElement('div');
            container.className = 'tree-container';
            
            // 先处理目录
            for (const [name, item] of Object.entries(items)) {
                if (item.dir) {
                    const path = parentPath ? `${parentPath}/${name}` : name;
                    const dirItem = createDirectoryItem(name, path);
                    const content = dirItem.querySelector('.directory-content');
                    const children = createTreeItems(item.children, path);
                    if (children) {
                        content.appendChild(children);
                        container.appendChild(dirItem);
                    } else {
                        // 如果目录为空，不添加到列表中
                        continue;
                    }
                }
            }
            
            // 再处理文件
            for (const [name, item] of Object.entries(items)) {
                if (!item.dir) {
                    const path = parentPath ? `${parentPath}/${name}` : name;
                    const fileItem = createFileItem(path, item, false);
                    container.appendChild(fileItem);
                }
            }
            
            // 只有当容器有子元素时才返回
            return container.children.length > 0 ? container : null;
        }
        
        const treeContainer = createTreeItems(tree);
        if (treeContainer) {
            fileList.appendChild(treeContainer);
        }
        
        // 默认选中所有文件
        const checkboxes = fileList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = true);
        
        // 更新选中的文件
        updateSelectedFiles();
        
        fileList.style.display = 'block';
        filterControls.style.display = 'block';
    }

    // 修改全选/取消全选按钮事件
    selectAllButton.addEventListener('click', () => {
        const checkboxes = fileList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        updateSelectedFiles();
    });

    deselectAllButton.addEventListener('click', () => {
        const checkboxes = fileList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateSelectedFiles();
    });

    // 拖拽事件处理
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('dragover');
    }

    function unhighlight(e) {
        dropZone.classList.remove('dragover');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        if (files.length === 0) return;
        
        const file = files[0];
        if (!file.name.endsWith('.zip')) {
            showStatus('请上传 ZIP 文件', 'error');
            return;
        }

        // 更新文件输入
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        // 读取 ZIP 文件并显示文件列表
        const zip = new JSZip();
        zip.loadAsync(file).then(zip => {
            uploadedZip = zip;
            displayFileList(zip);
            showStatus('请选择要处理的文件', 'info');
        }).catch(error => {
            showStatus('读取 ZIP 文件失败：' + error.message, 'error');
        });
    }

    processButton.addEventListener('click', async () => {
        if (!uploadedZip || selectedFiles.size === 0) return;

        try {
            showStatus('正在处理文件...', 'info');
            processButton.disabled = true;
            progressContainer.style.display = 'block';
            progressFill.style.width = '0%';
            progressText.textContent = '正在处理文件...';

            // 创建新的 ZIP 文件用于存储处理后的内容
            const newZip = new JSZip();

            // 用于生成目录结构的对象
            const fileStructure = {
                name: fileInput.files[0].name.replace('.zip', ''),
                type: 'directory',
                children: []
            };

            // 计算总文件数（包括目录）
            const totalFiles = selectedFiles.size;
            let processedFiles = 0;

            // 处理选中的文件
            for (const path of selectedFiles) {
                const entry = uploadedZip.files[path];
                if (!entry) continue;

                // 更新进度
                processedFiles++;
                const progress = (processedFiles / totalFiles) * 100;
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `正在处理文件 ${processedFiles}/${totalFiles}...`;

                // 确保目录存在
                const dirPath = path.split('/').slice(0, -1).join('/');
                if (dirPath) {
                    newZip.folder(dirPath);
                }

                if (entry.dir) {
                    // 如果是目录，创建目录
                    newZip.folder(path);
                    addToStructure(fileStructure, path, 'directory');
                    continue;
                }

                try {
                    // 读取文件内容
                    const content = await entry.async('string');
                    
                    // 获取文件扩展名
                    const fileExtension = path.split('.').pop().toLowerCase();
                    
                    // 对文件进行高亮处理
                    const highlightedContent = highlightCode(content, fileExtension);
                    
                    // 创建带有行号的HTML内容
                    const lines = content.split('\n');
                    const htmlContent = createHtmlContent(highlightedContent, lines, path);
                    
                    // 将处理后的HTML文件添加到新的ZIP中，保留原始文件后缀
                    const newPath = path + '.html';
                    newZip.file(newPath, htmlContent);
                    addToStructure(fileStructure, newPath, 'file');
                    
                    console.log(`处理文件: ${path} -> ${newPath}`);
                } catch (error) {
                    console.error(`处理文件 ${path} 时出错:`, error);
                    // 如果处理失败，复制原始文件
                    const content = await entry.async('blob');
                    newZip.file(path, content);
                    addToStructure(fileStructure, path, 'file');
                }
            }

            // 更新进度到90%
            progressFill.style.width = '90%';
            progressText.textContent = '正在生成最终的 ZIP 文件...';

            // 添加目录结构JSON文件
            newZip.file('file_structure.json', JSON.stringify(fileStructure, null, 2));

            // 生成处理后的 ZIP 文件
            processedZip = await newZip.generateAsync({ type: 'blob' });
            
            // 完成处理，进度条到100%
            progressFill.style.width = '100%';
            progressText.textContent = '处理完成！';
            showStatus('文件处理完成！', 'success');
            downloadButton.disabled = false;
        } catch (error) {
            showStatus('处理失败：' + error.message, 'error');
            console.error('处理过程出错:', error);
        } finally {
            processButton.disabled = false;
        }
    });

    downloadButton.addEventListener('click', () => {
        if (!processedZip) return;

        const url = window.URL.createObjectURL(processedZip);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'processed_' + fileInput.files[0].name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });

    function showStatus(message, type) {
        status.textContent = message;
        status.className = type;
    }

    function highlightCode(code, language) {
        try {
            return hljs.highlight(code, { language }).value;
        } catch (e) {
            console.warn(`无法高亮显示 ${language} 代码：`, e);
            return code;
        }
    }

    function addToStructure(structure, path, type) {
        // 检查是否应该忽略该文件
        if (shouldIgnoreFile(path)) {
            return;
        }

        const parts = path.split('/');
        let current = structure;
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === parts.length - 1) {
                // 最后一个部分
                if (type === 'file') {
                    current.children.push({
                        name: part,
                        path: path,
                        type: 'file',
                        extension: part.split('.').pop()
                    });
                } else {
                    current.children.push({
                        name: part,
                        path: path,
                        type: 'directory',
                        children: []
                    });
                }
            } else {
                // 目录部分
                let dir = current.children.find(child => child.name === part && child.type === 'directory');
                if (!dir) {
                    dir = {
                        name: part,
                        path: parts.slice(0, i + 1).join('/'),
                        type: 'directory',
                        children: []
                    };
                    current.children.push(dir);
                }
                current = dir;
            }
        }
    }

    function createHtmlContent(highlightedCode, lines, fileName) {
        return `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
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
                ${lines.map((_, i) => `<span class="line-number">${i + 1}</span>`).join('\n')}
            </div>
            <div class="code-content">
                <pre class="hljs">${highlightedCode}</pre>
            </div>
        </div>
    </div>
</body>
</html>`;
    }
}); 