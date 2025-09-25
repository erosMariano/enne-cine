"use client"

import React, { FormEvent } from 'react'
function Entrar() {
    //1 - pegar os dados
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formDataLogin = new FormData(event.currentTarget)
        const emailForm = formDataLogin.get("email") as String;
        const passwordForm = formDataLogin.get("password") as String;

        //2 - validar email
        const validation = {
            email: emailForm,
            senha: passwordForm
        }
        console.log("recebendo dados: ", validation)

        try {
            //4 - enviar para o banco 
            const response = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(validation)
            });

            const result = await response.json();
            //5 - validar possíveis erros

            if (result.message) {
                throw new Error(result.message)
            }
            localStorage.setItem("@tokenEnnecine", result.token);

        } catch (error) {
            console.error('Falha no fetch/login:', error);
            return;
        } finally {
            console.log('cheguei no finally');
        }
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex gap-8">
                <div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-1">
                        <h2>Que bom te ver de novo aqui na Enne cine</h2>
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
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Entrar