/* globals Pusher */

import {Scene, Ring} from 'https://unpkg.com/spritejs@3.8.3/dist/spritejs.esm.js';

const WIDTH = 1200;
const HEIGHT = 1200;

function random(from, to) {
  return from + Math.floor(Math.random() * (to - from));
}

function createActor(layer) {
  const [x, y] = [random(50, WIDTH - 50), random(50, HEIGHT - 50)];
  const head = new Ring({
    pos: [x, y],
    innerRadius: 3,
    outerRadius: 18,
    fillColor: 'red',
    zIndex: -1,
  });
  head.name = Math.random().toString(36).slice(2);
  layer.append(head);
  return head;
}

const players = {};
function updatePlayer(layer, {user, from, to, startTime}) {
  let head;
  if(players[user]) {
    head = players[user];
  } else {
    head = new Ring({
      pos: from,
      innerRadius: 2,
      outerRadius: 12,
      fillColor: 'blue',
    });
    head.name = user;
    players[user] = head;
    layer.append(head);
  }
  head.attr('pos', from);
  head.from = from;
  head.dest = to;
  head.startTime = startTime;
  head.updated = Date.now();
  return head;
}

const container = document.querySelector('#container');
const scene = new Scene({
  container,
  width: WIDTH,
  height: HEIGHT,
  displayRatio: 2
});

function move(node) {
  const {from, dest, startTime} = node;
  const [sx, sy] = from;
  const [dx, dy] = dest;

  const vx = dx - sx;
  const vy = dy - sy;
  const length = Math.hypot(vx, vy);

  if(length > 0) {
    const duration = length * 10;
    const elapsed = serverTime.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const nx = sx + vx * progress;
    const ny = sy + vy * progress;

    node.attr({
      x: nx,
      y: ny,
    });
  }
}

function log(msg) {
  const chatbox = document.getElementById('chatbox');
  chatbox.insertAdjacentHTML('afterBegin', `<div>${msg} <font color="grey">[${new Date().toLocaleString()}]</font></div>`);
}

class ServerTime {
  #servertime0;
  #clienttime0;

  constructor(servertime) {
    this.#servertime0 = servertime;
    this.#clienttime0 = Date.now();
  }

  now() {
    return this.#servertime0 + Date.now() - this.#clienttime0;
  }
}

let serverTime;

async function init() {
  const pusher = new Pusher('https://sk5emz1dze.us.aircode.run/index');
  log('Intializing...');

  const [chatChannel, gameChannel] = await pusher.connect();

  const fglayer = scene.layer('fg');
  const actor = createActor(fglayer);
  actor.from = actor.attr('pos');
  actor.dest = actor.attr('pos');
  actor.name = `user-${Math.random().toString(36).slice(2, 8)}`;

  log(`Initialized as ${actor.name}, click the black region to move.`);

  gameChannel.bind('join', (event) => {
    log(`${event.user} joined.`);
    if(event.user !== actor.name) {
      updatePlayer(fglayer, event);
    }
  });
  gameChannel.bind('moving', (event) => {
    console.log(`${event.user} from ${event.from} to ${event.to}.`);
    if(event.user !== actor.name) {
      updatePlayer(fglayer, event);
    }
  });

  // prepare to sync time
  const res = await gameChannel.send('join', {user: actor.name, from: actor.from, to: actor.dest});
  serverTime = new ServerTime(res.time);
  res.users.forEach((user) => {
    if(user.user !== actor.name) {
      updatePlayer(fglayer, user);
    }
  });

  fglayer.addEventListener('click', async (event) => {
    const {x, y} = event;
    actor.from = actor.attr('pos');
    actor.dest = [x, y];
    actor.startTime = serverTime.now();
    await gameChannel.send('moving', {user: actor.name, from: actor.from, to: actor.dest, startTime: actor.startTime}); 
  });

  fglayer.tick(() => {
    move(actor);
    for(const [k, v] of Object.entries(players)) {
      move(v);
    }
  });

  // heartbeat
  setInterval(async () => {
    const lostUsers = await gameChannel.send('heart', {user: actor.name});
    lostUsers.forEach(({user}) => {
      if(players[user]) {
        players[user].remove();
        delete players[user];
      }
    });
  }, 1000);
}

init();
