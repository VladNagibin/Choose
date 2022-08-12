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
function compare(a,b){
    if(a.code>b.code){
        return 1
    }
    if(a.code<b.code){
        return -1
    }
    return 0
}


setToDefault()