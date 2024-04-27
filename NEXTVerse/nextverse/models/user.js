import mongoose  from 'mongoose'

const userSchema = new mongoose.Schema({
    password: String,
    signed_in: Boolean
})

export const User =  mongoose.models.User || mongoose.model('User' ,userSchema)