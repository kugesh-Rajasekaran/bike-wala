const route = require('../routes')

const servicePriceList = async (api, firebaseDb) => {
    let pricelist;
    await api.get(route.service_pricelist, async (req, res) => {


        await firebaseDb.collection("service_pricelist").get().then((data) => pricelist = data.docs.map(val => val.data())).catch(err => console.log(err));
        console.log(pricelist)
        res.send(pricelist);

    })
    // return pricelist;
}
module.exports = { servicePriceList };