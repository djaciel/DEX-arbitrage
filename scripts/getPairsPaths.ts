import hre from 'hardhat';
import { pairsData } from '../data/fantom';

const pairs = pairsData.map((x) => x.pair);

function extractUniqueElements(arr: any) {
  let res: any = [];
  for (const elem of arr) {
    res = [...res, ...elem];
  }
  return removeDuplicates(res);
}

function removeDuplicates(arr: any) {
  return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
}

function findChilds(parent: any, arr: any) {
  const childs = [];
  for (const elem of arr) {
    const index = elem.findIndex((x: any) => x.split('-')[0] === parent.split('-')[0]);
    if (index >= 0) {
      childs.push(elem[index === 0 ? 1 : 0]);
    }
  }
  return childs;
}

function findAllChilds(arr: any) {
  const allChilds = {};
  const uniqueElements = extractUniqueElements(arr);
  for (const elem of uniqueElements) {
    allChilds[elem] = findChilds(elem, arr);
  }
  return allChilds;
}

function pairExists(a: any, b: any) {
  return pairs.some((r: any) => r.includes(a) && r.includes(b));
}

function buildTree(arr: any) {
  const elements = extractUniqueElements(arr);
  const allChilds = findAllChilds(arr);

  const result = [];

  for (const element0 of elements) {
    const level1 = allChilds[element0];
    for (const element1 of level1) {
      const level2 = allChilds[element1];
      if (element1.split('-')[1] !== element0.split('-')[1]) {
        continue;
      }
      if (!pairExists(element0, element1)) {
        continue;
      }
      for (const element2 of level2) {
        if (element2.split('-')[0] === element0.split('-')[0]) {
          continue;
        }
        if (element2.split('-')[1] === element1.split('-')[1]) {
          continue;
        }
        if (!pairExists(`${element1.split('-')[0]}-${element2.split('-')[1]}`, element2)) {
          continue;
        }
        const level3 = allChilds[element2];
        for (const element3 of level3) {
          if (element3.split('-')[0] !== element0.split('-')[0]) {
            continue;
          }
          if (element3.split('-')[1] !== element0.split('-')[1]) {
            continue;
          }
          if (!pairExists(`${element2.split('-')[0]}-${element0.split('-')[1]}`, element0)) {
            continue;
          }
          result.push([element0, element1, element2, element3]);
        }
      }
    }
  }

  return result;
}

const func = async () => {
  async function main() {
    await hre.run('compile');

    const paths = buildTree(pairs);

    console.log('paths', JSON.stringify(paths));

    console.log(`Done!`);

    return true;
  }

  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  await main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
};

func();
