const PORT = 8080
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const itemsList = []

app.get('/', (req, res) => {
    res.json('Welcome to my Shopping API, you can go to the address shopping?item=banana to test')
})

app.get('/shopping', function(req, res) {
    var item = req.query.item
        //res.json("The requested item is: " + item)
    axios.get('https://www.tesco.ie/groceries/product/search/default.aspx?searchBox=' + item)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('ul>li', html).each(function() {
                const product = $(this).find('h3.inBasketInfoContainer').text()
                const price = $(this).find('span.linePrice').text()
                if (!product == 0) {
                    itemsList.push({
                        product,
                        price
                    })
                }
            })



            // $('h3.inBasketInfoContainer', html).each(function() {
            //     const product = $(this).text()
            //     const price = $('span.linePrice').text()
            //         //const price = $('h3.inBasketInfoContainer').find('span.linePrice')
            //     itemsList.push({
            //         product,
            //         price
            //     })
            // })




            // $('li:contains(' + item + ')', html).each(function() {
            //     const product = $("h3.inBasketInfoContainer").text()
            //     const price = $("span.linePrice").text()
            //     itemsList.push({
            //         product,
            //         price
            //     })
            // })



            res.json(itemsList)
            itemsList = []
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log('server runing on PORT ' + PORT))