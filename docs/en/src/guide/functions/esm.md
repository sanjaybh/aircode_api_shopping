---
title: ES Module | AirCode Docs
description: AirCode supports Node.js's ECMAScript Modules (ESM). You can directly use ESM syntax in files with the `.mjs` extension.
---

# ES Module {#intro}

AirCode supports Node.js's ECMAScript Modules (ESM). You can directly use ESM syntax in files with the `.mjs` extension.

ESM syntax provides convenience in the following scenarios:
1. Using `import` / `export` statements for importing and exporting modules, providing clearer dependency relationships.
2. More compliant with the ECMAScript specification, consistent with front-end JavaScript modularization, facilitating code sharing between the server and the front end.
3. And more...

## Create .mjs Files {#create}

In your project, you can directly create a file with the `.mjs` extension, such as `main.mjs`. In `.mjs` files, you can normally use ESM syntax, and can debug and deploy like files with the `.js` extension.

For example, create a file named `main.mjs`, the default code is as follows:

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

Click **Debug**, and you will see the output `Hi, AirCode` in the **Response** section.

## More Information {#more}

For more information about ECMAScript Modules (ESM) and `.mjs` files, please refer to [Node.js Documentation - ECMAScript Modules](https://nodejs.org/api/esm.html).
