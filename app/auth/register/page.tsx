"use client"

import { useState, BaseSyntheticEvent, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import Image from "next/image"
import AucadIcon from "../../../public/assets/aucad ico.jpg"

import { signup } from "./actions"

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

    const login = { email, password }

    const response = await axios.post("/api/users", login)

    console.log(response.data)

    if (response.data.error) {
      console.warn(
        `${response.data.error.code} and ${response.data.error.name}`
      )
    } else {
      console.log(`${response.data.message} and ${response.data.data.user}\n\n`)

      // console.log(response.data.data.user.email)
      // console.log(response.data.data.user.id)
      // console.log(response.data.data.user.role)
      // console.log(response.data.data.user.created_at)
    }
  }

  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      <div className="border-[2px] flex flex-col gap-4 py-8 px-4 shadow-md w-2/6 border-[#cecece40] rounded-lg">
        <div className="m-auto text-center">
          <Image
            src={AucadIcon}
            alt="aucad icon"
            className="block m-auto rounded-full border-[1px] border-[#000] shadow-md"
            width={50}
            height={50}
          />
          <h1 className="text-lg font-bold text-center my-2">Crie sua conta</h1>
        </div>
        <form className="flex flex-col gap-2 w-full px-4">
          <div className="w-full">
            <input
              type="email"
              name="email"
              id="email"
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
              name="password"
              id="password"
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
              name="confirm-password"
              id="confirm-password"
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
              className="w-full py-2 text-gray-50 rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#2bbe94]"
              formAction={signup}
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
