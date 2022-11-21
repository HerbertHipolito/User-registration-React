const users = require('../model/users');

const listUsersController = async (req,res) =>{

    try{
        const userList = await users.find();
        return res.status(200).send({list:userList,'error':false});
    }catch(e){
        return res.status(400).send({'error': e});
    }
    
}

const queryUserController = async (req,res) =>{
    try{
        const theUser = await users.findById(req.params.id);
        if(!theUser) throw "User not found";
        return res.json(theUser)
    }catch(e){
        return res.status(400).send({'error': e});
    }

}

const POSTregisterUserController = async (req,res) =>{
    
    try{
        
        if(req.body.email.indexOf('@') === -1) return res.status(406).send({error:'email is invalid'});
        if(!(req.body.name && req.body.name && req.body.email)) return res.status(406).send({error:'input missing'})
        const duplicateEmail = await users.find({email:req.body.email});
        if(duplicateEmail.length !== 0) return res.status(406).send({error: 'Duplicate email'});
        await users.create(req.body);
        return res.status(201).send({error:false});

    }catch(e){
        return res.status(400).send({error:e})
    }

}

const DELETEuserController = async (req,res) =>{

    try{
        await users.deleteOne({_id:req.params.id})
        return res.status(200).send();
    }catch(e){
        return res.status(404).send();
    }

}

module.exports = {listUsersController,queryUserController,DELETEuserController,POSTregisterUserController}
