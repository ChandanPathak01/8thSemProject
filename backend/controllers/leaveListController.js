const appliedLeave = require('../models/appliedLeave');


const list = async (req,res) => {
    try{   
    const date = req.query.date;
    // console.log(date);

const pplList = await appliedLeave.find({$and: [{ from: { $lte: date } },{ to: { $gte: date } },{ status: "Verified" }]}, "name department role -_id");
res.send({pplList});    
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding list'});

}}

module.exports = {list};
