# Vercel 部署说明

## 🚀 一键部署到 Vercel

### 方法一：使用 Vercel 仪表板

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入仓库**
   - 点击 "Add New" → "Project"
   - 在 "Import Git Repository" 中输入：`https://github.com/kubaba2012/sleep-consultant-miniprogram`
   - 点击 "Import"

3. **配置项目**
   - **Project Name**: `sleep-consultant-miniprogram`（可自定义）
   - **Framework Preset**: `Static HTML`
   - **Root Directory**: `/`
   - **Build Command**: 留空（Vercel 会自动识别）
   - **Output Directory**: 留空（Vercel 会自动识别）
   - **Environment Variables**: 留空

4. **部署**
   - 点击 "Deploy"
   - 等待部署完成

### 方法二：使用 Vercel CLI

#### 1. 安装 Vercel CLI
```bash
# 使用 npm
npm install -g vercel

# 或使用 yarn
yarn global add vercel
```

#### 2. 登录 Vercel
```bash
vercel login
```
- 选择 "GitHub" 作为登录方式
- 在浏览器中授权登录

#### 3. 初始化项目
```bash
cd /path/to/sleep-consultant-miniprogram
vercel init
```
- 按提示选择项目配置
- 选择 "Static HTML" 模板

#### 4. 部署
```bash
vercel --prod
```

## 📋 项目结构要求

### 1. 入口文件
Vercel 会自动识别以下入口文件：
- `index.html` (主要入口)
- `public/` 目录中的文件（如果存在）

### 2. 部署配置
当前项目已包含以下配置文件：

#### vercel.json (项目配置)
```json
{
  "version": 2,
  "buildCommand": "echo 'Static site' && ls -la",
  "devCommand": "python3 -m http.server 8000",
  "installCommand": "echo 'No dependencies'",
  "framework": null,
  "regions": ["all"],
  "routes": [
    { "src": "/(.*)", "dest": "/$1" }
  ],
  "static": {
    "public": "./",
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
}
```

#### package.json (项目元数据)
```json
{
  "name": "sleep-consultant-miniprogram",
  "version": "1.0.0",
  "description": "助眠师微信小程序界面原型",
  "main": "index.html",
  "scripts": {
    "dev": "python3 -m http.server 8000",
    "build": "echo 'Static site' && ls -la",
    "start": "python3 -m http.server 8000",
    "clean": "rm -rf dist"
  },
  "keywords": ["sleep", "meditation", "wechat-miniprogram", "health"],
  "author": "张小明",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/kubaba2012/sleep-consultant-miniprogram"
  }
}
```

## 🔄 自动部署

### 1. GitHub Actions
如需自动部署，可创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to Vercel
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 16.x
      - name: Install Vercel CLI
        run: npm install -g vercel
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

### 2. 环境变量
在 GitHub 仓库中添加以下 Secrets：
- `VERCEL_TOKEN`: 从 Vercel 账户获取的部署令牌

## 📊 部署后管理

### 访问部署地址
部署完成后，Vercel 会提供以下地址：
- 生产地址：`https://sleep-consultant-miniprogram.vercel.app`
- 预览地址（每次提交）：`https://sleep-consultant-miniprogram-git-<branch>.vercel.app`

### 监控部署
- 在 Vercel 仪表板查看部署状态
- 检查部署日志和错误信息
- 配置自定义域名和 SSL 证书

### 性能优化建议

1. **启用 Gzip 压缩** - Vercel 会自动启用
2. **缓存策略** - 使用 `Cache-Control` 头
3. **图片优化** - 使用 WebP 格式和适当的尺寸
4. **代码分割** - 将 JavaScript 分为小块
5. **CDN 分发** - Vercel 使用全球 CDN

## ❓ 常见问题

### 1. 部署失败
- 检查 `vercel.json` 配置
- 确保入口文件存在
- 检查 GitHub 仓库权限

### 2. 404 错误
- 确保路由配置正确
- 检查是否有 `index.html` 文件
- 验证 `static` 配置

### 3. 构建错误
- 检查 `buildCommand` 配置
- 确保所需依赖已安装
- 查看部署日志

## 🎯 下一步

1. **测试部署**：按照上述步骤部署项目
2. **添加自定义域名**：在 Vercel 中配置域名
3. **设置 SSL**：Vercel 会自动提供 SSL 证书
4. **监控性能**：使用 Vercel Analytics
5. **配置 CI/CD**：设置自动部署流程

---

**部署成功后，你可以通过以下地址访问项目：**
- 主站：https://sleep-consultant-miniprogram.vercel.app
- GitHub 仓库：https://github.com/kubaba2012/sleep-consultant-miniprogram