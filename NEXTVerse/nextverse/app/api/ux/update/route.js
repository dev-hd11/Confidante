// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Custom } from '@/models/custom'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const dateObj = new Date()
        const dateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`

        let update = await Custom.updateOne({}, { $set: { last_visited:  dateStr} })

        return NextResponse.json({ status: 'ok' })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}