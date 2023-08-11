import {config, context, modular} from 'http-modular';

function add(x, y) {
  return x + y;
}

function hello() {
  return {hi: 'there'};
}

const echo = context(ctx => ctx.request.body);

export default modular({
  add,
  echo,
  hello,
}, config.aircode);