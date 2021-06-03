### vue3-antd

#### MacOS 开发使用 nswag 生成 swaggerapi

[npm nswag](https://www.npmjs.com/package/nswag)

```
安装.net runtime
brew install dotnet
dotnet --version  # 5.x
当前开发环境运行
"node_modules/.bin/nswag" run /runtime:Net50
写入package.json script就是 "nswag_net50": "nswag run /runtime:Net50"
yarn nswag_net50
```
