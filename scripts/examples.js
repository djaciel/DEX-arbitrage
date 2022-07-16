function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(JSON.stringify(removeDuplicates(pairs)));

const pairs = [
  ['A', 'B'],
  ['C', 'E'],
  ['G', 'H'],
  ['I', 'B'],
  ['A', 'E'],
  ['H', 'C'],
  ['G', 'A'],
  ['I', 'C'],
  ['G', 'B'],
];

function extractUniqueElements(arr) {
  let res = [];
  for (const elem of arr) {
    res = [...res, ...elem];
  }
  return removeDuplicates(res);
}

function findChilds(parent, arr) {
  const childs = [];
  for (const elem of arr) {
    const index = elem.findIndex((x) => x === parent);
    if (index >= 0) {
      childs.push(elem[index === 0 ? 1 : 0]);
    }
  }
  return childs;
}

function findAllChilds(arr) {
  const allChilds = {};
  const uniqueElements = extractUniqueElements(arr);
  for (const elem of uniqueElements) {
    allChilds[elem] = findChilds(elem, arr);
  }
  return allChilds;
}

function buildTree(arr) {
  const elements = extractUniqueElements(arr);
  const allChilds = findAllChilds(arr);

  // console.log('elements', elements)
  // console.log('allChilds', allChilds)

  for (const element0 of elements) {
    const level1 = allChilds[element0];
    for (const element1 of level1) {
      const level2 = allChilds[element1];
      for (const element2 of level2) {
        if (element2 === element0) {
          continue;
        }
        const level3 = allChilds[element2];
        for (const element3 of level3) {
          if (element3 !== element0) {
            continue;
          }
          console.log(element0, element1, element2, element3);
        }
      }
    }
  }
}

buildTree(pairs);

// console.log(JSON.stringify(findAllChilds(pairs)))

// console.log([1,2,3].findIndex(x => x===7)) // -1 if not found

// console.log(extractUniqueElements(pairs))

// console.log(findChilds('A', pairs))
