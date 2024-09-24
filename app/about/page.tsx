"use client"

// later: remove every antd component except from register page

import { Typography, Layout, List } from "antd"
import Link from "next/link"

import { GithubOutlined } from "@ant-design/icons"

const { Content } = Layout
const { Text, Title } = Typography

const About = () => {
  return (
    <section className="p-5 flex flex-col">
      <Title level={2} style={{ fontSize: "1.5rem", margin: "0" }}>
        Feito por Caio Programas
      </Title>
      <Content className="my-3">
        <Title
          level={3}
          style={{
            fontWeight: "bold",
            fontSize: "0.9rem",
            margin: "0.5rem 0 0 0",
          }}
        >
          Programas/Tecnologias utilizadas
        </Title>
        <List size="small">
          <List.Item>Logo: Inkscape</List.Item>
          <List.Item>UI: Ant Design</List.Item>
          <List.Item>Framework: Nenhum</List.Item>
          <List.Item>Library: React</List.Item>
        </List>
      </Content>
      <Link href={"/about/help"}>
        <Text className="text-[#26a69a]">
          Acesse as dicas e o tutorial aqui
        </Text>
      </Link>
      <Text style={{ margin: "0 0 0.5rem 0" }}>
        Baixe e modifique o código como quiser. Acesse o link do Repositório
        abaixo.
      </Text>
      <Content className="w-fit">
        <Link
          href="https://github.com/secretindex/aucad"
          target="_blank"
          className="flex flex-row justify-start items-center gap-2"
          style={{ width: "fit-content" }}
        >
          <GithubOutlined
            className="text-slate-950"
            style={{ fontSize: "1.7rem" }}
          />
          <Text>Repositório Oficial</Text>
        </Link>
      </Content>
    </section>
  )
}

export default About
