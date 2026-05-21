'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  ArrowRightLeft,
  Bell,
  Search,
  Undo2,
  Package,
  LayoutDashboard,
  Settings,
  Clock3,
  ShieldCheck,
  User,
  LogOut,
} from 'lucide-react'

export default function ItensPage() {
  const router = useRouter()

  const [openSettings, setOpenSettings] = useState(false)

  const handleLogout = () => {
    router.push('/')
  }

  const itens = [
    {
      nome: 'MacBook Pro M3',
      codigo: 'MAC-203',
      status: 'EM USO',
      prazo: 'Devolver em 2 dias',
      img: '/images/macbook.jpg',
    },
    {
      nome: 'Projetor Epson 4K',
      codigo: 'PROJ-104',
      status: 'EM USO',
      prazo: 'Devolver amanhã',
      img: '/images/projetor.jpg',
    },
    {
      nome: 'Chave Laboratório K11',
      codigo: 'KEY-011',
      status: 'EM USO',
      prazo: 'Devolver em 5 horas',
      img: '/images/chave.jpg',
    },
  ]

  return (
    <div className="min-h-screen flex bg-[#07111f] text-gray-100">
      <aside className="w-72 bg-[#0b1727] border-r border-cyan-500/10 flex flex-col justify-between">
        <div>
          <div className="p-5 flex justify-center border-b border-cyan-500/10">
            <Image
              src="/images/logo-sige.png"
              alt="SIGE Logo"
              width={120}
              height={40}
              className="object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            />
          </div>

          <div className="p-5">
            <Link href="/professor/emprestimoprofessor">
              <button
                className="w-full py-3 rounded-2xl
                bg-gradient-to-r from-cyan-400 to-blue-600
                text-white font-semibold
                shadow-[0_0_25px_rgba(34,211,238,0.35)]
                hover:scale-[1.02]
                transition-all"
              >
                + Novo Empréstimo
              </button>
            </Link>
          </div>

          <nav className="px-4 space-y-2">
            <Link
              href="/professor/homeprofessor"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition
              text-gray-300 hover:text-cyan-300"
            >
              <LayoutDashboard size={18} />
              Painel
            </Link>

            <Link
              href="/professor/emprestimoprofessor"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition
              text-gray-300 hover:text-cyan-300"
            >
              <ArrowRightLeft size={18} />
              Empréstimo
            </Link>

            <Link
              href="/professor/devolucao"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition
              text-gray-300 hover:text-cyan-300"
            >
              <Undo2 size={18} />
              Devolução
            </Link>

            <Link
              href="/professor/itens"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
            >
              <Package size={18} />
              Itens
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
        <header className="h-20 border-b border-cyan-500/10 bg-[#0b1727]/70 backdrop-blur-xl flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Itens Alugados
            </h1>

            <p className="text-xs text-cyan-300/70 mt-1">
              Controle de equipamentos em uso
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div
              className="hidden md:flex items-center
              bg-[#132238]/80 backdrop-blur-md
              border border-cyan-400/10
              rounded-2xl px-4 py-2.5 w-80
              shadow-[0_0_20px_rgba(34,211,238,0.05)]
              focus-within:border-cyan-400/30
              focus-within:shadow-[0_0_25px_rgba(34,211,238,0.12)]
              transition-all"
            >
              <Search
                size={16}
                className="text-cyan-300"
              />

              <input
                placeholder="Buscar equipamento..."
                className="bg-transparent outline-none ml-3 text-sm w-full
                text-gray-200 placeholder:text-gray-500"
              />
            </div>

            <button
              className="relative w-11 h-11 rounded-2xl
              bg-[#132238]/80 border border-cyan-400/10
              flex items-center justify-center
              hover:bg-cyan-500/10 hover:border-cyan-400/20
              transition-all duration-300
              shadow-[0_0_20px_rgba(34,211,238,0.05)]"
            >
              <Bell
                size={18}
                className="text-cyan-300"
              />

              <span
                className="absolute top-2 right-2
                w-2 h-2 rounded-full bg-cyan-400
                shadow-[0_0_10px_rgba(34,211,238,0.9)]"
              />
            </button>

            <div className="relative">
              <button
                onClick={() => setOpenSettings(!openSettings)}
                className="w-11 h-11 rounded-2xl
                bg-[#132238]/80 border border-cyan-400/10
                flex items-center justify-center
                hover:bg-cyan-500/10 hover:border-cyan-400/20
                transition-all duration-300
                shadow-[0_0_20px_rgba(34,211,238,0.05)]"
              >
                <Settings
                  size={18}
                  className="text-cyan-300"
                />
              </button>

              {openSettings && (
                <div
                  className="absolute right-0 top-14 w-60
                  bg-[#0f1c2e]/95 backdrop-blur-xl
                  border border-cyan-400/10
                  rounded-3xl overflow-hidden
                  shadow-[0_0_35px_rgba(34,211,238,0.12)]
                  z-50"
                >
                  <Link
                    href="/perfil"
                    className="flex items-center gap-3 px-5 py-4
                    text-gray-300 hover:bg-cyan-500/10
                    hover:text-cyan-300 transition"
                  >
                    <User size={18} />
                    Perfil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-4
                    text-red-300 hover:bg-red-500/10
                    transition"
                  >
                    <LogOut size={18} />
                    Sair da Conta
                  </button>
                </div>
              )}
            </div>

            <div
              className="relative w-11 h-11 rounded-2xl
              bg-gradient-to-br from-cyan-400 to-blue-600
              flex items-center justify-center
              text-sm font-bold text-white
              shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            >
              P

              <div
                className="absolute -bottom-1 -right-1
                w-3 h-3 rounded-full bg-emerald-400
                border-2 border-[#07111f]"
              />
            </div>
          </div>
        </header>

        <div className="p-8 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%)] min-h-[calc(100vh-80px)]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Itens Atualmente Alugados
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Visualize todos os equipamentos atualmente em sua posse.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl p-6
              shadow-[0_0_25px_rgba(34,211,238,0.08)]"
            >
              <p className="text-xs text-gray-400 mb-2">
                ITENS EM USO
              </p>

              <h2 className="text-3xl font-bold text-cyan-300">
                3
              </h2>
            </div>

            <div
              className="bg-[#0f1c2e]
              border border-blue-500/10
              rounded-3xl p-6
              shadow-[0_0_25px_rgba(59,130,246,0.08)]"
            >
              <p className="text-xs text-gray-400 mb-2">
                DEVOLUÇÕES HOJE
              </p>

              <h2 className="text-3xl font-bold text-blue-400">
                1
              </h2>
            </div>

            <div
              className="bg-[#0f1c2e]
              border border-emerald-500/10
              rounded-3xl p-6
              shadow-[0_0_25px_rgba(16,185,129,0.08)]"
            >
              <p className="text-xs text-gray-400 mb-2">
                STATUS
              </p>

              <h2 className="text-xl font-semibold text-emerald-400">
                Regular
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {itens.map((item, index) => (
              <div
                key={index}
                className="bg-[#0f1c2e]
                border border-cyan-500/10
                rounded-3xl overflow-hidden
                shadow-[0_0_30px_rgba(34,211,238,0.05)]
                hover:scale-[1.02]
                transition-all duration-300"
              >
                <div className="relative">
                  <Image
                    src={item.img}
                    alt={item.nome}
                    width={500}
                    height={300}
                    className="w-full h-52 object-cover"
                  />

                  <div
                    className="absolute top-4 right-4
                    bg-emerald-500/90 text-white
                    px-3 py-1 rounded-full text-xs font-semibold
                    shadow-lg"
                  >
                    {item.status}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {item.nome}
                      </h2>

                      <p className="text-cyan-300/60 text-sm mt-1">
                        #{item.codigo}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock3
                        size={16}
                        className="text-cyan-300"
                      />

                      {item.prazo}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-emerald-300">
                      <ShieldCheck size={16} />
                      Equipamento em conformidade
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-3 rounded-2xl
                      bg-cyan-500/10 border border-cyan-400/20
                      text-cyan-300 font-medium
                      hover:bg-cyan-500/20 transition"
                    >
                      Ver Detalhes
                    </button>

                    <button
                      className="flex-1 py-3 rounded-2xl
                      bg-gradient-to-r from-cyan-400 to-blue-600
                      text-white font-semibold
                      shadow-[0_0_20px_rgba(34,211,238,0.25)]
                      hover:scale-[1.02]
                      transition-all"
                    >
                      Devolver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}