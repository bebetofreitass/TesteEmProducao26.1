'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  return (
    <div className="min-h-screen flex bg-[#07111f]">
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src="/images/login-bg.jpg"
          alt="Background"
          className="absolute w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-[#07111f]/80 backdrop-blur-[2px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25),transparent_50%)]" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold leading-tight text-white mb-6">
            Sistema Integrado de
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Gestão de Equipamentos
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
            Controle empréstimos, devoluções e ativos laboratoriais
            com uma experiência moderna, rápida e segura.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_40%)]">
        <div
          className="w-full max-w-md bg-[#0f1c2e]/90 backdrop-blur-xl
          rounded-3xl overflow-hidden border border-cyan-500/10
          shadow-[0_0_40px_rgba(34,211,238,0.08)]"
        >
          <div className="border-b border-cyan-500/10 px-8 py-8 text-center">
            <div
              className="w-16 h-16 mx-auto rounded-2xl
              bg-gradient-to-br from-cyan-400 to-blue-600
              flex items-center justify-center text-white text-2xl font-bold
              shadow-[0_0_20px_rgba(34,211,238,0.4)] mb-4"
            >
              S
            </div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              SIGE
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Sistema Integrado de Gestão de Equipamentos
            </p>
          </div>

          <div className="p-8">
            <h2 className="text-center text-2xl font-semibold text-white">
              Bem-vindo de volta
            </h2>

            <p className="text-center text-sm text-gray-400 mb-8 mt-1">
              Insira suas credenciais para continuar
            </p>

            <div className="mb-5">
              <label className="block text-sm font-medium text-cyan-200 mb-2">
                E-mail Institucional
              </label>

              <input
                type="email"
                placeholder="admin@unifor.edu.br"
                className="w-full px-4 py-3 rounded-xl
                bg-[#132238]
                border border-cyan-400/15
                text-white placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-cyan-400
                focus:border-cyan-400
                transition"
              />
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-cyan-200">
                  Senha
                </label>

                <Link
                  href="/secretaria/home"
                  className="text-xs text-cyan-300 hover:text-cyan-200 cursor-pointer transition"
                >
                  Suporte
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 rounded-xl
                  bg-[#132238]
                  border border-cyan-400/15
                  text-white placeholder:text-gray-500
                  focus:outline-none focus:ring-2 focus:ring-cyan-400
                  focus:border-cyan-400
                  transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-cyan-300 hover:text-cyan-200 transition"
                >
                  👁
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5 mb-6">
              <input
                type="checkbox"
                className="w-4 h-4 accent-cyan-400"
              />

              <span className="text-sm text-gray-400">
                Lembrar desta estação
              </span>
            </div>

            <button
              onClick={() => router.push('/professor/homeprofessor')}
              className="w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-cyan-400 to-blue-600
              hover:scale-[1.01]
              text-white transition-all duration-300
              shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              Entrar
            </button>
          </div>

          <div className="border-t border-cyan-500/10 bg-[#0b1727]/70 py-5 px-6 text-center">
            <div className="flex justify-center gap-5 mb-2 text-xs text-gray-400">
              <span className="hover:text-cyan-300 cursor-pointer transition">
                Suporte
              </span>

              <span className="hover:text-cyan-300 cursor-pointer transition">
                Privacidade
              </span>

              <span className="hover:text-cyan-300 cursor-pointer transition">
                Contato
              </span>
            </div>

            <div className="text-[10px] text-gray-500">
              © 2026 Sistema de Gestão de Equipamentos
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}