const router = require("express").Router();
const { Purchase } = require("../database/indexDB")
const authToken = require("../middleware/authToken")

router.get("/", authToken, async(req, res) => {
    const isStaff = req.user.isStaff

    if(isStaff){
        const purchases = await Purchase.sync()
        .then(() => {
            return Purchase.findAll()
        })

        res.send(purchases);
    }
    else{
        res.send("Something went wrong!")
    }
})

router.post("/create", authToken, async(req, res) => {
    const userId = req.user.id;

    const newPurchase = {
        userId: userId,
        items: req.body.items,
        price: req.body.price
    }

    res.json(newPurchase);
})


module.exports = router;
