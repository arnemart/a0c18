var fs = require('fs');
let input = fs.readFileSync('7input.txt').toString().trim()
let rules = input.split('\n').map(l => l.match(/Step (\w).+step (\w)/)).map(m => [m[1], m[2]])
let steps = rules.map(s => s[0]).concat(rules.map(s => s[1]))
steps = steps.filter((s, i) => steps.indexOf(s) == i).sort()

function satisfied(step, rules, completed) {
  let satisfied = true
  for (let i = 0; i < rules.length; i++) {
    if (rules[i][1] == step && !completed.includes(rules[i][0])) {
      return false
    }
  }
  return satisfied
}

function firstAvailable(steps, rules, completed) {
  let satisfiedSteps = steps.map(s => [s, satisfied(s, rules, completed)])
    .filter(s => s[1])
  if (satisfiedSteps.length > 0) {
    return satisfiedSteps[0][0]
  }
  return null
}

function part1(steps, rules) {
  steps = steps.slice()
  let completed = []

  while (steps.length > 0) {
    for (let i = 0; i < steps.length; i++) {
      if (satisfied(steps[i], rules, completed)) {
        completed.push(steps[i])
        steps.splice(i, 1)
        break
      }
    }
  }
  return completed.join('')
}

function t(c) { return c.charCodeAt(0) - 4 }

function part2(steps, rules) {
  steps = steps.slice()

  let stepCount = steps.length
  let completed = []
  let second = 0
  let elves = [
    { task: null, remainingTime: 0 },
    { task: null, remainingTime: 0 },
    { task: null, remainingTime: 0 },
    { task: null, remainingTime: 0 },
    { task: null, remainingTime: 0 }
  ]

  do {
    let anyRemaining = false
    elves.forEach(elf => {
      if (elf.remainingTime > 0) {
        elf.remainingTime--
      }
      if (elf.remainingTime == 0) {
        if (elf.task) {
          completed.push(elf.task)
          elf.task = null
        }
      }
    })
    elves.forEach(elf => {
      if (!elf.task) {
        let nextStep = firstAvailable(steps, rules, completed)
        if (nextStep) {
          steps.splice(steps.indexOf(nextStep), 1)
          elf.task = nextStep,
          elf.remainingTime = t(nextStep)
        }
      }
    })

    if (completed.length == stepCount) {
      break
    }
  } while (++second)

  return second
}

console.log('part 1:', part1(steps, rules));

console.log('part 2:', part2(steps, rules));
