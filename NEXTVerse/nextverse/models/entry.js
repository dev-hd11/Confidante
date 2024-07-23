// (C) 2024, Himank Deka
import mongoose  from 'mongoose'

const entrySchema = new mongoose.Schema({
    en_id: Number,
    title: String,
    content: String,
    created_at: String,
    starred: Boolean
})

export const Entry =  mongoose.models.Entry || mongoose.model('Entry' ,entrySchema)