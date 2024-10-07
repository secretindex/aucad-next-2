import RegisterPage from "@/components/RegisterPage"
import pensionerObj from "@/utils/objects/PensionerObj"
import { FC } from "react"

const Pensionistas: FC = () => {
  return (
    <section className="h-full">
      <RegisterPage
        title="Pensionistas"
        category="pensioner"
        documents={pensionerObj}
      />
    </section>
  )
}

export default Pensionistas
