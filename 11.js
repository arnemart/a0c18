let gridSerialNo = 8199

let grid = []
for (let y = 1; y <= 300; y++) {
  grid[y] = []
  for (let x = 1; x <= 300; x++) {
    let digits = ((((x + 10) * y) + gridSerialNo) * (x + 10)).toString().split('')
    grid[y][x] = (parseInt(digits.slice(-3, -2), 10) || 0) - 5
  }
}

function gridSum(x, y, size) {
  let sum = 0
  for (let yy = y; yy < y + size; yy++) {
    for (let xx = x; xx < x + size; xx++) {
      sum += grid[yy][xx]
    }
  }
  return sum
}

let maxSum = 0, maxSumX, maxSumY, maxSumSize

for (let y = 1; y <= 298; y++) {
  for (let x = 1; x <= 298; x++) {
    let sum = gridSum(x, y, 3)
    if (sum > maxSum) {
      maxSum = sum
      maxSumX = x
      maxSumY = y
    }
  }
}

console.log('part 1:', maxSumX + ',' + maxSumY);

for (let y = 1; y <= 298; y++) {
  for (let x = 1; x <= 298; x++) {
    let max = 301 - Math.max(x, y)
    for (let size = 3; size < max; size++) {
      let sum = gridSum(x, y, size)
      if (sum > maxSum) {
        maxSum = sum
        maxSumX = x
        maxSumY = y
        maxSumSize = size
      }
    }
  }
}

console.log('part 2:', maxSumX + ',' + maxSumY + ',' + maxSumSize);

