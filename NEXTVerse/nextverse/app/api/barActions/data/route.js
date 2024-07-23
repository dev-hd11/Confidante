// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Entry } from '@/models/entry'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        let del = await Entry.deleteMany({})

        return NextResponse.json({ status: 'ok' })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ status: 'error' })

    }
}
