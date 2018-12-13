var fs = require('fs');
let input = fs.readFileSync('13input.txt').toString()
let track = input.split('\n').map(l => l.split(''))

let dirs = ['v', '<', '^', '>']
let deltas = {
  'v': [0, 1],
  '<': [-1, 0],
  '^': [0, -1],
  '>': [1, 0]
}

let carts = []

for (let y = 0; y < track.length; y++) {
  for (let x = 0; x < track.length; x++) {
    if (dirs.includes(track[y][x])) {
      carts.push({
        x: x,
        y: y,
        dir: track[y][x],
        turn: 0,
        was: ['<', '>'].includes(track[y][x]) ? '-' : '|',
        crashed: false
      })
    }
  }
}

function turnLeft(dir) {
  return dirs[(dirs.indexOf(dir) + 3) % 4]
}

function turnRight(dir) {
  return dirs[(dirs.indexOf(dir) + 1) % 4]
}

let anyCrashed = false

while (true) {
  for (let j = 0; j < carts.length; j++) {
    let cart = carts[j]
    if (cart.crashed) {
      continue
    }
    let newx = cart.x + deltas[cart.dir][0]
    let newy = cart.y + deltas[cart.dir][1]
    let newpos = track[newy][newx]

    track[cart.y][cart.x] = cart.was

    if (!cart.crashed && dirs.includes(newpos)) {
      cart.crashed = true
      let crashedWith = carts.filter(c => c.x == newx && c.y == newy)[0]
      track[crashedWith.y][crashedWith.x] = crashedWith.was
      crashedWith.crashed = true
      if (!anyCrashed) {
        console.log('Part 1:', newx + ',' + newy)
        anyCrashed = true
      }
      continue
    }

    cart.x = newx
    cart.y = newy
    cart.was = newpos

    switch (newpos) {
    case '/':
      if (cart.dir == '^' || cart.dir == 'v') {
        cart.dir = turnRight(cart.dir)
      } else {
        cart.dir = turnLeft(cart.dir)
      }
      break
    case '\\':
      if (cart.dir == '^' || cart.dir == 'v') {
        cart.dir = turnLeft(cart.dir)
      } else {
        cart.dir = turnRight(cart.dir)
      }
      break
    case '+':
      if (cart.turn == 0) {
        cart.dir = turnLeft(cart.dir)
      } else if (cart.turn == 2) {
        cart.dir = turnRight(cart.dir)
      }
      cart.turn = (cart.turn + 1) % 3
      break
    }

    track[newy][newx] = cart.dir
  }

  carts = carts.filter(c => !c.crashed)

  if (carts.length == 1) {
    console.log('Part 2:', carts[0].x + ',' + carts[0].y)
    break
  }

  carts.sort((a, b) =>  (a.y * 10000 + a.x) - (b.y * 10000 + b.x))
}
