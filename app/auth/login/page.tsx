"use client"

import { GoogleOutlined } from "@ant-design/icons"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { BaseSyntheticEvent, useState } from "react"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleChange = (field: string, val: string) => {
    if (field === "email") {
      setEmail(val)
    } else if (field === "pass") {
      setPassword(val)
    }
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log(email, password);
  }

  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      <div className="border-[2px] flex flex-col gap-2 py-2 px-4 w-2/6 border-[#cecece40] rounded-lg">
        <h1 className="text-lg font-bold text-center my-2">Login</h1>
        <div className="flex flex-col gap-2 px-4 items-center justify-center w-full">
          <button className="w-full py-2 flex items-center justify-center gap-2 transition-all ease-in-out hover:bg-gray-50 px-4 roudned-md border-[1px] border-[#cecece40] mx-4" onClick={() => signIn("google")}><span className="text-gray-500">You can sign in using google</span> <GoogleOutlined /></button>
        </div>
        <hr />
        <form className="flex flex-col gap-2 w-full px-4">
          <div className="w-full">
            <input
              type="email"
              className="border-[1px] outline-none w-full rounded-md bg-gray-50 px-4 py-2"
              placeholder="Type your email"
              value={email}
              onChange={(e: BaseSyntheticEvent) =>
                handleChange("email", e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              className="border-[1px] outline-none w-full rounded-md bg-gray-50 px-4 py-2"
              placeholder="Type your password"
              value={password}
              onChange={(e: BaseSyntheticEvent) =>
                handleChange("pass", e.target.value)
              }
            />
          </div>
          <div>
            <button className="w-full py-2 rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#10d19a]" onClick={handleSubmit}>Login</button>
          </div>
          <hr />
          <div className="text-center">
            <span>Não tem uma conta?</span> <Link className="text-[#26a69a]" href="/auth/register">Crie aqui</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
