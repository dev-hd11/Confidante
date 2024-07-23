// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Entry } from '@/models/entry'
import connectDB from '@/db'

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()
        let search = data.value

        const entries = await Entry.find({ title: { $regex: `^${search}`, $options: 'i' } })

        if (entries.length === 0) {
            return NextResponse.json({ value: null })
        }

        return NextResponse.json({ value: entries })
    } catch (error) {
        console.error(`Error: ${error}`)
        return NextResponse.json({ status: 'error', message: 'Failed to fetch entries' })
    }
}
