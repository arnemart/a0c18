let input = 919901
let inputs = input.toString()

let elves = [0, 1]

let recipes = [3, 7]

function step() {
  let newRecipe = recipes[elves[0]] + recipes[elves[1]]
  let elf1recipe, elf2recipe
  if (newRecipe >= 10) {
    elf1recipe = Math.floor(newRecipe / 10)
    elf2recipe = newRecipe % 10
    recipes.push(elf1recipe, elf2recipe)
  } else {
    elf1recipe = elf2recipe = newRecipe
    recipes.push(elf1recipe)
  }

  elves[0] = (elves[0] + recipes[elves[0]] + 1) % recipes.length
  elves[1] = (elves[1] + recipes[elves[1]] + 1) % recipes.length
}

let part1done = false
let part2done = false

while (true) {
  // console.log(recipes.map((r, i) => elves[0] == i ? `(${r})` : elves[1] == i ? `[${r}]` : ` ${r} `).join(''));
  step()

  if (!part1done && recipes.length >= input + 10) {
    part1done = true
    console.log('part 1:', recipes.slice(input, input + 10).join(''))
  }

  if (recipes[recipes.length - 1] == 1 && recipes.slice(-6).join('') == inputs) {
    console.log('part 2:', recipes.length - 6)
    part2done = true
  } else if (recipes[recipes.length - 2] == 1 && recipes.slice(-7, -1).join('') == inputs) {
    console.log('part 2:', recipes.length - 7)
    part2done = true
  }

  if (part1done && part2done) {
    break
  }
}
