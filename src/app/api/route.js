import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json("HELLO", {status: 200})
}