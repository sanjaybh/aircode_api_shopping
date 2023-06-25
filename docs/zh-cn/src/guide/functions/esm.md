# ESM 支持 {#intro}

AirCode 支持 Node.js 的 ECMAScript 模块 (ESM)，你可以在 `.mjs` 后缀名的文件中直接使用 ESM 语法。

ESM 语法为你在以下场景提供便利：
1. 利用 `import` / `export` 语句对模块进行导入导出，提供更清晰的依赖关系。
3. 更加符合 ECMAScript 规范，与前端 JavaScript 模块化方式一致，方便进行服务器与前端的代码共享。
4. 更多……

## 创建 .mjs 文件 {#create}

在你的项目中，你可以直接创建一个 `.mjs` 后缀名的文件，例如 `main.mjs`。在 `.mjs` 文件中，你可以正常使用 ESM 语法，且可像 `.js` 后缀名的文件一样进行调试和部署。

例如，创建一个名为 `main.mjs` 的文件，默认的代码如下：

```js
// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';

export default async function (params, context) {
  console.log('Received params:', params);
  return {
    message: 'Hi, AirCode.',
  };
};
```

点击 **Debug**，你就会在 **Response** 栏看到 `Hi AirCode` 的输出。

## 更多信息 {#more}

关于 ECMAScript 模块 (ESM) 和 `.mjs` 文件的更多信息，请参考 [Node.js 文档 - ECMAScript Modules](https://nodejs.org/api/esm.html)。