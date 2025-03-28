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
    fetch('repos_structure.json')
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
            errorElement.textContent = `Failed to load repository structure: ${error.message}`;
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
        icon.src = 'icons/folder.ico'; // 使用本地文件夹图标
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
        icon.src = 'icons/file.ico'; // 使用本地文件图标
        icon.alt = 'File';
        itemContent.appendChild(icon);

        const link = document.createElement('a');
        link.className = 'file-link';
        link.textContent = node.name;
        link.href = `${node.path}.html`;
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
        return 'icons/file.ico';
    }
});