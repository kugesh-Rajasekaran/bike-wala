const constants = require("./constants");
const sign_up = require("./api_methods/sign-up");
const log_in = require("./api_methods/log-in");
const history_of_a_bike = require("./api_methods/history_of_a_bike");
const list_of_bikes = require("./api_methods/list-of-bikes");
const service_bookings = require("./api_methods/service_booking");
const history_of_a_user = require("./api_methods/history_of_a_user");
const service_pricelist = require("./api_methods/service_pricelist");
const api = constants.api;
const bodyParser = constants.bodyParser;
const admin = constants.admin;
const firebaseKey = require('./firebase-key.json');
const port = constants.port;
const serviceAccount = firebaseKey;
const cors = require('cors')


constants.admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const firebaseDb = constants.admin.firestore();

const fieldVal = constants.admin.firestore.FieldValue;
api.use(cors())
api.use(bodyParser.json());

/*initializing all endpoints*/
sign_up.signUpUser(api, firebaseDb);
log_in.logInUser(api, firebaseDb);
list_of_bikes.listOfBikes(api, firebaseDb);
history_of_a_bike.historyOfABike(api, firebaseDb);
service_bookings.serviceBooking(api, firebaseDb);
history_of_a_user.historyOfAUser(api, firebaseDb);
service_pricelist.servicePriceList(api, firebaseDb);
/*---------------------------------------- */
api.listen(port, () => {
    console.log("Server started running successfully at " + port);
});





/*

//firebaseDb.collection("sample").doc("id").get().then(data => console.log(data.data()));
//firebaseDb.collection("sample").doc("id2").set({class:"B.E"}).then(res => console.log(res));
//firebaseDb.collection("sample").doc("id2").delete().then(res => console.log(res));
//firebaseDb.collection("sample").doc("id2").set({class:"B.E"}).then(res => console.log(res));


api.get('/sample', (req, res) => {

    res.send(req);
});

api.listen(port, () => {
    console.log("It's done");
});*/