import Image from "next/image"

interface ProfileProps {
  profileImage: string
}

const ProfileButton = () => {
  return (
    <div className="relative">
      <div>
        <Image src={""} alt="" />
      </div>
    </div>
  )
}
