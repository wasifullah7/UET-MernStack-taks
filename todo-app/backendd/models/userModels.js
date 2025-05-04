const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
});

//hash password

userSchema.pre("save", async function (next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
});


module.exports = mongoose.model('User',userSchema)