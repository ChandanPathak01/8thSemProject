const appliedLeave = require('../models/appliedLeave');


const list = async (req,res) => {
    try{   
    date = req.body.date
    const pplList = await appliedLeave.find({ status: 'Verified' }, 'name department role -_id');
res.send({pplList});    
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding list'});

}}


module.exports = {list};
