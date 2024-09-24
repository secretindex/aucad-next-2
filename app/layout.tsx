import type { Metadata } from "next"

import HeaderMenu from "@/components/Menu"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import SessionWrapper from "@/components/SessionWrapper"

import { ConfigProvider } from "antd"

import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Aucad-Next",
  description: "Full fledged application for Recad",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider
            componentSize="large"
            theme={{
              token: {
                colorPrimary: "#26a69a",
                fontFamily: "sans-serif",
              },
            }}
          >
            <SessionWrapper>
              <main className="h-full flex flex-col">
                <HeaderMenu />
                {children}
              </main>
            </SessionWrapper>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
