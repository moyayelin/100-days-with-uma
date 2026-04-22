# 100 天我和奕含的纪念日

一个适合 GitHub Pages 的单页静态纪念网站，移动端优先，内含 10 段音频、2 张图片、1 个视频，以及部署后自动生成的访问二维码。

## 本地预览

在当前目录运行：

```powershell
python -m http.server 8080
```

然后打开 `http://localhost:8080`。

## 发布到 GitHub Pages

1. 新建一个 GitHub 仓库。
2. 把当前目录所有文件推到仓库。
3. 在 GitHub 仓库设置里启用 `Pages`。
4. Source 选择当前分支的 `/ (root)`。
5. 发布后访问 Pages 链接，页面里的二维码会自动指向该线上地址。
