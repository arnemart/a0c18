var fs = require('fs');
let input = fs.readFileSync('12input.txt').toString().trim().split('\n')

let pots = input.shift().replace('initial state: ', '').split('').map(p => p == '#')

input.shift()

let rules = input.map(l => l.split(' => ')).map(r => ({
  condition: r[0].split('').map(p => p == '#'),
  result: r[1] == '#'
}))

let startAt = -2
let endAt = pots.length + 2

let nextGeneration = pots => {
  let result = []
  for (let i = startAt; i < endAt; i++) {
    let p = pots[i] || false
    let newP = false
    for (let rule of rules) {
      if (
        p == rule.condition[2] &&
          (pots[i - 2] || false) == rule.condition[0] &&
          (pots[i - 1] || false) == rule.condition[1] &&
          (pots[i + 1] || false) == rule.condition[3] &&
          (pots[i + 2] || false) == rule.condition[4]
      ) {
        newP = rule.result
        if (rule.result && i < startAt + 2) {
          startAt = startAt - (startAt - i + 2)
        } else if (rule.result && i >= endAt - 2) {
          endAt = endAt + (endAt - i)
        }
        break
      }
    }
    result[i] = newP
  }
  return result
}

let sumPlants = pots => {
  let sum = 0
  for (let i = startAt; i < endAt; i++) {
    if (pots[i]) {
      sum += i
    }
  }
  return sum
}


let printPlants = pots => {
  let str = ''
  for (let i = startAt; i < endAt; i++) {
    str += pots[i] ? '#' : '.'
  }
  console.log(str);
}


for (let i = 0; i < 20; i++) {
  pots = nextGeneration(pots)
}

console.log('part 1:', sumPlants(pots));

// Find the pattern
for (let i = 21; i <= 1000; i++) {
  pots = nextGeneration(pots)
}

let sum = sumPlants(pots)
let multiplier, constant
outer: for (multiplier = 1; multiplier < 1000; multiplier++) {
  for (constant = 0; constant < 1000; constant++) {
    if (1000 * multiplier + constant == sum) {
      break outer
    }
  }
}

console.log('part 2:', 50000000000 * multiplier + constant);
