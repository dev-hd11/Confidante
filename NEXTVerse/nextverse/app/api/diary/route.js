// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Entry } from '@/models/entry'
import connectDB from '@/db'

export async function POST(request) {
    try {

        await connectDB()

        let data = await request.json()

        let id = data.id

        console.log(data)

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const dateObj = new Date()
        const dateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`

        const entry = new Entry({
            en_id: id + 1,
            title: data.title,
            content: data.content,
            created_at: dateStr,
            starred: false
        })

        await entry.save()

        return NextResponse.json({
            status: 'ok'
        })
    } catch (error) {
        console.log('Error: ' + error)
        return NextResponse.json({
            status: 'error'
        })
    }
}

export async function GET(request) {
    try {
        await connectDB()

        const entries = await Entry.find({})

        if (entries.length === 0) {
            return NextResponse.json({ value: null })
        }

        return NextResponse.json({ value: entries })
    } catch (error) {
        console.error(`Error: ${error}`)
        return NextResponse.json({ status: 'error', message: 'Failed to fetch entries' })
    }
}
