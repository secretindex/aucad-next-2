"use client"

import { Layout, Menu, Typography, Image } from "antd"
import {
  QuestionCircleOutlined,
  ProfileOutlined,
  UserDeleteOutlined,
  UserOutlined,
  LoginOutlined
} from "@ant-design/icons"
import Link from "next/link"

import "@/components/styles/menu.css"

import { createClient } from '@/lib/supabase/ssr/ssrClient'

const { Title } = Typography

const menuItemsSecond = [
  {
    key: "Ativos",
    icon: <UserOutlined />,
    label: (
      <Link href="/cad/ativos" className="text-inherit">
        Ativos
      </Link>
    ),
  },
  {
    key: "Inativos",
    icon: <UserDeleteOutlined />,
    label: (
      <Link href="/cad/inativos" className="text-inherit">
        Inativos
      </Link>
    ),
  },
  {
    key: "Pensionistas",
    icon: <ProfileOutlined />,
    label: (
      <Link href="/cad/pensionistas" className="text-inherit">
        Pensionistas
      </Link>
    ),
  },
]

const menuItemsOne = [
  {
    key: "Menu",
    label: (
      <Title
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "transparent",
          color: "inherit",
        }}
        className="flex items-center"
        level={1}
      >
        <Link
          href="/"
          style={{ backgroundColor: "transparent", color: "inherit" }}
          className="flex items-center"
        >
          <Image
            src={"/assets/aucad.svg"}
            alt="Aucad Logo"
            style={{ width: "100px" }}
            preview={false}
          />
        </Link>
      </Title>
    ),
  },
]

const menuThird = [
  {
    key: "about",
    icon: <QuestionCircleOutlined />,
    label: (
      <Link href="/about" className="text-inherit">
        Sobre
      </Link>
    ),
  },
  {
    key: "Login",
    icon: <LoginOutlined />,
    label: (
      <Link href={"/auth/login"} className="text-inherit">
        Login
      </Link>
    )
  }
]

export default async function HeaderMenu() {
  const supabase = createClient()
  const status = "unauthenticated";
  const signOut = () => {
    console.log("signed out")
  }

  const { data, error } = await supabase.auth.getUser()

  const menuLogged = [
    {
      key: "about",
      icon: <QuestionCircleOutlined />,
      label: (
        <Link href="/about" className="text-inherit">
          Sobre
        </Link>
      ),
    },
    {
      key: "Logout",
      label: (
        <Link href={"/"} onClick={() => signOut()} className="text-inherit">
          <LoginOutlined />
        </Link>
      )
    },
    {
      key: "Profile",
      label: (
        <div className="flex justify-center items-center gap-2">
          <Image alt="profile image" preview={false} width={28} height={28} className="rounded-full" src={"oi" as string} />
        </div>
      )
    }
  ]

  return (
    <Layout>
      <header className="w-full flex flex-row justify-between p-0 m-0">
        <Menu
          mode="horizontal"
          selectedKeys={[]}
          className="flex flex-grow justify-start items-center w-auto disable-underscore"
          items={menuItemsOne}
        />
        <Menu
          mode="horizontal"
          selectedKeys={[]}
          className="border-0 w-auto flex flex-grow justify-center"
          items={menuItemsSecond}
        />
        {
          error || !data?.user ? (
            <Menu
              mode="horizontal"
              selectedKeys={[]}
              className="border-0 flex flex-grow w-auto justify-end"
              items={menuThird}
            />
          ) : (
            <>
              <Menu
                mode="horizontal"
                selectedKeys={[]}
                className="border-0 flex flex-grow w-auto items-center justify-end"
                items={menuLogged}
              />
            </>
          )
        }

      </header>
    </Layout>
  )
}
