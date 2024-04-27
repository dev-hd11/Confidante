import mongoose  from 'mongoose'

const customSchema = new mongoose.Schema({
    name: String
})

export const Custom =  mongoose.models.Custom || mongoose.model('Custom' ,customSchema)