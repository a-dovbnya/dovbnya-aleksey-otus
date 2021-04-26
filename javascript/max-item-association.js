"use strict"

function maxItemAssociation (purchases) {
    let result = []

    purchases.forEach((group, index) => {

        group.forEach((el) => {
            for (let i = 0; i < purchases.length; i++) {
                if (index !== i && purchases[i].includes(el)) {
                    const list = [...group, ...purchases[i].filter(el => !group.includes(el))].sort()

                    if (list.length > result.length) {
                        result = list
                    } else if (!result.length) {
                        result = group
                    }
                }
            }
        })
    })

    return result
}

// test
const purchasesHistory = [["a", "b"], ["a", "c"], ["d", "e"]]
console.log(maxItemAssociation(purchasesHistory))
