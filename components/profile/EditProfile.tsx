import { BaseSyntheticEvent, FC, useState } from "react"

interface EditProps {
  nome: string
  sobrenome: string
}

const EditProfile: FC<EditProps> = ({ nome, sobrenome }) => {
  const [name, setName] = useState<string>(nome)
  const [lastName, setLastName] = useState<string>(sobrenome)

  return (
    <div className="flex flex-row gap-2 justify-evenly">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="first_name">Nome</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={name}
          onChange={(e: BaseSyntheticEvent) => setName(e.target.value)}
          className="border-[1px] border-[#bebebe30] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="last_name">Sobrenome</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={lastName}
          onChange={(e: BaseSyntheticEvent) => setLastName(e.target.value)}
          className="border-[1px] border-[#bebebe30] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
        />
      </div>
    </div>
  )
}

export default EditProfile
