# AnonyPages

A powerful tool for converting code to HTML, perfect for double-blind code review in academic papers.

[English](README.md) | [中文](READMEcn.md)


### ✨ Features

- 🚀 Convert code files to static HTML pages
- 📦 Ready to deploy on Cloudflare Pages
- 🎨 Syntax highlighting with highlight.js
- 🔒 Perfect for double-blind code review

### 🛠️ Tech Stack

- Node.js
- Express.js
- highlight.js
- HTML5/CSS3

### 📦 Installation

1. Ensure Node.js (v14+) is installed
2. Clone the repository:
```bash
git clone https://github.com/neuroney/anonypages.git
cd anonypages
```

3. Install dependencies:
```bash
npm install
```

### 🚀 Quick Start

1. Start the development server:
```bash
npm run dev
```

2. Access the application:
Open your browser and visit http://localhost:8788

3. Usage:
   - Drag and drop your ZIP file containing code
   - Or click to select file

4. Wait for processing, the result ZIP will be downloaded

### 📄 Output

The tool generates a ZIP file containing:
- Static HTML pages for all code files
- File structure JSON (structure.json)
- Ready to deploy on Cloudflare Pages

### ⚠️ Limitations

- ZIP format only
- Recommended file size: under 20MB
- Large files may require longer processing time

### 📝 License

MIT License

### 🤝 Contributing

Issues and Pull Requests are welcome!
