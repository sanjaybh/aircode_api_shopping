const sourePrefix = `
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
  const {protocol, host, url} = context;
  const api = `${protocol}://${host}${url}`;
  for(const key of Object.keys(rpcs)) {
    source.push(`export const ${key} = makeRpc('${api}', '${key}');`);
  }

  return source.join('\n');
}

let ctx = null;
export function getContext() {
  return ctx;
}

export function modular(rpcs) {
  return async function (params, context) {
    ctx = context;
    const method = context.method;
    if(method === 'GET') {
      context.set('content-type', 'text/javascript');
      return buildModule(rpcs, context);
    } else {
      const {func, args} = params;
      return await rpcs[func](...args);
    }
  };
}
