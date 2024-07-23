// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Custom } from '@/models/custom'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const last_visited = await Custom.findOne({})

        if (last_visited == null) {
            return NextResponse.json({ value: last_visited })
        }

        let out = last_visited.last_visited

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const dateObj = new Date()
        const dateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`
        const dateStr2 = `${dateObj.getDate() - 1} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`

        if (out == dateStr) {
            out = 'Today'
        } 

        if (out == dateStr2) {
            out = 'Yesterday'
        }

        return NextResponse.json({ value: out })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}