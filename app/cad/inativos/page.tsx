import { FC } from "react"
import RegisterPage from "@/components/RegisterPage"
import inactiveDocuments from "@/utils/objects/InactiveObj"

const Inativos: FC = () => {
  return (
    <>
      <RegisterPage
        title="Inativos"
        category="inactive"
        documents={inactiveDocuments}
      />
    </>
  )
}

export default Inativos
