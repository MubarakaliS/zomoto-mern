const express = require("express")
const router = express.Router()

const loc = require("./controller/location")
const mealType = require("./controller/mealType")
const restaruant = require("./controller/restaruant")
const signUp = require("./controller/signup")
const signIn = require("./controller/signIn")
const menuItem = require("./controller/MenuItems")


router.get('/getallloc',loc.getAllLoc)
router.get('/getallloc/:location_id',loc.getAllLocById)
router.get('/getallrest/:city',restaruant.getCity)
router.get('/getallrestById/:id',restaruant.getrestid)
router.get('/getallmeal',mealType.getAllMealtype)
router.get('/getallrest',restaruant.getAllrestaruant)
router.get('/getallrestLocationId/:location_id',restaruant.getAllrestLocById)
router.post('/signup', signUp.getAllSignUp)


router.get('/api/query',restaruant.getQuery)

router.post('/filter',restaruant.filter)
router.post('/signin',signIn.getSignIn)

router.get('/menuItemByName/:name',menuItem.getAddItems)
router.get('/menuItem',menuItem.getAllmenuItem)



const payment = require('./controller/paymentcontroller');

router.post('/payment/process',payment.processPayment);
router.get('/stripe',payment.sendStripe);

module.exports =router




