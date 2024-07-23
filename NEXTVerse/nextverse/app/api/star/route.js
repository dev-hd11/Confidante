// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Entry } from '@/models/entry'
import connectDB from '@/db'

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()


        let update = await Entry.updateOne({ en_id: data.en_id }, { $set: { starred: data.value } })

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