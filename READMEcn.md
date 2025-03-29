# Code2HTML

一个强大的代码转 HTML 工具，完美适用于学术论文中的双盲代码审查。

[中文](READMEcn.md) | [English](README.md)

### ✨ 功能特点

- 🚀 将代码文件转换为静态 HTML 页面
- 📦 可直接部署在 Cloudflare Pages 上
- 🎨 使用 highlight.js 实现语法高亮
- 🔒 完美适用于双盲代码审查

### 🛠️ 技术栈

- Node.js
- Express.js
- highlight.js
- HTML5/CSS3

### 📦 安装

1. 确保已安装 Node.js (v14+)
2. 克隆仓库：
```bash
git clone https://github.com/neuroney/anonypages.git
cd anonypages
```

3. 安装依赖：
```bash
npm install
```

### 🚀 快速开始

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问应用：
打开浏览器访问 http://localhost:8788

3. 使用方法：
   - 拖放包含代码的 ZIP 文件
   - 或点击选择文件

4. 等待处理完成，结果 ZIP 文件将自动下载

### 📄 输出

该工具生成一个包含以下内容的 ZIP 文件：
- 所有代码文件的静态 HTML 页面
- 文件结构 JSON (structure.json)
- 可直接部署在 Cloudflare Pages 上

### ⚠️ 限制

- 仅支持 ZIP 格式
- 建议文件大小：20MB 以下
- 大文件可能需要更长的处理时间

### 📝 许可证

MIT 许可证

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📞 联系方式

如有问题或建议，请提交 Issue 或发送邮件至 [neuroney@outlook.com] 