var fs = require('fs');
let input = fs.readFileSync('1input.txt').toString().trim()

//console.log(eval('0' + input))

let parts = input.split('\n')

let cur = 0
let i = 0
let l = new Set()

while (true) {
  let n = parseInt(parts[i], 10)
  cur = cur + n
  if (l.has(cur)) {
    console.log(cur)
    break;
  }
  l.add(cur)
  i = (i + 1) % parts.length
}
