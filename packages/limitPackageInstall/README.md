### limit install package with npm or pnpm or yarn and remove illegal package

## Usage in package.json

1. 默认 包管理器 是 npm
1. 默认 isDeleteIllegalInstallItem 为 true 此字段含义: 如果是非指定 包管理器安装的 npm 包, 则启动一个单独的进程删除 node_modules

```json
  "scripts": {
    "preinstall": "npx limitpackageinstall npm isDeleteIllegalInstallItem=true"
  }
```
