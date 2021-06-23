"use strict"

function maxItemAssociation (purchases) {
    let result = []

    purchases.forEach((group, index) => {

        group.forEach(() => {
            const list = [...group]

            for (let i = 0; i < purchases.length; i++) {
                if (index !== i && purchases[i].some(purchase => list.includes(purchase))) {
                    list.push(...purchases[i].filter(purchase => !list.includes(purchase)))
                }
            }

            if (list.length > result.length) {
                result = [...list].sort()
            }
        })
    })

    return result
}

// test
const purchasesHistory_1 = [["a", "b"], ["a", "c"], ["d", "e"]]
const purchasesHistory_2 = [
    ['d', 'e'],
    ['e', 'n'],
    ['a', 'b'],
    ['a', 'c'],
    ['c', 'q']
]
console.log(maxItemAssociation(purchasesHistory_1)) // [ 'a', 'b', 'c' ]
console.log(maxItemAssociation(purchasesHistory_2)) // [ 'a', 'b', 'c', 'q' ]
