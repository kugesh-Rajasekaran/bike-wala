//const logn = function(req, res)
const route = require('../routes')
//const accessories = require('../index')
const signUpUser = async (api, firebaseDb) => {
  api.post(route.sign_up, async (req, res) => {

    let checkData;
    await firebaseDb.collection("user_details").doc(req.body.username).get().then(data => checkData = data.data()).catch(err => console.log(err));
    if (checkData != null) {

      res.send(null);
    }
    else {
      await firebaseDb.collection("user_details").doc(req.body.username).set({
        password: req.body.password
      }).then(val => res.send({message : "success"})).catch(err => res.send("Error occured"));
      
    }
    // res.send(checkData)
  })

}
module.exports = { signUpUser };

/*

i/p-{username : YOUR INPUT, password : YOUR INPUT}
Ex. {"username" : "kumaran.kugesh1@gmail.com",  "password" : "raakk"}

o/p-{message : “success”} –  If signup successfully done
             Null         –  If signup failed


*/