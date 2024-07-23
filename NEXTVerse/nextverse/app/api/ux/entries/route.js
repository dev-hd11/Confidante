// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Custom } from '@/models/custom'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const entries = await Custom.findOne({})

        if (entries == null) {
            return NextResponse.json({ value: entries })
        } 

        return NextResponse.json({ value: entries.entries })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()
        let no_entries = data.value

        let update = await Custom.updateOne({}, { $set: { entries : no_entries} })

        return NextResponse.json({ status: 'ok' })

    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ status: 'error' })
    }
}