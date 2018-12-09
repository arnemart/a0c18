let playerCount = 419
let part1lastmarble = 71052
let part2lastmarble = part1lastmarble * 100
let part1score

let players = [...Array(playerCount)].map(_ => 0)

let player = 0

let current = {
  val: 0
}

current.next = current
current.prev = current

let marble = 1

do {

  if (marble % 23 == 0 && marble > 0) {

    players[player] += marble

    current = current.prev.prev.prev.prev.prev.prev

    players[player] += current.value

    current.prev.next = current.next
    current.next.prev = current.prev
    current = current.prev

  } else {

    current = current.next.next
    let newNode = {
      value: marble,
      prev: current,
      next: current.next
    }
    newNode.prev.next = newNode
    newNode.next.prev = newNode
  }

  if (marble == part1lastmarble) {
    part1score = Math.max(...players)
  } else if (marble == part2lastmarble) {
    break
  }

  player = ++player % players.length
} while (++marble)

console.log('part 1:', part1score);
console.log('part 2:', Math.max(...players));
