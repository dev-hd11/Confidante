'use server'
import { NextResponse } from 'next/server'
import { Custom } from '@/models/custom'
import connectDB from '@/db'

export async function GET(request) {
    try {
        await connectDB()

        const name = await Custom.findOne({})

        if (name == null) {
            return NextResponse.json({ value: name })
        }

        return NextResponse.json({ value: name.name })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()

        const custom = new Custom({
            name: data.name
        })

        await custom.save()

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