const mongoose=require('mongoose');
const encrypt =require('mongoose-encryption');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    email:String,
    password:String
});
//encryption
const secret="Thisisoursecret.";
UserSchema.plugin(encrypt,{secret: secret ,encryptedFields:["password"]});

module.exports =mongoose.model('User',UserSchema);