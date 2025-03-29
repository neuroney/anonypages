const translations = {
    en: {
        // 通用
        switchLanguage: "中文",
        // 导航
        home: "Home",
        about: "About",
        contact: "Contact",
        // 按钮
        submit: "Submit",
        cancel: "Cancel",
        // 表单
        name: "Name",
        email: "Email",
        message: "Message",
        // 其他
        welcome: "Code Anonymization Tool for Paper Review",
        description: "Convert your code repository into an anonymous static website for paper review",
        // 文件上传
        uploadText: "Drag and drop your code repository ZIP file here or click to select",
        uploadHint: "Support for ZIP format code repositories only",
        selectFile: "Select Repository",
        selectAll: "Select All Files",
        deselectAll: "Deselect All Files",
        processing: "Processing repository...",
        process: "Process",
        download: "Download ZIP",
        // 新增说明文本
        purpose: "This tool helps you create an anonymous version of your code repository for paper review",
        features: "Features:",
        feature1: "• Removes author information and sensitive data",
        feature2: "• Generates a static website ready for Cloudflare Pages deployment",
        feature3: "• Preserves code structure and functionality",
        feature4: "• Easy to deploy and share with reviewers",
        deployGuide: "Deployment Guide",
        deployGuideDesc: "Learn how to deploy your anonymous site to Cloudflare Pages",
        themePreview: "Theme Preview",
        defaultTheme: "Default Theme",
        // 编辑器主题
        vsTheme: "Visual Studio",
        vs2015Theme: "Visual Studio 2015",
        ideaTheme: "IntelliJ IDEA",
        xcodeTheme: "Xcode",
        intellijLightTheme: "IntelliJ Light",
        // 暗色主题
        monokaiTheme: "Monokai",
        monokaiSublimeTheme: "Monokai Sublime",
        nordTheme: "Nord",
        nightOwlTheme: "Night Owl",
        tokyoNightDarkTheme: "Tokyo Night Dark",
        obsidianTheme: "Obsidian",
        stackoverflowDarkTheme: "Stack Overflow Dark",
        rosePineTheme: "Rose Pine",
        rosePineMoonTheme: "Rose Pine Moon",
        nnfxDarkTheme: "NNFX Dark",
        isblEditorDarkTheme: "ISBL Editor Dark",
        qtcreatorDarkTheme: "Qt Creator Dark",
        pandaSyntaxDarkTheme: "Panda Syntax Dark",
        kimbieDarkTheme: "Kimbie Dark",
        paraisoDarkTheme: "Paraiso Dark",
        tomorrowNightBlueTheme: "Tomorrow Night Blue",
        tomorrowNightBrightTheme: "Tomorrow Night Bright",
        hybridTheme: "Hybrid",
        irBlackTheme: "IR Black",
        // 亮色主题
        stackoverflowLightTheme: "Stack Overflow Light",
        tokyoNightLightTheme: "Tokyo Night Light",
        rosePineDawnTheme: "Rose Pine Dawn",
        nnfxLightTheme: "NNFX Light",
        isblEditorLightTheme: "ISBL Editor Light",
        qtcreatorLightTheme: "Qt Creator Light",
        pandaSyntaxLightTheme: "Panda Syntax Light",
        kimbieLightTheme: "Kimbie Light",
        paraisoLightTheme: "Paraiso Light",
        lightfairTheme: "Lightfair",
        gradientLightTheme: "Gradient Light",
        // 其他主题
        purebasicTheme: "PureBasic",
        pojoaqueTheme: "Pojoaque",
        magulaTheme: "Magula",
        googlecodeTheme: "Google Code",
        grayscaleTheme: "Grayscale",
        schoolBookTheme: "School Book",
        shadesOfPurpleTheme: "Shades of Purple",
        srceryTheme: "Srcery",
        sunburstTheme: "Sunburst",
        xt256Theme: "XT256"
    },
    zh: {
        // 通用
        switchLanguage: "English",
        // 导航
        home: "首页",
        about: "关于",
        contact: "联系",
        // 按钮
        submit: "提交",
        cancel: "取消",
        // 表单
        name: "姓名",
        email: "邮箱",
        message: "消息",
        // 其他
        welcome: "论文评审代码匿名化工具",
        description: "将代码仓库转换为匿名静态网站，用于论文评审",
        // 文件上传
        uploadText: "拖拽代码仓库 ZIP 文件到这里或点击选择",
        uploadHint: "仅支持 ZIP 格式的代码仓库",
        selectFile: "选择仓库",
        selectAll: "全选文件",
        deselectAll: "取消全选",
        processing: "正在处理仓库...",
        process: "匿名化处理",
        download: "下载 ZIP",
        // 新增说明文本
        purpose: "本工具帮助您创建用于论文评审的匿名代码仓库版本",
        features: "功能特点：",
        feature1: "• 移除作者信息和敏感数据",
        feature2: "• 生成可直接部署到 Cloudflare Pages 的静态网站",
        feature3: "• 保留代码结构和功能",
        feature4: "• 易于部署和与审稿人分享",
        deployGuide: "部署指南",
        deployGuideDesc: "了解如何将匿名网站部署到 Cloudflare Pages",
        themePreview: "主题预览",
        defaultTheme: "默认主题",
        // 编辑器主题
        vsTheme: "Visual Studio",
        vs2015Theme: "Visual Studio 2015",
        ideaTheme: "IntelliJ IDEA",
        xcodeTheme: "Xcode",
        intellijLightTheme: "IntelliJ Light",
        // 暗色主题
        monokaiTheme: "Monokai",
        monokaiSublimeTheme: "Monokai Sublime",
        nordTheme: "Nord",
        nightOwlTheme: "Night Owl",
        tokyoNightDarkTheme: "Tokyo Night Dark",
        obsidianTheme: "Obsidian",
        stackoverflowDarkTheme: "Stack Overflow Dark",
        rosePineTheme: "Rose Pine",
        rosePineMoonTheme: "Rose Pine Moon",
        nnfxDarkTheme: "NNFX Dark",
        isblEditorDarkTheme: "ISBL Editor Dark",
        qtcreatorDarkTheme: "Qt Creator Dark",
        pandaSyntaxDarkTheme: "Panda Syntax Dark",
        kimbieDarkTheme: "Kimbie Dark",
        paraisoDarkTheme: "Paraiso Dark",
        tomorrowNightBlueTheme: "Tomorrow Night Blue",
        tomorrowNightBrightTheme: "Tomorrow Night Bright",
        hybridTheme: "Hybrid",
        irBlackTheme: "IR Black",
        // 亮色主题
        stackoverflowLightTheme: "Stack Overflow Light",
        tokyoNightLightTheme: "Tokyo Night Light",
        rosePineDawnTheme: "Rose Pine Dawn",
        nnfxLightTheme: "NNFX Light",
        isblEditorLightTheme: "ISBL Editor Light",
        qtcreatorLightTheme: "Qt Creator Light",
        pandaSyntaxLightTheme: "Panda Syntax Light",
        kimbieLightTheme: "Kimbie Light",
        paraisoLightTheme: "Paraiso Light",
        lightfairTheme: "Lightfair",
        gradientLightTheme: "Gradient Light",
        // 其他主题
        purebasicTheme: "PureBasic",
        pojoaqueTheme: "Pojoaque",
        magulaTheme: "Magula",
        googlecodeTheme: "Google Code",
        grayscaleTheme: "Grayscale",
        schoolBookTheme: "School Book",
        shadesOfPurpleTheme: "Shades of Purple",
        srceryTheme: "Srcery",
        sunburstTheme: "Sunburst",
        xt256Theme: "XT256"
    }
};

// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// 设置语言
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updatePageContent();
}

// 更新页面内容
function updatePageContent() {
    const lang = getCurrentLanguage();
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// 初始化页面语言
document.addEventListener('DOMContentLoaded', () => {
    updatePageContent();
}); 