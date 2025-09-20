"use client"
import React, { FormEvent } from 'react'
// import { useForm } from 'react-hook-form'

function Cadastro() {
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        // 1 - pegar campos do formulario atraves do nam
        const nameForm = formData.get("name") as String;
        const emailForm = formData.get("email") as String;
        const passwordForm = formData.get("password") as String;

        // 2 - validar campos se não estão vazios, se estiverem vazios, retornar
        // if (nameForm?.toString().length <= 4) {
        //     console.log("Preencha o nome completo")
        //     return
        // }
        // if (!emailForm?.toString().includes("@") && !emailForm?.toString().includes(".com")) {
        //     console.log("e-mail inválido")
        //     return
        // }
        // if (passwordForm?.toString().length <= 4) {
        //     console.log("Senha incorreta")
        //     return
        // }

        const payload = {
            nome: nameForm,
            email: emailForm,
            senha: passwordForm
        };

        try {
            const response = await fetch('/api/auth/register', {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const result = await response.json()
            
            if (result.message) {
                throw new Error(result.message)
            }

        } catch (error) {
            console.log(error)
            return
        } finally {
            console.log("cheguei no finally")
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex gap-8">
                <div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-1">
                        <h2>Cadastre-se na Enne cine</h2>
                        <label htmlFor="name" className="flex flex-col gap-3">
                            <input
                                id="name" name="name"
                                type="text" placeholder="Nome completo"
                                className="bg-[#111] px-3 py-4 rounded-[4px] text-[12px]" />
                        </label>
                        <label htmlFor="email" className="flex flex-col gap-3">
                            <input id="email" name="email"
                                type="text" placeholder="E-mail"
                                className="bg-[#111] px-3 py-4 rounded-[4px] text-[12px]" />
                        </label>
                        <label htmlFor="password" className="flex flex-col gap-3">
                            <input id="password" name="password"
                                type="password" placeholder="Senha"
                                className="bg-[#111] px-3 py-4 rounded-[4px] text-[12px]" />
                        </label>
                        <button
                            className=" bg-[#111] rounded-8 py-3 rounded-[4px] text-[12px] 
                            text-[#666] cursor-pointer transition-all 
                            hover:bg-[#1c1c1c] 
                            hover:text-[#fff]">
                            Finalizar cadastro
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cadastro