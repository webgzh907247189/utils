### login to the private npm server

## Usage in package.json

1. 通过该脚本登陆 npm 进行发包, 启动脚本时传入4个参数 (registry、username、password、email)
2. registry 代表需要登陆的 源, 可以是 官方的源，也可以是私有 npm 源
3. username、password、email 分别代表 (发布私有化 npm 包 账号的 账号、密码、邮箱)

```json
  "scripts": {
    "npmProxyLogin": "npx npmproxylogin -- https://registry.npmjs.org/ username password email"
  }
```
