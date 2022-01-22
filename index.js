const PORT = process.env.port || 8080
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()
const itemsList = []

const sourceShoppings = [{
        name: 'Tesco',
        address: 'https://www.tesco.ie/groceries/product/search/default.aspx?searchBox=',
        TAGmainBlockItem: 'ul>li ',
        TAGmainBlockItemName: 'h3.inBasketInfoContainer',
        TAGmainBlockItemPrice: 'span.linePrice',
        GETmainBlockItemURL: 'h3.inBasketInfoContainer>a',
        baseForItemURL: 'https://www.tesco.ie'
    },
    // {
    //     name: 'Dunnes Stores',
    //     address: 'https://www.dunnesstoresgrocery.com/sm/delivery/rsid/258/results?q=',
    //     TAGmainBlockItem: '',
    //     TAGmainBlockItemName: '',
    //     TAGmainBlockItemPrice: '',
    //     GETmainBlockItemURL: '',
    //     baseForItemURL: ''
    // }
]

app.get('/', (req, res) => {
    res.json('Welcome to my Shopping API, you can go to the address shopping?item=banana to test')
})



app.get('/shopping', function(req, res) {
    var item = req.query.item

    sourceShoppings.forEach(sourceShoppings => {
        const searchAddress = sourceShoppings.address + item
        const nameShopping = sourceShoppings.name

        axios.get(searchAddress)
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)
                $(sourceShoppings.TAGmainBlockItem, html).each(function() {
                    const productTitle = $(this).find(sourceShoppings.TAGmainBlockItemName).text()
                    const price = $(this).find(sourceShoppings.TAGmainBlockItemPrice).text()
                    const url = $(this).find(sourceShoppings.GETmainBlockItemURL).attr('href')
                    if (!productTitle == 0) {
                        itemsList.push({
                            nameShopping,
                            productTitle,
                            price,
                            url: sourceShoppings.baseForItemURL + url
                        })
                    }
                })
                res.json(itemsList)
            }).catch((err) => console.log(err))
    })
})




app.listen(PORT, () => console.log('server runing on PORT ' + PORT))