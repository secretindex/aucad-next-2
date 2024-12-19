import RegisterPage from "@/components/RegisterPage"
import { FC } from "react"
import activesDocument from "@/utils/objects/ActivesObj"

const Ativos: FC = () => {
  return (
    <section className="h-full">
      <RegisterPage
        title="Ativos"
        category="active"
        documents={activesDocument}
      />
    </section>
  )
}

export default Ativos
