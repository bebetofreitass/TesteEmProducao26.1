'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bell,
  Search,
  Settings,
  Undo2,
  LayoutDashboard,
  ArrowRightLeft,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  ScanLine,
  QrCode,
  User,
  LogOut,
} from 'lucide-react'

export default function SecretariaPage() {
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

  const emprestimos = [
    {
      item: 'Projetor Epson 4K',
      codigo: 'PROJ-0112',
      professor: 'Prof. Ricardo',
      horario: '09:30',
      status: 'EM ANDAMENTO',
      img: '/images/projetor.jpg',
    },
    {
      item: 'Chave Laboratório P16',
      codigo: 'KEY-P16',
      professor: 'Prof. Ana',
      horario: '10:15',
      status: 'PENDENTE',
      img: '/images/chave.jpg',
    },
    {
      item: 'Notebook Dell XPS',
      codigo: 'NOTE-022',
      professor: 'Prof. Carlos',
      horario: '11:00',
      status: 'FINALIZADO',
      img: '/images/notebook.jpg',
    },
  ]

  const handleQRCode = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
      })

      stream.getTracks().forEach(track => track.stop())

      window.location.href = '/scanner-qrcode'
    } catch (error) {
      alert('Não foi possível acessar a câmera.')
    }
  }

  return (
    <div className="min-h-screen flex bg-[#07111f] text-white">
      <aside className="w-72 bg-[#0b1727] border-r border-cyan-500/10 flex flex-col justify-between">
        <div>
          <div className="p-6 flex flex-col items-center border-b border-cyan-500/10">
            <Image
              src="/images/logo-sige.png"
              alt="SIGE Logo"
              width={90}
              height={90}
              className="rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.25)]"
            />

            <h2 className="mt-5 text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Painel da Secretaria
            </h2>

            <p className="text-sm text-cyan-300/70 mt-1">
              Gestão de Equipamentos
            </p>
          </div>

          <nav className="px-4 py-5 space-y-2">
            <Link
              href="/secretaria/home"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
            >
              <LayoutDashboard size={18} />
              Painel Principal
            </Link>

            <Link
              href="/secretaria/emprestimos"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <ArrowRightLeft size={18} />
              Equipamentos Emprestados
            </Link>

            <Link
              href="/secretaria/devolucoes"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <Undo2 size={18} />
              Devoluções
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
        <header className="h-20 border-b border-cyan-500/10 bg-[#0b1727]/70 backdrop-blur-xl flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Painel da Secretaria
            </h1>

            <p className="text-xs text-cyan-300/70 mt-1">
              Gestão inteligente de equipamentos
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

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
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

              {openMenu && (
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

                  <Link
                    href="/"
                    className="flex items-center gap-3 px-5 py-4
                    text-red-300 hover:bg-red-500/10
                    transition"
                  >
                    <LogOut size={18} />
                    Sair da Conta
                  </Link>
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
              S

              <div
                className="absolute -bottom-1 -right-1
                w-3 h-3 rounded-full bg-emerald-400
                border-2 border-[#07111f]"
              />
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Central de Entregas
            </h1>

            <p className="text-gray-400 mt-2">
              Gerencie empréstimos, entregas e devoluções de equipamentos.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl p-6
              shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl
                  bg-emerald-500/10
                  flex items-center justify-center"
                >
                  <CheckCircle2 className="text-emerald-400" />
                </div>

                <span
                  className="px-4 py-1 rounded-full
                  text-xs bg-emerald-500/10
                  text-emerald-300 border border-emerald-400/20"
                >
                  Disponível
                </span>
              </div>

              <h2 className="text-gray-300 text-lg mb-2">
                Equipamentos Disponíveis
              </h2>

              <div className="text-5xl font-bold text-white">
                142
              </div>
            </div>

            <div
              className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl p-6
              shadow-[0_0_30px_rgba(59,130,246,0.08)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl
                  bg-yellow-500/10
                  flex items-center justify-center"
                >
                  <Clock3 className="text-yellow-300" />
                </div>

                <span
                  className="px-4 py-1 rounded-full
                  text-xs bg-yellow-500/10
                  text-yellow-300 border border-yellow-400/20"
                >
                  Em uso
                </span>
              </div>

              <h2 className="text-gray-300 text-lg mb-2">
                Empréstimos Ativos
              </h2>

              <div className="text-5xl font-bold text-white">
                84
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20
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
                  text-xs bg-cyan-400/10
                  text-cyan-200 border border-cyan-400/20"
                >
                  Hoje
                </span>
              </div>

              <h2 className="text-cyan-100 text-lg mb-2">
                Entregas do Dia
              </h2>

              <div className="text-5xl font-bold text-white">
                23
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div
              className="col-span-2 bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl overflow-hidden shadow-2xl"
            >
              <div
                className="flex items-center justify-between
                px-6 py-5 border-b border-cyan-500/10"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Empréstimos Recentes
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Controle de entregas realizadas pela secretaria
                  </p>
                </div>

                <button className="text-cyan-300 hover:text-cyan-200 transition">
                  Ver tudo
                </button>
              </div>

              <div
                className="grid grid-cols-5 px-6 py-4
                bg-[#132238] text-cyan-300/70 text-sm"
              >
                <div>ITEM</div>
                <div>PROFESSOR</div>
                <div>HORÁRIO</div>
                <div>STATUS</div>
                <div className="text-right">AÇÃO</div>
              </div>

              {emprestimos.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 items-center
                  px-6 py-5 border-b border-cyan-500/5
                  hover:bg-cyan-500/5 transition"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.img}
                      alt={item.item}
                      width={52}
                      height={52}
                      className="rounded-xl object-cover
                      border border-cyan-400/10"
                    />

                    <div>
                      <div className="font-medium text-white">
                        {item.item}
                      </div>

                      <div className="text-xs text-cyan-300/60">
                        #{item.codigo}
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-300">
                    {item.professor}
                  </div>

                  <div className="text-gray-400">
                    {item.horario}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border
                      ${
                        item.status === 'EM ANDAMENTO'
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20'
                          : ''
                      }
                      ${
                        item.status === 'PENDENTE'
                          ? 'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
                          : ''
                      }
                      ${
                        item.status === 'FINALIZADO'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20'
                          : ''
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="text-right">
                    <button
                      className="px-4 py-2 rounded-xl
                      bg-cyan-500/10 text-cyan-300
                      border border-cyan-400/20
                      hover:bg-cyan-500/20 transition"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div
                className="bg-[#0f1c2e]
                border border-cyan-500/10
                rounded-3xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-5">
                  Entrega Rápida
                </h2>

                <div className="space-y-4">
                  <button
                    onClick={handleQRCode}
                    className="w-full flex items-center justify-center gap-3
                    py-5 rounded-2xl
                    bg-gradient-to-r from-cyan-400 to-blue-600
                    font-semibold text-white
                    shadow-[0_0_25px_rgba(34,211,238,0.3)]
                    hover:scale-[1.02] transition-all"
                  >
                    <QrCode size={22} />
                    Escanear QR Code
                  </button>

                  <div
                    className="bg-cyan-500/5 border border-cyan-400/10
                    rounded-2xl p-4 flex items-center gap-3"
                  >
                    <ScanLine className="text-cyan-300" />

                    <div className="text-sm text-gray-300">
                      Utilize a câmera para validar rapidamente
                      o empréstimo do equipamento.
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-[#0f1c2e]
                border border-red-500/10
                rounded-3xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold text-red-300 mb-5">
                  Itens Atrasados
                </h2>

                <div className="space-y-4">
                  <div
                    className="bg-red-500/5 border border-red-400/10
                    rounded-2xl p-4"
                  >
                    <div className="font-medium text-white">
                      Projetor Epson 4K
                    </div>

                    <div className="text-sm text-red-300 mt-1">
                      3 dias de atraso
                    </div>
                  </div>

                  <div
                    className="bg-red-500/5 border border-red-400/10
                    rounded-2xl p-4"
                  >
                    <div className="font-medium text-white">
                      Chave Laboratório P16
                    </div>

                    <div className="text-sm text-red-300 mt-1">
                      1 dia de atraso
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}