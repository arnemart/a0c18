var fs = require('fs');
let input = fs.readFileSync('2input.txt').toString().trim()
let parts = input.split("\n")

let part = 2

if (part == 1) {

  let twos = 0
  let threes = 0

  parts.forEach(s => {
    let counts = s.split('').reduce((a, b) => {
      a[b] = a[b] ? a[b] + 1 : 1
      return a
    }, {})
    let hasTwo = false
    let hasThree = false
    for (let l in counts) {
      if (counts[l] == 2) hasTwo = true
      if (counts[l] == 3) hasThree = true
    }

    if (hasTwo) twos++
    if (hasThree) threes++
  })

  console.log(twos * threes);

} else if (part == 2) {
  outer: for (let i = 0; i < parts.length; i++) {
    inner: for (let j = i + 1; j < parts.length; j++) {
      let diffs = 0
      let m
      let a = parts[i].split('')
      let b = parts[j].split('')
      for (let k = 0; k < a.length; k++) {
        if (a[k] != b[k]) {
          m = k
          diffs++
        }
        if (diffs > 1) continue inner
      }
      a.splice(m,1)
      console.log(a.join(''))
      break outer
    }
  }
}
