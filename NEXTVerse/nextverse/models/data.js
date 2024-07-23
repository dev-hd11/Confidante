// (C) 2024, Himank Deka
import mongoose  from 'mongoose'

const dataSchema = new mongoose.Schema({
    license_read: Boolean,
})

export const Data =  mongoose.models.Data || mongoose.model('Data' ,dataSchema)