var fs = require('fs');
let input = fs.readFileSync('8input.txt').toString().trim()
let parts = input.split(/\s+/).map(n => parseInt(n, 10))

//parts = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]

function readTree(index) {
  let childCount = parts[index]
  let metaCount = parts[index + 1]
  let tree = {
    children: [],
    metadata: []
  }

  index = index + 2

  for (let i = 0; i < childCount; i++) {
    let { node, idx } = readTree(index)
    index = idx
    tree.children.push(node)
  }

  for (let i = 0; i < metaCount; i++) {
    tree.metadata.push(parts[index])
    index++
  }

  return {
    node: tree,
    idx: index
  }
}

function sumMetadata(tree) {
  return tree.metadata.reduce((sum, n) => sum + n, 0) +
    tree.children.reduce((sum, child) => sum + sumMetadata(child), 0)
}


function sumNode(tree) {
  if (tree.children.length) {
    return tree.metadata.reduce((sum, n) => {
      if (tree.children.hasOwnProperty(n - 1)) {
        return sum + sumNode(tree.children[n - 1])
      }
      return sum
    }, 0)
  } else {
    return tree.metadata.reduce((sum, n) => sum + n, 0)
  }
}


let tree = readTree(0).node




console.log('part 1:', sumMetadata(tree));
console.log('part 2:', sumNode(tree));
