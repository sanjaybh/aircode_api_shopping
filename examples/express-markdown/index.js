// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { runExpress } = require('aircode-adapter');

const escapeHtml = require('escape-html');
const express = require('express');
const fs = require('node:fs');
const marked = require('marked');
const path = require('node:path');

const app = module.exports = express();

// register .md as an engine in express view system

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    var html = marked.parse(str).replace(/\{([^}]+)\}/g, function(_, name){
      return escapeHtml(options[name] || '');
    });
    fn(null, html);
  });
});

app.set('views', path.join(__dirname, 'views'));

// make it the default, so we don't need .md
app.set('view engine', 'md');

app.get('/index', function(req, res){
  res.render('index', { title: 'Markdown Example' });
});

app.get('/index/fail', function(req, res){
  res.render('missing', { title: 'Markdown Example' });
});

module.exports = runExpress(app);
