var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.js
var aircode_modular_exports = {};
__export(aircode_modular_exports, {
  getContext: () => getContext,
  modular: () => modular
});
module.exports = __toCommonJS(aircode_modular_exports);
var sourePrefix = `
function makeRpc(url, func) {
  return async(...args) => {
    const ret = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({func, args}),
    });
    try {
      const type = ret.headers.get('content-type');
      if(type.startsWith('application/json')) {
        return await ret.json();
      } else if(type.startsWith('text/')) {
        return await ret.text();
      }
      return await ret.arrayBuffer();
    } catch(ex) {
      throw ex;
    }
  }
}
`;
function buildModule(rpcs, context) {
  let source = [sourePrefix];
  const { protocol, host, url } = context;
  const api = `${protocol}://${host}${url}`;
  for (const key of Object.keys(rpcs)) {
    source.push(`export const ${key} = makeRpc('${api}', '${key}');`);
  }
  return source.join("\n");
}
var ctx = null;
function getContext() {
  return ctx;
}
function modular(rpcs) {
  return async function(params, context) {
    ctx = context;
    const method = context.method;
    if (method === "GET") {
      context.set("content-type", "text/javascript");
      return buildModule(rpcs, context);
    } else {
      const { func, args } = params;
      return await rpcs[func](...args);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getContext,
  modular
});
