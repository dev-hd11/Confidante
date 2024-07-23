// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { User } from '@/models/user'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const isSignedIn = await User.findOne({})

        if (isSignedIn == null) {
            return NextResponse.json({ value: null })
        }

        return NextResponse.json({ value: isSignedIn.signed_in })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()

        const user = new User({
            password: data.passwd,
            signed_in: false
        })

        await user.save()

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