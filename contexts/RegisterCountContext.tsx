"use client"

import { createContext, useState, Dispatch, SetStateAction, FC, ReactNode, useEffect } from "react"

export interface RegisterCounterType {
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

export const RegisterCounterContext = createContext<RegisterCounterType | undefined>(undefined)

interface ContextProps {
  children: ReactNode
}

const RegisterCounterContextProvider: FC<ContextProps> = ({ children }) => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const savedCount = Number(localStorage.getItem("count")) || 0
    setCount(savedCount)
  }, [])

  return <RegisterCounterContext.Provider value={{ count, setCount }}>{children}</RegisterCounterContext.Provider>
}

export default RegisterCounterContextProvider
