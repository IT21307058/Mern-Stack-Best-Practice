const users = require("../models/userSchema")
const moment = require("moment");

// register user
exports.userpost = async(req, res) => {
    const file = req.file.filename;
    const {fname,lname,email, mobile, gender, location, status} = req.body;

    if(!fname || !lname || !email || !mobile || !gender || !location || !status || !file){
        res.status(401).json("All Inputs required")
    }

    try{
        // check already exists
       const preuser = await users.findOne({email: email});
       
       if(preuser){
        res.status(401).json("This user already exists in out databse")
       }else{
        const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")

        const userData = new users({
            fname,lname,email, mobile, gender, location, status,profile:file,datecreated
        });

        await userData.save();
        res.status(200).json(userData);
       }
    }catch(error){
        res.status(401).json(error)
        console.log("catch block error")
    }

}

// user get
exports.userget = async(req, res) => {
    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""
    const sort = req.query.sort || ""

    // It allows you to search for documents where a particular 
    // field matches a specified regular expression pattern.
    // regardless of whether the characters in search are uppercase or lowercase
    const query = {
        fname : {$regex : search, $options: "i"}
    }

    if(gender !== "All"){
        query.gender = gender
    }

    if(status !== "All"){
        query.status = status
    }

    try{
        const userdata = await users.find(query)
        .sort({datecreated:sort == "new" ? -1 : 1})
        res.status(200).json(userdata)
    }catch{
        res.status(401).json(error);
    }
}

// single user get
exports.singleuserget = async(req, res) => {
    const {id} = req.params;

    try{
        const userdata = await users.findOne({_id: id})
        res.status(200).json(userdata);
    }catch(error){
        res.status(401).json(error);
    }
}

// user edit
exports.useredit = async(req, res) => {
    const {id} = req.params;
    const {fname, lname, email, mobile, gender, location, status, user_profile} = req.body;

    const file = req.file ? req.file.filename : user_profile

    const dateupdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try{
        const updateuser = await users.findByIdAndUpdate({_id:id}, {
            fname,lname,email, mobile, gender, location, status,profile:file,dateupdated
        },{
            new:true
        })

        await updateuser.save();
        res.status(200).json(updateuser);
    }catch(error){
        res.status(401).json(error);
    }
}

// delete user
exports.userdelete = async(req, res) => {
    const {id} = req.params;

    try{
        const deleteuser = await users.findByIdAndDelete({_id: id});
        res.status(200).json(deleteuser);
    }catch(error){
        res.status(401).json(error);
    }
}

// change status
exports.userstatus = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    try{
        const userstatusupdate = await users.findByIdAndUpdate({_id:id}, {status:data}, {new: true});
        res.status(200).json(userstatusupdate);
    }catch(error){
        res.status(401).json(error);
    }
}