import type { Metadata } from "next"

import { AntdRegistry } from "@ant-design/nextjs-registry"

import { ConfigProvider } from "antd"

import localFont from "next/font/local"
import "./globals.css"
import NoAntHeader from "@/components/header/HeaderNoAnt"
import CheckboxContextProvider from "@/contexts/CheckboxContext"
import { InactivesContextProvider } from "@/contexts/Inactivescontext"
import { PensionerContextProvider } from "@/contexts/PensionerContext"
import { SecondCheckboxContextProvider } from "@/contexts/SecondCheckboxContext"
import TextFieldContextProvider from "@/contexts/TextfieldContext"
import PasteTextContextProvider from "@/contexts/PasteTextContext"
import RegisterCounterContextProvider from "@/contexts/RegisterCountContext"

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
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
      >
        <RegisterCounterContextProvider>
          <CheckboxContextProvider>
            <InactivesContextProvider>
              <PensionerContextProvider>
                <SecondCheckboxContextProvider>
                  <TextFieldContextProvider>
                    <PasteTextContextProvider>
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
                          <main className="h-full flex flex-col">
                            <NoAntHeader />
                            {children}
                          </main>
                        </ConfigProvider>
                      </AntdRegistry>
                    </PasteTextContextProvider>
                  </TextFieldContextProvider>
                </SecondCheckboxContextProvider>
              </PensionerContextProvider>
            </InactivesContextProvider>
          </CheckboxContextProvider>
        </RegisterCounterContextProvider>
      </body>
    </html>
  )
}
