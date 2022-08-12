const { Router } =require("express");
const fs = require('fs')
const router = Router()

router.get('/getData', (req, res) => {
    fs.readFile("./map.json", "utf8",(err,data)=>{
        res.status(200).json(data)
    })
    
})
router.post('/chooseMag', (req, res) => {
    const { shopIds, user } = req.body
    fs.readFile("./map.json", "utf8",
        function (error, data) {
            //console.log("Асинхронное чтение файла");
            if (error) throw error; // если возникла ошибка
            var shops = JSON.parse(data)
            var alreadyBusyShops = []
            shopIds.forEach(shopId => {
                var i = shops.findIndex(el => el.id == shopId)
                if (shops[i].freePlaces < 1) {
                    alreadyBusyShops.push(shops[i].name)
                } else {
                    shops[i].freePlaces = shops[i].freePlaces - 1
                    shops[i].usersInShop.push(user)
                   
                    
                }
            });
            if(alreadyBusyShops.length == 0){
                fs.writeFileSync("./map.json", JSON.stringify(shops))
                res.status(200).json({
                    success: true
                })
            }else{
                res.status(301).json({
                    success: false,
                    message: 'Этот магазин уже занят',
                    alreadyBusyShops
                })
            }
        });
})



module.exports = router