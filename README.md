# TJNPython.github.io

至高的，伟大的，胜利的，崇高的，不败的。

---

# TJN-PYTHON SYSTEM

基于 [mdui](https://github.com/zdhxiong/mdui)（Material Design 3 Web Components 组件库）重构的个人系统控制台。

## 特性

- 密钥验证 / 命令控制台 / 无权限锁定三页式界面
- 多语言支持：简体中文、繁体中文、English、日本語
- 浅色 / 深色 / 跟随系统 主题
- 莫奈动态配色（罗勒绿 / 海蓝 / 紫罗兰 / 琥珀橙 / 粉玫瑰）
- 自定义背景上传 + 背景模糊调节
- 调试面板：模糊强度、验证尝试次数、动画 / 存储 / 历史 / 收藏 开关
- 命令历史与收藏夹（localStorage 持久化）

## 技术栈

- [mdui v2](https://www.mdui.org/zh-cn/docs/2/) —— Material 3 Web Components
- 原生 JavaScript（ES6+）
- 无第三方框架依赖

## 目录结构

```
├── index.html          # 页面结构（mdui 组件）
├── css/style.css       # 自定义样式与主题令牌
├── js/i18n.js          # 多语言字典
└── js/app.js           # 应用逻辑
```

HTML / CSS / JavaScript 已完全分离，结构清晰，便于维护。

## 使用

直接通过浏览器访问 `index.html` 即可运行（mdui 通过 CDN 加载）。

默认密钥：`MiybyTJN`（主系统）、`DebugbyTJN`（调试面板）。

## 开发

```bash
# 本地预览
python3 -m http.server 8000
```

## 许可

MIT
