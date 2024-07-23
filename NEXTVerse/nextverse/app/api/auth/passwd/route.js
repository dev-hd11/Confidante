// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { User } from '@/models/user'
import connectDB from '@/db'

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()


        let update = await User.updateOne({}, { $set: { password: data.value, signed_in: false } })

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