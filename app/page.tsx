"use client"

import { Typography, Button } from "antd"
import { useRouter } from "next/navigation"

const { Title, Text } = Typography

export default function Home() {
  const navigate = useRouter()

  const handleNavigate = () => {
    navigate.push("/cad/ativos")
  }

  return (
    <section
      className={`flex h-full flex-col gap-4 justify-center items-center`}
    >
      <header className="text-center">
        <Title level={2} style={{ fontSize: "3rem" }}>
          A melhor solução em auxiliar de <br />
          <div className="cadastro-home">Cadastro</div>{" "}
        </Title>
        <Text className="text-gray-600">
          Faça o checklist de seu cadastro e geramos a mensagem automaticamente!
        </Text>
      </header>
      <Button onClick={handleNavigate} color="primary">
        Comece Agora
      </Button>
    </section>
  )
}
