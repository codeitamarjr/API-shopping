const PORT = process.env.PORT || 8088
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()
const itemsList = []

const sourceShoppings = [{
        name: 'Tesco',
        address: 'https://www.tesco.ie/groceries/en-IE/search?query=',
        TAGmainBlockItem: '.product-tile-wrapper',
        TAGmainBlockItemName: '.eYySMn',
        TAGmainBlockItemPrice: '.value', //Text from class "eYySMn"
        GETmainBlockItemURL: 'a.eYySMn', //Class eYySMn inside a link
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

                    const productTitle = $(this).find(sourceShoppings.TAGmainBlockItemName).first().text()
                    const price = $(this).find(sourceShoppings.TAGmainBlockItemPrice).first().text()
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