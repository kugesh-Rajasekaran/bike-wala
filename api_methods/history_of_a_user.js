const route = require('../routes')

const historyOfAUser = async (api, firebaseDb) => {
    api.get(route.history_of_a_user, async (req, res) => {
       console.log(req.query.username)
        let user_history ;
        await firebaseDb.collection("user_details").doc(req.query.username).get().then((data) => user_history = data.data()).catch(err => console.log(err));
          

     res.send(user_history);
       
    })
    
}
module.exports = {historyOfAUser};