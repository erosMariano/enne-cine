import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center"> 
      <div className="flex flex-col justify-center items-center gap-6 p-10 bg-[#111] border-2 border-[#333] rounded-[8px] ">
        <h1 className=" text-[#F5F5F5]">Boas vindas ao Enne cine</h1>

        <div className="flex gap-4">
          <Link href="/entrar" className="bg-[#333] py-1.5 px-3 border border-[#666] rounded cursor-pointer hover:bg-[#111] text-[12px]">Login</Link>
          <Link href="/cadastro" className="bg-[#333] py-1.5 px-3 border border-[#666] rounded cursor-pointer hover:bg-[#111] text-[12px]">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}
