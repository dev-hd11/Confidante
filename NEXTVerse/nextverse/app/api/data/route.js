// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Data } from '@/models/data'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const hasRead = await Data.findOne({})

        if (hasRead == null) {
            return NextResponse.json({ value: null })
        }

        return NextResponse.json({ value: hasRead.license_read })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}