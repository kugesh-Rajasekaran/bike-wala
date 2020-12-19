const route = require('../routes')

const listOfBikes = async (api, firebaseDb) => {
  api.get(route.list_of_bikes, async (req, res) => {
    //  console.log(req.query.username)
    let listOfBikesDetails;
    await firebaseDb.collection("user_details").doc(req.query.username).get().then(data => listOfBikesDetails = data.data()).catch(err => console.log(err));
    console.log(listOfBikesDetails)

    res.send(listOfBikesDetails.bike_details);

  })

}
module.exports = { listOfBikes };

/*
i/p (as a query) -{username : YOUR INPUT}

Ex.localhost:3001/list-of-bikes/?username=kumaran.kugesh@gmail.com•

o/p-list of bike details

Ex.[{"chassis_no": "QWEDSFRE7558",
"brand_name": "Bajaj",
"model": "dominor 400",
"reg_no": "TN75 1234"}
]


*/