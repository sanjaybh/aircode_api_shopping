import {config, modular} from 'es-modular';

function add(x, y) {
  return x + y;
}

function echo(...args) {
  const context = args.pop();
  return context.request.body;
}

function hello() {
  return {hi: 'there'};
}


export default modular({
  add,
  echo,
  hello,
}, config.aircode);