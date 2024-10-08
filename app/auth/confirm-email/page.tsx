import Link from "next/link"

export default function ConfirmEmail() {
  return (
    <section className="h-full flex flex-col justify-center items-center">
      <div className="rounded-md p-2 shadow-md border-[1px] border-[#bebebe30]">
        <h2>E-mail confirmado!</h2>
        <p>Agora você pode retornar para a página de <Link className="text-[#208e55] hover:text-[#2ba264] hover:underline" href={"/auth/login"}>login</Link>.</p>
      </div>
    </section>
  )
}
