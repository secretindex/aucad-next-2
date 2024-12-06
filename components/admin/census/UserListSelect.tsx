import React, { useState } from "react"
import { Select } from "antd"

import { ReducedUser } from "@/app/profile/admin/[id]/control-panel/editar-censo/[censo_id]/page"

interface SelectProps {
  users: ReducedUser[] | undefined
}

const UserSelect: React.FC<SelectProps> = ({ users }) => {
  // working... Later authenticate selected users with census
  const [selectedItems, setSelectedItems] = useState<ReducedUser[]>([])

  const filteredOptions = users?.filter((o) => !selectedItems.includes(o));

  return (
    <Select
      mode="multiple"
      placeholder="Usuários"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{ width: "100%" }}
      options={filteredOptions?.map((user) => ({
        value: user.id,
        label: user.username,
      }))}
    />
  )
}

export default UserSelect
