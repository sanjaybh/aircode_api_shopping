const {db} = require('aircode');
const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('@koa/router')({prefix: '/index'});

const Koa = require('koa')
const { runKoa } = require('aircode-adapter');

const app = new Koa();

const table = db.table('post');

// middleware

app.use(logger());

app.use(render);

// route definitions

router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

app.use(router.routes());

/**
 * Post listing.
 */

async function list(ctx) {
  const posts = await table.where().projection({_id: 1, title: 1}).find();
  await ctx.render('list', { posts: posts });
}

/**
 * Show creation form.
 */

async function add(ctx) {
  await ctx.render('new');
}

/**
 * Show post :id.
 */

async function show(ctx) {
  const id = ctx.params.id;
  const post = await table.where({_id: id}).findOne();
  if (!post) ctx.throw(404, 'invalid post id');
  await ctx.render('show', { post: post });
}

/**
 * Create a post.
 */

async function create(ctx) {
  const post = ctx.req.body;
  await table.save(post);
  ctx.redirect('/index');
}

module.exports = runKoa(app);

