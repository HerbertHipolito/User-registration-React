const path = require('path');
const { EquirectangularReflectionMapping } = require('three');
const users = require('../model/users');

const listUsersController = async (req,res) =>{

    try{
        const userList = await users.find();
        return res.json(userList);
    }catch(e){
        return res.status(400).send({'error': e.message});
    }
    
}

const queryUserController = async (req,res) =>{
    try{
        const theUser = await users.findById(req.params.id);
        if(!theUser) throw "User not found";
        return res.json(theUser)
    }catch(e){
        return res.status(400).send({'error': e.message});
    }

}

const POSTregisterUserController = async (req,res) =>{
    
    try{
        
        if(req.body.email.indexOf('@') === -1) return res.status(406).send({error:'email is invalid'});
        if(!(req.body.name && req.body.name && req.body.email)) return res.status(406).send({error:'input missing'})
        const duplicateEmail = await users.find({email:req.body.email});
        if(duplicateEmail.length !== 0) return res.status(406).send({error: 'Duplicate email'});
        const user = await users.create(req.body);
        return res.status(201).send();

    }catch(e){
        return res.status(400).send({error:'Something went wrong'})
    }

}

const DELETEuserController = async (req,res) =>{

    try{
        const result = await users.deleteOne({_id:req.params.id})
        if(!result) throw "error during deletion";
        //res.json({msg:'deu certo sdfj'});
        return res.status(200).send();
    }catch(e){
        return res.status(404).send();
    }

}

module.exports = {listUsersController,queryUserController,DELETEuserController,POSTregisterUserController}
