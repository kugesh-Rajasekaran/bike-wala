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

/*

i/p -need not give any input•
localhost:3001/service-pricelist

o/p-Price list

Ex,. [{"suspension": 22,"performance_upgrading": 44},
      {"dent_painting": 7,"air_wash": 8},
       {"basic": 23,"general": 26}]


*/