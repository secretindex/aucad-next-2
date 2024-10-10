import { FC } from "react"

interface InfoProps {
  user: any | undefined
}

const InfoProfile: FC<InfoProps> = ({ user }) => {
  return (
    <div className="flex flex-row justify-evenly gap-4">
      <div className="flex flex-col gap-2 w-full">
        <label className="block">Nome</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          disabled={true}
          className="border-[1px] border-[#bebebe30] outline-none px-4 py-[0.3rem] rounded-md"
          value={user && user!.first_name}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="block">Sobrenome</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          disabled={true}
          className="border-[1px] border-[#bebebe30] outline-none px-4 py-[0.3rem] rounded-md"
          value={user && user!.last_name}
        />
      </div>
    </div>
  )
}

export default InfoProfile
