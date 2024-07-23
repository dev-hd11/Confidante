// (C) 2024, Himank Deka
'use server'
import { NextResponse } from 'next/server'
import { Entry } from '@/models/entry'
import { Custom } from '@/models/custom'
import { Data } from '@/models/data'
import { User } from '@/models/user'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        let del = await Entry.deleteMany({})
        let del2 = await Custom.deleteMany({})
        let del3 = await User.deleteMany({})
        let del4 = await Data.deleteMany({})

        return NextResponse.json({ status: 'ok' })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ status: 'error' })

    }
}
