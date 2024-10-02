import RegisterPage from "@/components/RegisterPage"
import pensionerObj from "@/utils/objects/PensionerObj"
import { FC } from "react"

const Pensionistas: FC = () => {
  return (
    <>
      <RegisterPage
        title="Pensionistas"
        category="pensioner"
        documents={pensionerObj}
      />
    </>
  )
}

export default Pensionistas
