import { NextResponse } from "next/server"

import { signup } from "./actions"

export async function POST(req: Request) {
  try {
    const { first_name, last_name, email, password } = await req.json()

    console.log(req.body)

    console.log({ first_name, last_name, email, password })

    const response: string = await signup({ first_name, last_name, email, password })

    if (!response) {
      throw new Error("An error has occurred signing up")
    }

    return NextResponse.json({
      message: response,
      status: "ok",
    })
  } catch (error) {
    return NextResponse.json({ message: error, status: "fail" })
  }
}
