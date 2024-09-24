import { ProfileOutlined, UserDeleteOutlined, UserOutlined } from "@ant-design/icons";

const menuItems = [
  {
    key: "Ativos",
    icon: <UserOutlined />,
    label: "Ativos",
  },
  {
    key: "Inativos",
    icon: <UserDeleteOutlined />,
    label: "Inativos",
  },
  {
    key: "Pensionistas",
    icon: <ProfileOutlined />,
    label: "Pensionistas",
  },
]