"use client"

import { useState, BaseSyntheticEvent, useEffect } from "react"
import { message } from "antd"
import Link from "next/link"

import { signup } from "./actions"

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [messageApi, contextHolder] = message.useMessage()

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

  const errorMessage = (content: string) => {
    messageApi.open({
      type: "error",
      content: content
    })
  }
  const successMessage = (content: string) => {
    messageApi.open({
      type: "success",
      content: content
    })
  }

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Senhas não correspondem ⚠️")
    } else if (password.length > 6 && !error.includes("correspondem")) {
      setError("")
    } else {
      setError("")
    }
  }, [password, confirmPassword, error])

  const handleRegister = async (formData: FormData) => {
    if (password.length < 6) {
      setError("Senha menor que 6 dígitos")
    }

    const msg = await signup(formData)

    console.log("this is message ", msg)

    if (!msg.includes("confirme")) errorMessage(msg)

    successMessage(msg)
  }

  const setNewMessage = () => {
    const messg: string = "babahe"
    successMessage(messg)
  }

  return (
    <>
      {contextHolder}
      <section className="h-full w-full flex flex-col items-center justify-center">
        <div className="border-[2px] flex flex-col gap-4 py-8 px-4 shadow-md xl:w-2/6 md:w-2/4 sm:w-3/4 border-[#cecece40] rounded-lg">
          <div className="m-auto flex flex-col gap-2 text-center my-2">
            <h1 className="!text-3xl !m-0 font-bold text-center">
              Crie sua conta
            </h1>
            <p className="text-sm text-gray-500">
              Aventure-se no auxiliar de cadastro
              <br />
              mais poderoso do Brasil
            </p>
          </div>
          <form className="flex flex-col gap-[0.6rem] w-full px-4">
            <div className="w-full flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="text-gray-500">Nome</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={firstName}
                  onChange={(e: BaseSyntheticEvent) =>
                    setFirstName(e.target.value)
                  }
                  className="border-[1px] border-[#bebebe50] outline-none w-full px-4 py-[0.4rem] rounded-md"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-gray-500">Sobrenome</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={lastName}
                  onChange={(e: BaseSyntheticEvent) =>
                    setLastName(e.target.value)
                  }
                  className="border-[1px] border-[#bebebe50] outline-none w-full px-4 py-[0.4rem] rounded-md"
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label className="text-gray-500 font-medium">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="false"
                className="border-[1px] border-[#bebebe50] outline-none w-full px-4 py-[0.4rem] rounded-md"
                placeholder="ex: nome@exemplo.com"
                value={email}
                onChange={(e: BaseSyntheticEvent) =>
                  handleChange("email", e.target.value)
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-gray-500">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="false"
                className={`border-[1.5px] border-[#bebebe50] outline-none transition-all duration-150 ease-in-out w-full ${error ? "border-[#de185a]" : ""
                  } px-4 py-[0.4rem] rounded-md`}
                value={password}
                required
                onChange={(e: BaseSyntheticEvent) =>
                  handleChange("pass", e.target.value)
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-gray-500">Confirmar Senha</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                autoComplete="false"
                className={`border-[1.5px] border-[#bebebe50] outline-none transition-all duration-150 ease-in-out w-full ${error ? "border-[#de185a]" : ""
                  } px-4 py-[0.4rem] rounded-md`}
                required
                onChange={(e: BaseSyntheticEvent) =>
                  handleChange("confirmPass", e.target.value)
                }
              />
              {error ? (
                <label className="text-[#de185a] mt-2 text-sm">{error}</label>
              ) : (
                ""
              )}
            </div>
            <div className="my-2">
              <button
                className="w-full px-4 py-[0.4rem] flex items-center justify-center gap-2 text-gray-50 rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#2bbe94]"
                formAction={handleRegister}
              >
                Criar conta
              </button>
            </div>
            <button onClick={setNewMessage}>
              Set message
            </button>
            <hr />
            <div className="text-center text-sm">
              <span className="text-gray-600">Já tem uma conta?</span>{" "}
              <Link className="text-[#26a69a] hover:underline" href="/auth/login">
                Entre aqui
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register
