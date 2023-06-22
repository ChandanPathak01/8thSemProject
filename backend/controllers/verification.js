const mongoose = require('mongoose');
const leaveList = require('../models/appliedLeave')

const verify = async (req, res) => {
    // try{
    id = req.id;
    console.log(id);
    // role = req.user.role
    // console.log(role);
    // console.log(leaveList);
    // console.log(hodName);
    // const details = await leaveList.updateOne({id : id},{$set:{hodStatus:"Verified"}}, 'name department ');
    // res.send({details});
// } catch (error) {
//     console.log(error);
//     res.status(500).send({message: 'error in finding requests'});
}


module.exports = {verify};