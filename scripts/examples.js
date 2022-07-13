const pairs = [
  '0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c',
  '0xec7178f4c41f346b2721907f5cf7628e388a7a58',
  '0xfca12a13ac324c09e9f43b5e5cfc9262f3ab3223',
  '0xf0702249f4d3a25cd3ded7859a165693685ab577',
  '0x5965e53aa80a0bcf1cd6dbdd72e6a9b2aa047410',
  '0xbc0eecda2d8141e3a26d2535c57cadcb1095bca9',
  '0x8c853ce1561a2c2cd2e857670e3ccd04ba4cb27b',
  '0xec454eda10accdd66209c57af8c12924556f3abd',
  '0xe120ffbda0d14f3bb6d6053e90e63c572a66a428',
  '0x4de9f0ed95de2461b6db1660f908348c42893b1a',
  '0xe7e90f5a767406eff87fdad7eb07ef407922ec1d',
  '0xfdb9ab8b9513ad9e419cf19530fee49d412c3ee3',
  '0x4fe6f19031239f105f753d1df8a0d24857d0caa2',
  '0x2a651563c9d3af67ae0388a5c8f89b867038089e',
  '0x30748322b6e34545dbe0788c421886aeb5297789',
  '0x956de13ea0fa5b577e4097be837bf4ac80005820',
  '0xd343b8361ce32a9e570c1fc8d4244d32848df88b',
  '0xede32b76302cb71cc0467c4b42dabffa6b091dd1',
  '0xbcab7d083cf6a01e0dda9ed7f8a02b47d125e682',
  '0x89d9bc2f2d091cfbfc31e333d6dc555ddbc2fd29',
  '0x6f86e65b255c9111109d2d2325ca2dfc82456efc',
  '0xe67980fc955fecfda8a92bbbfbcc9f0c4be60a9a',
  '0xdec1259188e6c5273acd1e84d5b4b58897ca013e',
  '0x0a80c53afc6de9dfb2017781436bfe5090f4acb4',
  '0x51eb93ecfeffbb2f6fe6106c4491b5a0b944e8bd',
  '0x7ed0cddb9bb6c6dfea6fb63e117c8305479b8d7d',
  '0xab2ddcbb346327bbdf97120b0dd5ee172a9c8f9e',
  '0x30872e4fc4edbfd7a352bfc2463eb4fae9c09086',
  '0x613bf4e46b4817015c01c6bb31c7ae9edaadc26e',
  '0x6f607443dc307dcbe570d0ecff79d65838630b56',
  '0x279b2c897737a50405ed2091694f225d83f2d3ba',
  '0xf8cb2980120469d79958151daa45eb937c6e1ed6',
  '0xd519ae779eb7987cddda63be2ceffe0c35759e04',
  '0x5df809e410d9cc577f0d01b4e623c567c7ad56c1',
  '0x4ee115137ac73a3e5f99598564905465c101b11f',
  '0xb471ac6ef617e952b84c6a9ff5de65a9da96c93b',
  '0xf84e313b36e86315af7a06ff26c8b20e9eb443c3',
  '0x668ae94d0870230ac007a01b471d02b2c94ddcb9',
  '0x11d90ea9d16e1ee5879b299a819f6d618816d70f',
  '0xb733654453404aab46d34e68ff24415f5f588c21',
  '0x31d49fa36f2a50cc3a62d24007ed88f87c3a6cd4',
  '0xb32b31dfafbd53e310390f641c7119b5b9ea0488',
  '0x4733bc45ef91cf7ccecaeedb794727075fb209f2',
  '0xaa9be68d990d5e56870b2e0544f96ffb0b1da8f7',
  '0xdbc490b47508d31c9ec44afb6e132ad01c61a02c',
  '0xaf918ef5b9f33231764a5557881e6d3e5277d456',
  '0x0845c0bfe75691b1e21b24351aac581a7fb6b7df',
  '0x427efb4c731b38530c29ce475b249a15f028cc8a',
  '0xe8b72a866b8d59f5c13d2adef96e40a3ef5b3152',
  '0xd14dd3c56d9bc306322d4cea0e1c49e9ddf045d4',
  '0x78f82c16992932efdd18d93f889141ccf326dbc2',
  '0x297c8990134bf1ee08ae5d8805042fbac8781201',
  '0x9ce8e9b090e8af873e793e0b78c484076f8ceece',
  '0x172bfaa8991a54abd0b3ee3d4f8cbdab7046ff79',
  '0xf050133847bb537c7476d054b8be6e30253fbd05',
  '0x35a60b8c750b4d834a27443f35269a84d06de391',
  '0x1a8a4dc716e9379e84e907b0c740d2c622f7cfb7',
  '0x5821573d8f04947952e76d94f3abc6d7b43bf8d0',
  '0x7c849a7e2cb08f09cf37482cc0a04ecb5891844a',
  '0xfbf535224f1f473b6438bf50fbf3200b8659edde',
  '0x7051c6f0c1f1437498505521a3bd949654923fe1',
  '0xc28cf9aebfe1a07a27b3a4d722c841310e504fe3',
  '0xac97153e7ce86fb3e61681b969698af7c22b4b12',
  '0x9249f1a1617a598261cbb1fa7b6fd10dd53d9fea',
  '0x2592f9a13f1b7c6ff5e4e53bda139807ec52a981',
  '0xcf2bef9b3a647564e05d0f073d1c664a8888d5b9',
  '0x3d0bd54c48c2c433ea6fed609cc3d5fb7a77622b',
  '0xa7010b3ba9efb1af9fa8a30efe74c16a93891775',
  '0x280f2f0cc01b2fd1b10d830b5deaf2343a78d3d5',
  '0x5db11454268ada0c31bb67b3cb50087659fdf439',
  '0xa48869049e36f8bfe0cc5cf655632626988c0140',
  '0x1656728af3a14e1319f030dc147fabf6f627059e',
  '0x0bfe6f893a6bc443b575ddf361a30f39aa03e59c',
  '0x2599eba5fd1e49f294c76d034557948034d6c96e',
  '0xdc71a6160322ad78dab0abb47c7a581cfe9709ee',
  '0xeaa3c87135ee1140e1d60fc8b577fbb41163d840',
  '0x71c8bceece3daf9e27741d2cc1f03170f862555f',
  '0xd019dd7c760c6431797d6ed170bffb8faee11f99',
  '0x648a7452da25b4fb4bdb79badf374a8f8a5ea2b5',
  '0xf66d2bf736c05723b62e833a5dd747e24855ff99',
  '0x84fc84b998a01e34c8a9714a600aebde8b4cc671',
  '0x0621d9c22fad25bf5b88735defb419fa60f118f7',
  '0xf2fcd382ee404b105bfc0086ed41f1bd19b8952a',
  '0xf42dbcf004a93ae6d5922282b304e2aefdd50058',
  '0x2dc234dbfc085ddbc36a6eacc061d7333cd397b0',
  '0xa2527af9dabf3e3b4979d7e0493b5e2c6e63dc57',
  '0xcb6eab779780c7fd6d014ab90d8b10e97a1227e2',
  '0xd095675c684452825e61804da7d6ceccb613afe8',
  '0x9f3fe284cb85f3b90081c4993bb6b739da6a2ab4',
  '0xd5b545e788370ac454bfa765e7875a3a2253cc3b',
  '0x506ddcc751c7d500f983ffda6ddefbe458ba2c33',
  '0x51d493c9788f4b6f87eae50f555dd671c4cf653e',
  '0xb186ad077ca69e860476b2c84ecd0de3572a10f5',
  '0x3486011e2e18ccf4558c4c84d5cbbccfdbf16c03',
  '0x1815eb82343f8244307e7aa1695cb5d645cd30b0',
  '0xe7f86cef8fef60ce5050899d1f8e465c00d04a79',
  '0x651d8b9911f1183daa6c52852a4cbbfb59746bd5',
  '0x9606d683d03f012dda296ef0ae9261207c4a5847',
  '0x084f5041f5d8d202ad958230a7e56bb32dfd38bb',
  '0xd840af68b35469ec3478c9b0cbcddc6dc80dd98c',
  '0x8efd36aa4afa9f4e157bec759f1744a7febaea0e',
  '0xfdc67a84c3aa2430c024b7d35b3c09872791d722',
  '0x41d88635029c4402bf9914782ae55c412f8f2142',
  '0x1478aec7896e40ae5fb858c77d389f0b3e6cbc5d',
  '0x10ee429ed505498e84f071460716dd0b9068f29f',
  '0xc19c7615237f770179ed93d89126478c60742664',
  '0x39ca89c6e6fa16bd10dbc0305062e0219a7e0856',
  '0x12692b3bf8dd9aa1d2e721d1a79efd0c244d7d96',
  '0xb5512e3fa8304d33cdae4a40c21f1d3f70eba45a',
  '0xe3e5f47399864ca63cdfbb22a207afc398efd660',
  '0x8a3422fee10ee4bc35bb4dedd8533feacfbcdf27',
  '0xacf56c6aaddc1408a11abab3140b90b57fc6aaf7',
  '0x68d47d67b893c44a72bcac39b1b658d4cbdf87ca',
  '0xa1f4a9ee0d06115376dff357d34c3f5eb4107398',
  '0xd0891213c87d68773477428ac800b5f7eecf641e',
  '0x4f2195a538760387b61df4abd8efa158fb0be47c',
  '0x6bb685358bc3991d9279562710f3a44b7e5f2d9b',
  '0x3c9ad6268065e425085f11ab8ea803973be6bcf3',
  '0xe1b69d054a2e5dd899afc6024993057997c2303a',
  '0x67b2faf48c1710ff1d2a9ac429b726b8f63ee83c',
  '0x84311ecc54d7553378c067282940b0fdfb913675',
  '0xd77fc9c4074b56ecf80009744391942fbfddd88b',
  '0x5c021d9cfad40aafc57786b409a9ce571de375b4',
  '0xd702d7495b010936ebc53a1efee42d97996ca5ee',
  '0x33e29a9ebdd370a8d50656e822abfd3a910da1b6',
  '0x38ff5377a42d0a45c829de45801481869087d22c',
  '0xd9a4108cbb40a12de16dffdc54ae5065878816d7',
  '0x95297492b1faa6047d1d8ce982a0f5cdeb0e9482',
  '0xd061c6586670792331e14a80f3b3bb267189c681',
  '0xebaa2bdd1435cce852948e9c1fb3f0b9c479ce71',
  '0xae9bba22e87866e48ccacff0689afaa41eb94995',
  '0x6b987e02ca5eae26d8b2bcac724d4e03b3b0c295',
  '0x55c070466da687a6e1bddb889ba09873d8f4fb2a',
  '0x9881ccb3cd9fd662de8f9d946ec678449c3b52c2',
  '0x8eae6aac525e6ec6a686f77e4751d3e8f96f6a83',
  '0x3f468804d133894a73b54cfc07d5886e5195255f',
  '0x9206444a1820c508fba5bf815713451ee540b3c8',
  '0xc915d19f08bebe65c47f3d31f6fd0268ef7ad2af',
  '0x671225b59761abe97df77f62b8dc89ee896ca8df',
  '0x9c775d3d66167685b2a3f4567b548567d2875350',
  '0xc6ab9df79fe1ac6ba0d0570cec228f534965df11',
  '0xc9b98e4a4e306dfc24bc5b5f66e271e19fd74c5a',
  '0xc9fb686f14bda7e2653cf8f605dc8551b6a53fd3',
  '0x623ee4a7f290d11c11315994db70fb148b13021d',
  '0xffdc0531288dc91c1f49db03a90ed84725e9eda7',
  '0xfcec86af8774d69e2e4412b8de3f4abf1f671ecc',
  '0x9a3c6c8e58becf7fed10606dd368da79ec6e0b0e',
  '0x6aae93f2915b899e87b49a9254434d36ac9570d8',
  '0x34bf23e2f08bfe00cae2adc15d4b47cf8b9ee7bf',
  '0x801d17c21d0808bc00d46e2f081214c9d82f4fbf',
  '0x4b3a172283ecb7d07ab881a9443d38cb1c98f4d0',
  '0xef03b585bffb44cf976988f5fb3fcbc7a0a87718',
  '0x9baa8eea25522234bbe36e93133db34711d3e66b',
  '0x1ee8c2b1388daebf1fd7808fcc3c12c8bbf16f51',
  '0xfdef392adc84607135c24ca45de5452d77aa10de',
  '0xcc3d9921302dbbc72171eed1b10fd45f9e83ad8c',
  '0xf28680a5fdbd2c1fe58bd9d17b9ea53643d9e490',
  '0x45f4682b560d4e3b8ff1f1b3a38fdbe775c7177b',
  '0x7f98c0c0519929502ab94baa42c94dfcbc9477f1',
  '0x5063c79e377332fb98cb6c8db414d752dc7c478e',
  '0x871dd566ab3de61e5cc8fb16fee82595b17e9cc6',
  '0x219ef2d8dad28a72da297e79ed6a990f65307a4c',
  '0x937813380c7b98a66afa5992bf2231e3e5913ef4',
  '0x77ecd4b23e255a78572ccfd59141d96cfc9f5fb0',
  '0xde62a6cdd8d5a3988495317cffac9f3fed299383',
  '0x755904c8ccb785366c57bcf883cb25bb00dd100f',
  '0x2b2703716d3234b787c42e89950653688c012dea',
  '0xfea157d0a1ea7f12e22a5aa595a938f8f8c7fb4d',
  '0x9d2489d0da3436445a0a5ef8515dc10b2d8b4eaa',
  '0x67019e7b4a233cc2e875e5c713042333d879aace',
  '0x226919c0eb7e2f7e32ea01917a097725857fa530',
  '0x304b61f3481c977ffbe630b55f2abeee74792664',
  '0x6ab8f048e193a1649430d6dd7d9a3ceb935e7f3c',
  '0x622e69b6785311800b0d55d72ff27d91f5518212',
  '0x1b371a952a3246dac40530d400d86b5d36655ad1',
  '0x8bff7b8b6a14e576a3634d6c0466a19a6e9b170a',
  '0x9b2570eab1f70e10cce26096297618ddb2175308',
  '0x406de3a93f6b4179e3b21a3d81226b43e1918fd9',
  '0x0ffed9d3c3e214771836cc83a2c1f9155a8cc68a',
  '0x395215aae81c5d266dca89ce82b5940f7f5c193e',
  '0x73da7439945fa94b419ef45f14fe8762d6a5d031',
  '0xeddb9fcef6f803d0591fa55e487c52ad309b408a',
  '0xf5f20491af9e7c5d94714faf160ec81387f50579',
  '0x5804f6c40f44cf7593f73cf3aa16f7037213a623',
  '0x270b4cdeaebc4e0522aa4371a9be38c624193cee',
  '0xf28680a5fdbd2c1fe58bd9d17b9ea53643d9e490',
]

function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}

console.log(JSON.stringify(removeDuplicates(pairs)))


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
]

function extractUniqueElements(arr) {
  let res = [];
  for (const elem of arr) {
    res = [...res, ...elem];
  }
  return removeDuplicates(res);
}

function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}

function findChilds(parent, arr) {
  const childs = [];
  for (const elem of arr) {
    const index = elem.findIndex(x => x === parent);
    if (index >= 0) {
      childs.push(elem[index === 0 ? 1 : 0])
    }
  }
  return childs
}

function findAllChilds(arr) {
  const allChilds = {}
  const uniqueElements = extractUniqueElements(arr)
  for (const elem of uniqueElements) {
    allChilds[elem] = findChilds(elem, arr)
  }
  return allChilds
}

function buildTree(arr) {
  const elements = extractUniqueElements(arr)
  const allChilds = findAllChilds(arr)

  // console.log('elements', elements)
  // console.log('allChilds', allChilds)

  const result = []

  for (const element0 of elements) {
    const level1 = allChilds[element0]
    for (const element1 of level1) {
        const level2 = allChilds[element1]
        for (const element2 of level2) {
          if (element2 === element0) {
            continue
          }
          const level3 = allChilds[element2]
          for (const element3 of level3) {
            if (element3 !== element0) {
              continue
            }
            console.log(element0, element1, element2, element3)
          }
        }
    }
  }

}

buildTree(pairs)

// console.log(JSON.stringify(findAllChilds(pairs)))

// console.log([1,2,3].findIndex(x => x===7)) // -1 if not found

// console.log(extractUniqueElements(pairs))

// console.log(findChilds('A', pairs))

