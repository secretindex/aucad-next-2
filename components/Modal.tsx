import { FC } from "react"

interface ModalProps {
  message: string
  status: "ok" | "error" | "alert"
}

const Modal: FC<ModalProps> = ({ message, status }) => {
  return (
    <div className="flex flex-col bg-sky-300">
      <div className={`${status == "ok" ? "text-green-500" : ""}`}>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Modal
