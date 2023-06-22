
const leaveList = require("../models/appliedLeave");

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const { status } = req.body;
    role = req.user.role;

    if (role === 'HOD'){
        if (status=="Denied"){
            await leaveList.findByIdAndUpdate(id, { hodStatus: status, status : status });
        }
        else{await leaveList.findByIdAndUpdate(id, { hodStatus: status });}
    }
    if (role === 'Principal'){await leaveList.findByIdAndUpdate(id, { status: status });}
    res.status(200).send({ message: "Leave status updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating leave status." });
  }
};

module.exports = { updateLeaveStatus };
