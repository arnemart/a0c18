var fs = require('fs');
let claims = fs.readFileSync('3input.txt').toString().trim()
//     `#1 @ 1,3: 4x4
// #2 @ 3,1: 4x4
// #3 @ 5,5: 2x2`
    .split('\n')
    .map(l => l.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/))
    .map(m => ({
      id: parseInt(m[1], 10),
      x: parseInt(m[2], 10),
      y: parseInt(m[3], 10),
      w: parseInt(m[4], 10),
      h: parseInt(m[5], 10)
    }))

let part = 2

if (part == 1) {
  let [maxX, maxY] = claims.reduce((max, claim) => [
    claim.x + claim.w > max[0] ? claim.x + claim.w : max[0],
    claim.y + claim.h > max[1] ? claim.y + claim.h : max[1]
  ], [0, 0])

  let overlaps = 0


  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      let found = 0
      for (let i = 0; i < claims.length; i++) {
        let c = claims[i]
        if (x >= c.x && x < c.x + c.w && y >= c.y && y < c.y + c.h) {
          found++
          if (found > 1) {
            overlaps++
            break
          }
        }
      }
    }
  }

  console.log(overlaps)

} else if (part == 2) {
  for (let i = 0; i < claims.length; i++) {
    let c1 = claims[i]
    let overlaps = 0
    for (let j = 0; j < claims.length; j++) {
      let c2 = claims[j]
      if (c1.id != c2.id && ((c1.x >= c2.x && c1.x < c2.x + c2.w) || (c2.x >= c1.x && c2.x < c1.x + c1.w)) &&
          ((c1.y >= c2.y && c1.y < c2.y + c2.h) || (c2.y >= c1.y && c2.y < c1.y + c1.h))) {
        overlaps++
      }
    }
    if (overlaps == 0) {
      console.log(c1.id)
    }
  }
}
