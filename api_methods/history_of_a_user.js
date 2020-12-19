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

/*
i/p (as a query)-usernameEx.localhost:3001/history-of-a-user?username=kumaran.kugesh@gmail.com•

o/p-Details of a bike based on the registration number given in the query

Ex.{"history": [{"services_opted": 
                 {"customer_service": "suspention","periodic_service": "general"},
                 "mechanic_name": "kumaravel",
                 "reg_no": "TN75 7856",
                 "status": "completed",
                 "payment": 45}]



*/