const route = require('../routes')
const historyOfABike = async (api, firebaseDb) => {
  api.get(route.history_of_a_bike, async (req, res) => {
    console.log(req.query.reg_no)
    let bike_history;
    await firebaseDb.collection("user_details").doc(req.query.username).get().then((data) => { data.data().history.forEach((history) => { if (history.reg_no == req.query.reg_no) bike_history = history }) }).catch(err => console.log(err));
    console.log(bike_history)

    res.send(bike_history);

  })
}
module.exports = { historyOfABike };

/*

i/p (as a query)-username
Ex.localhost:3001/history-of-a-user?username=kumaran.kugesh@gmail.com

o/p-Details of a bike based on the registration number given in the query
Ex.{"history": [{"services_opted": 
                {"customer_service": "suspention","periodic_service": "general"},
                "mechanic_name": "kumaravel",
                "reg_no": "TN75 7856",
                "status": "completed",
                "payment": 45}]



*/