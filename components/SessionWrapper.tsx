"use client";

import { SessionProvider } from "next-auth/react"
import { FC, ReactNode } from "react"

interface SessionProps {
  children: ReactNode
}

const SessionWrapper: FC<SessionProps> = ({ children }) => {
  return (
  <SessionProvider>
    { children }
  </SessionProvider>
  )
}


export default SessionWrapper
