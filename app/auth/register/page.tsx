"use client"

import { useState, BaseSyntheticEvent, useEffect } from "react"
import Link from "next/link"
import { supabaseClient } from "@/lib/supabaseClient"

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleChange = (field: string, val: string) => {
    if (field === "email") {
      setEmail(val)
    } else if (field === "pass") {
      setPassword(val)
    } else {
      setConfirmPassword(val)
    }
  }

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("⚠️ Passwords doesn't match")
    } else {
      setError("")
    }
  }, [password, confirmPassword])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (error) return

    const data = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    const response = await data.json()

    console.log(`this is ${email} and ${password} and this is response 👇`)

    console.log(response)
  }

  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      <div className="border-[2px] py-2 px-4 shadow-md w-2/6 border-[#cecece40] rounded-lg">
        <h1 className="text-lg font-bold text-center my-2">Crie sua conta</h1>
        <form className="flex flex-col gap-2 w-full px-4">
          <div className="w-full">
            <input
              type="email"
              className="border-[1px] outline-none w-full rounded-md bg-gray-50 px-4 py-2"
              placeholder="Email"
              value={email}
              onChange={(e: BaseSyntheticEvent) =>
                handleChange("email", e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              className={`border-[1px] transition-all duration-150 ease-in-out ${
                error ? "border-[#de185a]" : ""
              } outline-none w-full rounded-md bg-gray-50 px-4 py-2`}
              placeholder="Senha"
              value={password}
              required
              onChange={(e: BaseSyntheticEvent) =>
                handleChange("pass", e.target.value)
              }
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              className={`border-[1px] transition-all duration-150 ease-in-out ${
                error ? "border-[#de185a]" : ""
              } outline-none w-full rounded-md bg-gray-50 px-4 py-2`}
              placeholder="Confirmar senha"
              required
              onChange={(e: BaseSyntheticEvent) =>
                handleChange("confirmPass", e.target.value)
              }
            />
            {error ? (
              <label className="text-[#de185a] text-sm">{error}</label>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2">
            <button
              className="w-full py-2 text-gray-50 rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#10d19a]"
              onClick={handleSubmit}
            >
              Criar conta
            </button>
          </div>
          <hr />
          <div className="text-center text-sm">
            <span className="text-gray-600">Já tem uma conta?</span>{" "}
            <Link className="text-[#26a69a]" href="/auth/login">
              Entre aqui
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register
