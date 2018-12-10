var fs = require('fs');
let input = fs.readFileSync('10input.txt').toString().trim()

let points = input.split('\n').map(p => p.match(/position=\<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/))
    .map(m => ({
      x: parseInt(m[1], 10),
      y: parseInt(m[2], 10),
      dx: parseInt(m[3], 10),
      dy: parseInt(m[4], 10)
    }))

let findEdges = (points) =>
    points.reduce((state, point) => ({
      minX: point.x < state.minX ? point.x : state.minX,
      minY: point.y < state.minY ? point.y : state.minY,
      maxX: point.x > state.maxX ? point.x : state.maxX,
      maxY: point.y > state.maxY ? point.y : state.maxY
    }), {
      minX: Infinity,
      minY: Infinity ,
      maxX: -Infinity,
      maxY: -Infinity
    })


let minEdges = findEdges(points)

let minHeight = minEdges.maxY - minEdges.minY

function step() {
  let newPoints = points.map(p => ({
    x: p.x + p.dx,
    y: p.y + p.dy,
    dx: p.dx,
    dy: p.dy
  }))

  let edges = findEdges(newPoints)
  let height = edges.maxY - edges.minY
  return {
    newPoints,
    height,
    edges
  }
}

let i = 0

while (++i) {
  let { newPoints, height, edges } = step()
  if (height < minHeight) {
    points = newPoints
    minHeight = height
    minEdges = edges
  } else {
    break
  }
}

let output = [...Array(minEdges.maxY - minEdges.minY + 1)].map(l => [...Array(minEdges.maxX - minEdges.minX + 1)].map(p => ' '))
points.map(p => ({
  x: p.x - minEdges.minX,
  y: p.y - minEdges.minY
})).forEach(p => output[p.y][p.x] = '#')

console.log('Part 1:');
console.log(output.map(l => l.join('')).join('\n'));

console.log('\nPart 2: ', i - 1, 'seconds');
