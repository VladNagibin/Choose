const fs = require('fs')
const XLSX = require("xlsx");
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
        result = newData.sort((a, b) =>{
            if (a[field] > b[field]) {
                return 1
            }
            if (a[field] < b[field]) {
                return -1
            }
            return 0
        })
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


function groupBy(arr, fieldName) {
    newarr = arr.reduce((r, a) => {

        r[a[fieldName]] = r[a[fieldName]] || [];

        r[a[fieldName]].push(a);

        return r;

    }, {});
    return newarr
}
function writeToExcel(){
    fs.readFile("./map-def.json", 'utf-8', (err, data) => {
        const worksheet = XLSX.utils.json_to_sheet(JSON.parse(data));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, "data.xlsx");

    })
}
function readExcel(){
    var workbook = XLSX.readFile('data.xlsx',{type:'string'});
    var data = XLSX.utils.sheet_to_json(workbook.Sheets.Data)
    console.log(data)
}

// setToDefault()
//getStats()
//writeToExcel()
readExcel()