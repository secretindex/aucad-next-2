import { UserMetadata } from "@supabase/supabase-js"
import { FC } from "react"

interface InfoProps {
  metadata: UserMetadata | undefined
}

const InfoProfile: FC<InfoProps> = ({ metadata }) => {
  return (
    <div className="flex flex-row justify-evenly gap-4">
      <div className="flex flex-col gap-2 w-full">
        <label className="block">First Name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          disabled={true}
          className="border-[1px] border-[#bebebe30] outline-none px-4 py-[0.3rem] rounded-md"
          value={metadata && metadata!.first_name}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="block">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          disabled={true}
          className="border-[1px] border-[#bebebe30] outline-none px-4 py-[0.3rem] rounded-md"
          value={metadata && metadata!.last_name}
        />
      </div>
    </div>
  )
}

export default InfoProfile
