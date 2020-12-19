const admin = require("firebase-admin");
const route = require('../routes')
const servicePriceList = require("./service_pricelist");
const serviceBooking = async (api, firebaseDb) => {
    api.post(route.service_booking, async (req, res) => {

        let price_for_service_opted = await calculatePrice(api, firebaseDb, req.body);
        console.log(price_for_service_opted);
        let checkIfBikeExist = false;
        await firebaseDb.collection("user_details").doc(req.body.username).get().then(data => {
            data.data().bike_details.forEach((rec) => {
                if (rec.reg_no == req.body.reg_no)
                    checkIfBikeExist = true;


            })
        }).catch(err => console.log(err));

        if (checkIfBikeExist) {

            await firebaseDb.collection("user_details").doc(req.body.username).update({ history: admin.firestore.FieldValue.arrayUnion({ mechanic_name: req.body.mechanic_name, payment: 12, reg_no: req.body.reg_no, name: req.body.name, status: "started", services_opted: { customer_service: req.body.customer_service, periodic_service: req.body.periodic_service } }) }).then(err => console.log(err));
            res.send({ message: "success" })
        }
        else {

            await firebaseDb.collection("user_details").doc(req.body.username).update({ bike_details: admin.firestore.FieldValue.arrayUnion({ reg_no: req.body.reg_no, chassis_no: req.body.chassis_no, model: req.body.model, brand_name: req.body.brand_name }) }).then(err => console.log(err));
            await firebaseDb.collection("user_details").doc(req.body.username).update({ history: admin.firestore.FieldValue.arrayUnion({ mechanic_name: req.body.mechanic_name, payment: price_for_service_opted, reg_no: req.body.reg_no, status: "started", services_opted: { customer_service: req.body.customer_service, periodic_service: req.body.periodic_service } }) }).then(err => console.log(err));
            res.send({ message: "success" })
        }

        res.send(null)
        //  return  price_for_service_opted;
    })

}

async function calculatePrice(api, firebaseDb, priceData) {
    let totAmt = 0;
    if (priceData.customer_service == "ALL") {
        totAmt += 60;
    }
    if (priceData.painting_and_washing == "ALL") {
        totAmt += 40;
    }
    if (priceData.periodic_service == "ALL") {
        totAmt += 78;
    }

    return totAmt;


    /*
       let priceList =  servicePriceList.servicePriceList(api, firebaseDb);
       let totAmt = 0;
       if(priceData.customer_service == "ALL"){
           totAmt+=priceList[0].performance_upgrading+ priceList[0].suspension;
       }
       if(priceData.painting_and_washing == "ALL"){
        totAmt+=priceList[1].dent_painting + priceList[1].air_wash;
    }
    if(priceData.periodic_service == "ALL"){
           totAmt+=priceList[2].general+ priceList[2].basic;
       }
    
       console.log(  priceList)
       return  priceList;*/
}

module.exports = { serviceBooking };

/*
i/p-
Ex.{"username" :"kumaran.kugesh@gmail.com","reg_no" : "TN11 1119",
  "model" : "pulsar","brand_name" : "Bajaj","chassis_no" : "ADFD4355FD",
  "mechanic_name" : "prajesh","customer_service" : "ALL","periodic_service" : "ALL",
  "painting_and_washing ":"ALL","status" : "Started"}•
  
  o/p-
   {message : “success”} –If booking successfully doneNull –If booking failed



*/