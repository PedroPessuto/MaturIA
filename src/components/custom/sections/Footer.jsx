import Link from "next/link"

export function Footer() {
  
  let currentYear = new Date().getFullYear()

  return (
    <footer className="w-full p-4 bg-gray-800">
      <div className="text-center text-white flex flex-col gap-4 items-center justify-center sm:flex-row">
        Todos os direitos reservados © {currentYear} MaturAI
        <Link href="/sobre" className="underline">
          <strong>Saiba Mais</strong>
        </Link>
      </div>
    </footer>
  )
}