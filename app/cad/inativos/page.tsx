import { FC } from "react"
import RegisterPage from "@/components/RegisterPage"
import inactiveDocuments from "@/utils/objects/InactiveObj"

const Inativos: FC = () => {
  return (
    <section className="h-full">
      <RegisterPage
        title="Inativos"
        category="inactive"
        documents={inactiveDocuments}
      />
    </section>
  )
}

export default Inativos
