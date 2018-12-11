let gridSerialNo = 8199

let grid = []
for (let y = 1; y <= 300; y++) {
  grid[y] = []
  for (let x = 1; x <= 300; x++) {
    grid[y][x] = Math.floor(((((x + 10) * y + gridSerialNo) * (x + 10)) % 1000) / 100) - 5
  }
}

let gridCache = new Map()

function gridSum(x, y, size) {
  const key = x * 1000000 + y * 1000 + size
  if (gridCache.has(key)) {
    return gridCache.get(key)
  }

  let sum = 0
  const key_1 = key - 1

  if (gridCache.has(key_1)) {
    sum = gridCache.get(key_1)
    const yend = y + size - 1
    const xend = x + size - 1
    const xUpTo = x + size
    for (let yy = y; yy < yend; yy++) {
      sum += grid[yy][xend]
    }
    for (let xx = x + 1; xx < xUpTo; xx++) {
      sum += grid[yend][xx]
    }

  } else {
    const yUpTo = y + size
    const xUpTo = x + size
    for (let yy = y; yy < yUpTo; yy++) {
      sum += grid[yy][x]
    }
    for (let xx = x + 1; xx < xUpTo; xx++) {
      sum += grid[y][xx]
    }
    if (size > 0) {
      sum += gridSum(x + 1, y + 1, size - 1)
    }
  }
  gridCache.set(key, sum)

  return sum
}

let maxSum = 0, maxSumX, maxSumY, maxSumSize

for (let y = 298; y >= 1; y--) {
  for (let x = 298; x >= 1; x--) {
    let sum = gridSum(x, y, 3)
    if (sum > maxSum) {
      maxSum = sum
      maxSumX = x
      maxSumY = y
    }
  }
}


console.log('part 1:', maxSumX + ',' + maxSumY);

for (let y = 298; y >= 1; y--) {
  for (let x = 298; x >= 1; x--) {
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
