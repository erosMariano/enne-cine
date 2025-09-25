import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ImageExample from "../../public/diario-da-princesa.jpg"

interface Filmes {
  id: string;
  titulo: string;
  descricao: string;
  image: StaticImageData | string;
}

export default function Home() {
  const listFilme: Filmes[] = [
    {
      id: "o-diario-da-princesa",
      titulo: "O Diário da Princesa",
      descricao: "teste teste",
      image: ImageExample,
    },

    {
      id:  "teste2",
      titulo: "teste2",
      descricao: "teste2 teste2",
      image: ImageExample
    }
  ]

  return (
    <div className="w-full  flex flex-col p-4 gap-6">
      <header className="flex justify-between items-center gap-6 p-4 bg-[#111] border-2 border-[#333] rounded-[8px] ">
        <h1 className=" text-[#F5F5F5]">Enne cine</h1>
        <div className="flex gap-4">
          <Link href="/entrar" className="bg-[#333] py-1.5 px-3 border border-[#666] rounded cursor-pointer hover:bg-[#111] text-[12px]">Login</Link>
          <Link href="/cadastro" className="bg-[#333] py-1.5 px-3 border border-[#666] rounded cursor-pointer hover:bg-[#111] text-[12px]">Cadastre-se</Link>
        </div>
      </header>
      <div className="w-full h-screen flex flex-col p-4 gap-6 border-2 border-[#333] rounded-[8px] bg-[#111]">
        <div className="flex flex-col gap-2">
          <h2>Programação</h2>
          <div>
            <ul className="flex gap-4">
              {listFilme.map((filme) => (
                <li key={filme.id}>
                  <Link href={`/filme/${filme.id}`}>
                    <Image src={filme.image} className="w-[140px] border rounded-[8px]" alt=""/>
                    <h5 className="mt-2.5">{filme.titulo}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
