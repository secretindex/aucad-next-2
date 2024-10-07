"use client"

import { GoogleOutlined } from "@ant-design/icons"
import axios from "axios"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BaseSyntheticEvent, useState } from "react"
import { login } from "../register/actions"

import AucadIcon from "../../../public/assets/aucad round corners.png"
import Image from "next/image"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  // const [errorMessage, setErrorMessage] = useState<string>("")

  const router = useRouter()

  const handleChange = (field: string, val: string) => {
    if (field === "email") {
      setEmail(val)
    } else if (field === "pass") {
      setPassword(val)
    }
  }

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log(email, password)

    const res = await axios.get("/api/users")

    console.log(res.data)
  }

  const handleLogin = () => {
    signIn("google")
    router.push("/")
  }

  return (
    <section className="h-full w-full flex flex-col shadow-md items-center justify-center">
      <div className="border-[2px] flex shadow-md flex-col gap-4 py-8 px-4 w-2/6 border-[#cecece40] rounded-lg">
        <div className="m-auto text-center">
          <Image
            src={AucadIcon}
            alt="aucad icon"
            className="block m-auto rounded-md border-[1px] border-[#000] shadow-md"
            width={50}
            height={50}
          />
          <h1 className="text-lg font-bold text-center my-2">Entre no Aucad</h1>
        </div>
        <div className="flex flex-col gap-2 px-4 items-center justify-center w-full">
          <button
            className="w-full py-2 flex items-center justify-center gap-2 transition-all ease-in-out hover:bg-gray-50 px-4 roudned-md border-[1px] border-[#cecece40] mx-4"
            onClick={handleLogin}
          >
            <span className="text-gray-500">You can sign in using google</span>{" "}
            <GoogleOutlined />
          </button>
        </div>
        <hr />
        <form className="flex flex-col gap-[0.6rem] w-full px-4">
          <div className="w-full flex flex-col gap-[0.2rem]">
            <label className="text-gray-500">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="false"
              className="border-[1px] border-[#bebebe50] outline-none w-full px-4 py-[0.4rem] rounded-md"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e: BaseSyntheticEvent) =>
                handleChange("email", e.target.value)
              }
            />
          </div>
          <div className="w-full flex flex-col gap-[0.2rem]">
            <div className="flex flex-row justify-between">
              <label className="text-gray-500">Senha</label>
              <Link
                className="text-[#26a69a] transition-all duration-150 ease-in-out hover:underline"
                href={"/profile/change-password"}
              >
                Esqueci a senha
              </Link>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="false"
              className="border-[1px] border-[#bebebe50] outline-none w-full px-4 py-[0.4rem] rounded-md"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e: BaseSyntheticEvent) =>
                handleChange("pass", e.target.value)
              }
            />
          </div>
          <div>
            <button
              className="w-full py-2 rounded-md text-gray-50 bg-[#26a69a] transition-all ease-in-out hover:bg-[#10d19a]"
              formAction={login}
            >
              Login
            </button>
          </div>
          <hr />
          <div className="text-center text-sm">
            <span className="text-gray-600">Não tem uma conta?</span>{" "}
            <Link
              className="text-[#26a69a] hover:underline"
              href="/auth/register"
            >
              Crie aqui
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
