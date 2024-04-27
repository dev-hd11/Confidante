'use server'
import { NextResponse } from 'next/server'
import { User } from '@/models/user'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const passwd = await User.findOne({})

        return NextResponse.json({ value: passwd.password })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()

        let update = await User.updateOne({}, { $set: { signed_in: data.value } })

        return NextResponse.json({ status: 'ok' })

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}