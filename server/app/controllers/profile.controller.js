const db = require("../models"); // Call Models Table
const User = db.user; // Model User

exports.updateProfile = async (req, res) => {
    try{
        const id = req.params.id;
        const newData = req.body;

        await User.update(newData, {
            where: {
                id
            }
        })
        const profileData = JSON.parse(JSON.stringify(newData));
        const newdata = profileData[0]
        res.send({status: "success", data: {
            newdata
        }})
    } catch(e) {
        console.log(e);
    }
}