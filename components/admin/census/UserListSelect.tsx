import React, { Dispatch, SetStateAction, useState } from "react"
import { Select } from "antd"

import { ReducedUser } from "@/app/profile/admin/[id]/control-panel/editar-censo/[censo_id]/page"

interface SelectProps {
  users: ReducedUser[] | undefined
  setCensusUsers: Dispatch<SetStateAction<ReducedUser[]>>
}

const UserSelect: React.FC<SelectProps> = ({ users, setCensusUsers }) => {
  // working... Later authenticate selected users with census
  const [selectedItems, setSelectedItems] = useState<ReducedUser[]>([])

  const handleSelectChange = (e: any) => {
    console.log(e)
    setSelectedItems(e)
    setCensusUsers(e)
  }

  const filteredOptions = users?.filter((o) => !selectedItems.includes(o));

  return (
    <Select
      mode="multiple"
      placeholder="Usuários"
      value={selectedItems}
      onChange={handleSelectChange}
      style={{ width: "100%" }}
      options={filteredOptions?.map((user) => ({
        value: user.id,
        label: user.username,
      }))}
    />
  )
}

export default UserSelect
