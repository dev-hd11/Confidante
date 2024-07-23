// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Data } from '@/models/data'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const create = await Data.create({ license_read: true })

        return NextResponse.json({ value: true })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}