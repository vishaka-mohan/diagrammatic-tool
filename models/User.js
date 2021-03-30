const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    name:{
        type: String,      
       
    },

    
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email']


    },
    company:{
        type:String
    },
    accType:{
        type: String,      
       
    },
    password:{ 
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']

    }
});

//fucntion after save
/*userSchema.post('save', function(doc,next){
    console.log('new user created', doc);
    next();
})*/

//fucntion before save
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);

    next();
});



//static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth =await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}
const User = mongoose.model('user', userSchema);
module.exports = User;
