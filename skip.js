const fs = require('fs')

function setToDefault() {
    fs.readFile("./map.json", 'utf-8', (err, data) => {
        newData = []
        data = JSON.parse(data)
        data.forEach(element => {
            if (element.city == 'Омск') {
                newData.push({
                    ...element,
                    freePlaces: 4,
                    usersInShop: []
                })
            }

        })
        result = newData.sort(compare)
        fs.writeFileSync("./map.json", JSON.stringify(result))
    })

}

function getStats() {
    fs.readFile("./map-fixed  .json", 'utf-8', (err, data) => {
        newData = JSON.parse(data)
        groupedData = []
        newData.forEach(elem => {
            elem.usersInShop.forEach(user => {
                userIndex = groupedData.findIndex(group => group.phone == user.phone)
                if (userIndex == -1) {
                    groupedData.push({
                        name:user.fio,
                        phone:user.phone,
                        mags:[
                            elem.name
                        ]
                    })
                }else{
                    groupedData[userIndex].mags.push(elem.name)
                }
            })
        })
        fs.writeFileSync("./map-stats.json", JSON.stringify(groupedData))
    })
}

function deleteSame(){
    fs.readFile("./map.json", 'utf-8', (err, data) => {
        newData = JSON.parse(data)
        groupedData = []
        newData.forEach(elem => {
            const table = {}
            const res = elem.usersInShop.filter(({phone}) =>(!table[phone] && (table[phone] = 1)));
            groupedData.push({
                ...elem,
                usersInShop:res,
                freePlaces:(4-res.length)
            })
        })

        fs.writeFileSync("./map-fixed.json", JSON.stringify(groupedData))
    }) 
}

function getList() {
    fs.readFile("./map.json", 'utf-8', (err, data) => {
        newData = JSON.parse(data)
        groupedData = []
        newData.forEach(elem => {
            elem.usersInShop.forEach(user => {
                groupedData.push({
                    name:user.fio,
                    phone:user.phone,
                    mag:elem.name
                })
            })
        })

        fs.writeFileSync("./map-stats.json", JSON.stringify(groupedData))
    })
}

function compare(a, b) {
    if (a.code > b.code) {
        return 1
    }
    if (a.code < b.code) {
        return -1
    }
    return 0
}
function groupBy(arr, fieldName) {
    newarr = arr.reduce((r, a) => {

        r[a[fieldName]] = r[a[fieldName]] || [];

        r[a[fieldName]].push(a);

        return r;

    }, {});
    return newarr
}


// setToDefault()
getStats()