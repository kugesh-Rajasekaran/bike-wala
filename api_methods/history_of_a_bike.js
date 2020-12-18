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