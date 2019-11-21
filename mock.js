const express = require('express')
const app = express()
var goods = require("./data/goods.json")
var ratings = require("./data/ratings.json")
var seller = require("./data/seller.json")
// const seller = appData.seller
// const goods = appData.goods
// const ratings = appData.ratings
const apiRoutes = express.Router()
apiRoutes.get('/seller', (req, res) => {
    res.json({
        errno: 0,
        data: seller
    })
})
apiRoutes.get('/goods', (req, res) => {
    res.json({
        errno: 0,
        data: goods
    })
})
apiRoutes.get('/ratings', (req, res) => {
    res.json({
        errno: 0,
        data: ratings
    })
})
// app.get("/api/goods",(req,res) => {
// res.json(goods)
// })

// app.get("/api/ratings",(req,res) => {
// res.json(ratings)
// })

// app.get("/api/seller",(req,res) => {
// res.json(seller)
// })
app.use('/', apiRoutes)
app.listen(8081, () => {
    console.log('mock data is Running')
})