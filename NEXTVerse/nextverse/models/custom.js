// (C) 2024, Himank Deka
import mongoose from 'mongoose';

const customSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    last_visited: {
        type: String,
        required: true 
    },
    entries: {
        type: Number,
        required: true 
    }
});

export const Custom = mongoose.models.Customize || mongoose.model('Customize', customSchema);
