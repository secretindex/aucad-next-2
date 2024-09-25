import RegisterPage from "@/components/RegisterPage"
import pensionerObj from "@/utils/objects/PensionerObj"
import { FC } from "react"

const Pensionistas: FC = () => {
  return (
    <>
      <RegisterPage title="Ativos" category="active" documents={pensionerObj} />
    </>
  )
}

export default Pensionistas
