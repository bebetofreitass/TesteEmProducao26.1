'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  User,
  LogOut,
} from 'lucide-react'

export default function DevolucoesPage() {
  const router = useRouter()

  const [openSettings, setOpenSettings] = useState(false)

  const formatDate = (date = new Date()) => {
    const d = String(date.getDate()).padStart(2, '0')
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const y = date.getFullYear()

    const h = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')

    return `${d}/${m}/${y} ${h}:${min}`
  }

  const handleLogout = () => {
    router.push('/')
  }

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
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
            >
              <Undo2 size={18} />
              Devolução
            </Link>

            <Link
              href="/professor/itens"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
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
              Histórico de Devoluções
            </h1>

            <p className="text-xs text-cyan-300/70 mt-1">
              Controle de equipamentos devolvidos
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
              Histórico de Devoluções
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Visualize todos os seus equipamentos devolvidos.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div
              className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl p-6
              shadow-[0_0_25px_rgba(34,211,238,0.08)]
              hover:scale-[1.02]
              transition-all"
            >
              <p className="text-xs text-gray-400 mb-2">
                TOTAL DE DEVOLUÇÕES
              </p>

              <h2 className="text-3xl font-bold text-cyan-300">
                128
              </h2>
            </div>

            <div
              className="bg-[#0f1c2e]
              border border-blue-500/10
              rounded-3xl p-6
              shadow-[0_0_25px_rgba(59,130,246,0.08)]
              hover:scale-[1.02]
              transition-all"
            >
              <p className="text-xs text-gray-400 mb-2">
                ITENS ESTE MÊS
              </p>

              <h2 className="text-3xl font-bold text-blue-400">
                14
              </h2>
            </div>

            <div
              className="bg-[#0f1c2e]
              border border-emerald-500/10
              rounded-3xl p-6
              shadow-[0_0_25px_rgba(16,185,129,0.08)]
              hover:scale-[1.02]
              transition-all"
            >
              <p className="text-xs text-gray-400 mb-2">
                CONDIÇÃO MÉDIA
              </p>

              <h2 className="text-xl font-semibold text-emerald-400">
                Excelente
              </h2>
            </div>
          </div>

          <div
            className="bg-[#0f1c2e]/80
            backdrop-blur-md
            border border-cyan-500/10
            rounded-3xl
            p-4 flex gap-3 mb-6 shadow-lg"
          >
            <button
              className="border border-cyan-400/20
              bg-cyan-500/5 hover:bg-cyan-500/10
              px-4 py-2 rounded-xl text-sm text-cyan-200 transition"
            >
              Tipo de Equipamento
            </button>

            <button
              className="border border-cyan-400/20
              bg-cyan-500/5 hover:bg-cyan-500/10
              px-4 py-2 rounded-xl text-sm text-cyan-200 transition"
            >
              Filtros Avançados
            </button>

            <button
              className="border border-cyan-400/20
              bg-cyan-500/5 hover:bg-cyan-500/10
              px-4 py-2 rounded-xl text-sm text-cyan-200 transition"
            >
              Período
            </button>
          </div>

          <div
            className="bg-[#0f1c2e]/90
            border border-cyan-500/10
            rounded-3xl overflow-hidden shadow-2xl"
          >
            <div
              className="grid grid-cols-5
              text-xs text-cyan-300/70
              px-6 py-4 border-b border-cyan-500/10 bg-[#132238]"
            >
              <div>ITEM</div>
              <div>DATA</div>
              <div>CONDIÇÃO</div>
              <div>RESPONSÁVEL</div>
              <div className="text-right">RECIBO</div>
            </div>

            {[
              {
                nome: 'Chave Laboratório D88',
                data: new Date('2026-04-12T10:30:00'),
                status: 'PERFEITO',
                cor: 'green',
                user: 'Ana Ferreira',
                img: '/images/chave.jpg',
              },
              {
                nome: 'Projetor Sony 4K',
                data: new Date('2026-04-08T09:15:00'),
                status: 'DESGASTE',
                cor: 'yellow',
                user: 'Carlos Mendes',
                img: '/images/projetor.jpg',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-5 items-center
                px-6 py-5 border-b border-cyan-500/5
                hover:bg-cyan-500/5 transition"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.img}
                    alt=""
                    width={42}
                    height={42}
                    className="rounded-xl object-cover border border-cyan-400/20"
                  />

                  <span className="text-sm font-medium text-white">
                    {item.nome}
                  </span>
                </div>

                <div className="text-sm text-gray-300">
                  {formatDate(item.data)}
                </div>

                <div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold border
                    ${
                      item.cor === 'green'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20'
                        : ''
                    }
                    ${
                      item.cor === 'yellow'
                        ? 'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
                        : ''
                    }
                  `}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-sm text-gray-300">
                  {item.user}
                </div>

                <div className="text-right">
                  <button className="text-cyan-300 text-sm hover:text-cyan-200 hover:underline transition">
                    Ver comprovante
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}