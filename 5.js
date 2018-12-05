var fs = require('fs');
let input = fs.readFileSync('5input.txt').toString().trim()
let letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

function removeOne(s) {
  let l = s.split('')
  for (let i = 0; i < l.length - 1; i++) {
    if (l[i] != l[i + 1] && l[i].toLowerCase() == l[i + 1].toLowerCase()) {
      l.splice(i, 2)
      i -= 1
    }
  }
  return l.join('')
}

let part = 2

if (part == 1) {

  let current = input
  while (current.length != (current = removeOne(current)).length) {}

  console.log(current.length)

} else if (part == 2) {
  console.log(Math.min(...letters.map(l => {
    let stripped = input.replace(new RegExp(l, 'gi'), '')
    while (stripped.length != (stripped = removeOne(stripped)).length) {}
    return stripped.length
  })));
}
