'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bell,
  Search,
  Settings,
  User,
  Calendar,
  BadgeCheck,
  Package,
  ClipboardCheck,
  Clock3,
  LogOut,
} from 'lucide-react'

export default function DetalheEmprestimoPage() {
  const [openMenu, setOpenMenu] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const itens = [
    {
      nome: 'Projetor Epson 4K',
      codigo: 'PROJ-0112',
      status: 'ENTREGUE',
      img: '/images/projetor.jpg',
    },
    {
      nome: 'Controle HDMI',
      codigo: 'CTRL-020',
      status: 'ENTREGUE',
      img: '/images/controle.jpg',
    },
    {
      nome: 'Chave Laboratório P16',
      codigo: 'KEY-P16',
      status: 'PENDENTE',
      img: '/images/chave.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <header className="h-20 border-b border-cyan-500/10 bg-[#0b1727]/70 backdrop-blur-xl flex items-center justify-between px-8">
        <div>
          <h1 className="text-xl font-semibold text-white">
            Detalhes do Empréstimo
          </h1>

          <p className="text-xs text-cyan-300/70 mt-1">
            Secretaria • Gestão em tempo real
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center bg-[#132238]/80 border border-cyan-400/10 rounded-2xl px-4 py-2.5 w-80 backdrop-blur-md">
            <Search size={16} className="text-cyan-300" />

            <input
              placeholder="Buscar equipamento..."
              className="bg-transparent outline-none ml-3 text-sm w-full text-white placeholder:text-gray-500"
            />
          </div>

          <button className="relative w-11 h-11 rounded-2xl bg-[#132238]/80 border border-cyan-400/10 flex items-center justify-center hover:bg-cyan-500/10 transition">
            <Bell size={18} className="text-cyan-300" />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="w-11 h-11 rounded-2xl bg-[#132238]/80 border border-cyan-400/10 flex items-center justify-center hover:bg-cyan-500/10 transition"
            >
              <Settings size={18} className="text-cyan-300" />
            </button>

            {openMenu && (
              <div className="absolute right-0 top-14 w-60 bg-[#0f1c2e]/95 border border-cyan-400/10 rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(34,211,238,0.12)] z-50">
                <Link
                  href="/perfil"
                  className="flex items-center gap-3 px-5 py-4 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <User size={18} />
                  Perfil
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 px-5 py-4 text-red-300 hover:bg-red-500/10 border-t border-cyan-500/10"
                >
                  <LogOut size={18} />
                  Sair da conta
                </Link>
              </div>
            )}
          </div>

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            <User size={20} className="text-white" />
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div
              className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Dados do Professor
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Informações do responsável pelo empréstimo
                  </p>
                </div>

                <div
                  className="w-20 h-20 rounded-2xl
                  bg-gradient-to-br from-cyan-400 to-blue-600
                  flex items-center justify-center
                  shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                >
                  <User size={36} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div
                  className="bg-[#132238]
                  border border-cyan-400/10
                  rounded-2xl p-5"
                >
                  <div className="text-xs text-cyan-300/70 mb-2">
                    PROFESSOR
                  </div>

                  <div className="text-lg font-semibold">
                    Prof. Ricardo Mendes
                  </div>
                </div>

                <div
                  className="bg-[#132238]
                  border border-cyan-400/10
                  rounded-2xl p-5"
                >
                  <div className="text-xs text-cyan-300/70 mb-2">
                    MATRÍCULA
                  </div>

                  <div className="text-lg font-semibold">
                    202600182
                  </div>
                </div>

                <div
                  className="bg-[#132238]
                  border border-cyan-400/10
                  rounded-2xl p-5"
                >
                  <div className="text-xs text-cyan-300/70 mb-2">
                    DEPARTAMENTO
                  </div>

                  <div className="text-lg font-semibold">
                    Ciência da Computação
                  </div>
                </div>

                <div
                  className="bg-[#132238]
                  border border-cyan-400/10
                  rounded-2xl p-5"
                >
                  <div className="text-xs text-cyan-300/70 mb-2">
                    CONTATO
                  </div>

                  <div className="text-lg font-semibold">
                    (85) 99999-9999
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-5 border-b border-cyan-500/10">
                <h2 className="text-2xl font-semibold">
                  Itens Emprestados
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Equipamentos vinculados ao empréstimo
                </p>
              </div>

              <div>
                {itens.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between
                    px-6 py-5 border-b border-cyan-500/5
                    hover:bg-cyan-500/5 transition"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.img}
                        alt={item.nome}
                        width={60}
                        height={60}
                        className="rounded-2xl object-cover
                        border border-cyan-400/10"
                      />

                      <div>
                        <div className="font-semibold text-lg">
                          {item.nome}
                        </div>

                        <div className="text-sm text-cyan-300/60">
                          #{item.codigo}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold border
                        ${
                          item.status === 'ENTREGUE'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20'
                            : ''
                        }
                        ${
                          item.status === 'PENDENTE'
                            ? 'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
                            : ''
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="bg-gradient-to-br
              from-cyan-500/20 to-blue-600/20
              border border-cyan-400/20
              rounded-3xl p-6
              shadow-[0_0_40px_rgba(34,211,238,0.15)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl
                  bg-white/10 flex items-center justify-center"
                >
                  <ClipboardCheck className="text-cyan-200" />
                </div>

                <span
                  className="px-4 py-1 rounded-full
                  text-xs bg-emerald-500/10
                  text-emerald-300 border border-emerald-400/20"
                >
                  ATIVO
                </span>
              </div>

              <h2 className="text-2xl font-semibold mb-2">
                Empréstimo Ativo
              </h2>

              <p className="text-sm text-cyan-100/80">
                Equipamentos entregues e vinculados ao professor.
              </p>
            </div>

            <div
              className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-6">
                Informações
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl
                    bg-cyan-500/10
                    flex items-center justify-center"
                  >
                    <Calendar className="text-cyan-300" />
                  </div>

                  <div>
                    <div className="text-xs text-cyan-300/70">
                      DATA DO EMPRÉSTIMO
                    </div>

                    <div className="font-medium">
                      22/05/2026 - 09:30
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl
                    bg-blue-500/10
                    flex items-center justify-center"
                  >
                    <Clock3 className="text-blue-300" />
                  </div>

                  <div>
                    <div className="text-xs text-cyan-300/70">
                      PREVISÃO DE DEVOLUÇÃO
                    </div>

                    <div className="font-medium">
                      23/05/2026 - 18:00
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl
                    bg-emerald-500/10
                    flex items-center justify-center"
                  >
                    <BadgeCheck className="text-emerald-300" />
                  </div>

                  <div>
                    <div className="text-xs text-cyan-300/70">
                      RESPONSÁVEL PELA ENTREGA
                    </div>

                    <div className="font-medium">
                      Secretaria Central
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl
                    bg-yellow-500/10
                    flex items-center justify-center"
                  >
                    <Package className="text-yellow-300" />
                  </div>

                  <div>
                    <div className="text-xs text-cyan-300/70">
                      TOTAL DE ITENS
                    </div>

                    <div className="font-medium">
                      3 Equipamentos
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                className="w-full py-4 rounded-2xl
                bg-gradient-to-r from-cyan-400 to-blue-600
                font-semibold shadow-[0_0_25px_rgba(34,211,238,0.3)]
                hover:scale-[1.02] transition-all"
              >
                Confirmar Entrega
              </button>

              <button
                className="w-full py-4 rounded-2xl
                border border-red-500/20
                text-red-300 hover:bg-red-500/10 transition"
              >
                Cancelar Empréstimo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}