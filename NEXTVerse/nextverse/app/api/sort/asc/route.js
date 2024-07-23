// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Entry } from '@/models/entry'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const entries = await Entry.find({}).sort({en_id: 1})

        if (entries.length === 0) {
            return NextResponse.json({ value: null })
        }

        return NextResponse.json({ value: entries })
    } catch (error) {
        console.error(`Error: ${error}`)
        return NextResponse.json({ status: 'error', message: 'Failed to fetch entries' })
    }
}