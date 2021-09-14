const Nightmare = require('nightmare')
const nightmare = Nightmare({})


const getProduct = async (url) => {
    console.log('calling')
    try{
        const result = await nightmare
            .goto(url)
            .wait('#dp #ppd')
            .evaluate(() =>{
                let arr = []
                document.querySelectorAll('#altImages .a-button-inner img').forEach(i =>{
                    arr.push(i.src)
                })
                let name = document.querySelector("#productTitle")?.innerText;
                let cost = document.querySelector('#priceblock_ourprice')?.innerText
                return {images:arr.splice(1),name,cost}

            }).end();
        console.log('called')
        return result;
    }catch(err){
        console.log(err)
    }
}

module.exports = getProduct;
