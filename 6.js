var fs = require('fs');
let input = fs.readFileSync('6input.txt').toString().trim()

let points = input.split('\n').map(line => line.split(/,\s*/).map(n => parseInt(n, 10)))

let { maxX, maxY } = points.reduce((state, point) => ({
  maxX: Math.max(point[0], state.maxX),
  maxY: Math.max(point[1], state.maxY)
}), { maxX: 0, maxY: 0 })

let edgeX = maxX - 1
let edgeY = maxY - 1

let grid = []

for (let y = 0; y < maxY; y++) {
  grid[y] = []
  for (let x = 0; x < maxX; x++) {
    grid[y][x] = gridPoint(x, y)
  }
}

let counts = {}

for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    let n = grid[y][x].closest
    if (!counts[n]) {
      counts[n] = {
        count: 0,
        edge: false
      }
    }
    counts[n] = {
      count: counts[n].count + 1,
      edge: counts[n].edge || x == 0 || y == 0 || x == edgeX || y == edgeY
    }
  }
}

let max = 0
for (let i in counts) {
  if (!counts[i].edge && counts[i].count > max) {
    max = counts[i].count
  }
}

console.log('part 1:', max);

let sum = 0
for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    if (grid[y][x].sum < 10000) {
      sum++
    }
  }
}

console.log('part 2:', sum);

function gridPoint(x, y) {
  let sorted = points.map((p, i) => [i, manhattan(x, y, p[0], p[1])]).sort((a, b) => a[1] - b[1])

  return {
    closest: sorted[0][1] == sorted[1][1] ? '.' : sorted[0][0],
    sum: eval(sorted.map(p => p[1]).join('+'))
  }
}

function manhattan(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}
