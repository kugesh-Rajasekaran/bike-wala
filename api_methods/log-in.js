
const route = require('../routes');

const logInUser = async (api, firebaseDb) => {

  api.post(route.log_in, async (request, response) => {
    let user = request.body;
    let password = await validateUser(user.username, firebaseDb);
    if (password == null) {
      return response.send(false);
    }
    if (!password) {
      return response.send(false);
    }
    if (password === user.password) {
      return response.send(true);
    }
    return response.send(false);
  })


}

async function validateUser(email, firebaseDb) {
  let snapshot;
  await firebaseDb.collection("user_details").doc(email).get().then(data => snapshot = data);


  if (snapshot.data() == null) {
    return null;
  }
  let password = snapshot.data().password;
  return password;
}

module.exports = { logInUser };