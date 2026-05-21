'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  ArrowRightLeft,
  Undo2,
  Package,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react'

export default function HomeProfessorPage() {
  const router = useRouter()

  const [openSettings, setOpenSettings] = useState(false)

  const settingsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setOpenSettings(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const equipamentos = [
    {
      nome: 'Projetor Laser Sony 4K',
      codigo: '#PROJ-042',
      descricao:
        'Projetor de alto brilho adequado para grandes auditórios e apresentações.',
      imagem: '/images/projetor.jpg',
    },
    {
      nome: 'Chave de Entrada do Laboratório 302',
      codigo: '#KEY-302',
      descricao:
        'Chave mestra para o Laboratório de Robótica Avançada.',
      imagem: '/images/chave.jpg',
    },
  ]

  const historico = [
    {
      nome: 'Conjunto de Lapela Sem Fio',
      codigo: '#AUD-882',
      emprestado: '12 de Out, 2026',
      devolvido: '14 de Out, 2026',
      status: 'Devolvido',
    },
    {
      nome: 'Wacom Intuos Pro',
      codigo: '#TAB-012',
      emprestado: '28 de Set, 2026',
      devolvido: '05 de Out, 2026',
      status: 'Devolvido',
    },
    {
      nome: 'GoPro Hero 11',
      codigo: '#CAM-441',
      emprestado: '15 de Set, 2026',
      devolvido: '17 de Set, 2026',
      status: 'Atrasado',
    },
  ]

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex">
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
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
            >
              <LayoutDashboard size={18} />
              Painel
            </Link>

            <Link
              href="/professor/emprestimoprofessor"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <ArrowRightLeft size={18} />
              Empréstimo
            </Link>

            <Link
              href="/professor/devolucao"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
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
              Painel do Professor
            </h1>

            <p className="text-xs text-cyan-300/70 mt-1">
              Gerencie seus empréstimos e equipamentos
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

            <div
              className="relative"
              ref={settingsRef}
            >
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
                  z-50 animate-in fade-in zoom-in-95 duration-200"
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
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-3">
              Bem-vindo de volta,
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {' '}Prof. Bezerra
              </span>
            </h1>

            <p className="text-gray-400 text-lg">
              Acesse rapidamente equipamentos disponíveis e gerencie seus empréstimos atuais.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">
                  Equipamentos Disponíveis
                </h2>

                <button className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition">
                  Ver Todos
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {equipamentos.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#0f1c2e] border border-cyan-500/10
                    rounded-3xl overflow-hidden shadow-2xl
                    hover:scale-[1.02] transition-all"
                  >
                    <div className="relative">
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        width={500}
                        height={250}
                        className="w-full h-56 object-cover"
                      />

                      <span
                        className="absolute top-4 right-4
                        bg-green-500/20 text-green-300
                        text-xs px-4 py-1 rounded-full border border-green-400/20"
                      >
                        DISPONÍVEL
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-semibold max-w-[75%]">
                          {item.nome}
                        </h3>

                        <span className="text-gray-500 text-sm">
                          {item.codigo}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {item.descricao}
                      </p>

                      <Link href="/professor/emprestimoprofessor">
                        <button
                          className="w-full py-3 rounded-2xl
                          bg-gradient-to-r from-cyan-400 to-blue-600
                          text-white font-semibold
                          shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                        >
                          Alugar item
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="bg-[#0f1c2e]
                border border-cyan-500/10 rounded-3xl
                p-6 shadow-2xl"
              >
                <h3 className="text-3xl font-bold mb-6">
                  Meus Itens Ativos
                </h3>

                <div
                  className="bg-[#132238]
                  border-l-4 border-cyan-400
                  rounded-2xl p-5 mb-4"
                >
                  <div className="font-semibold text-lg mb-2">
                    MacBook Pro 16"
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Vence em 2 dias
                    </span>

                    <span className="text-red-400 font-medium">
                      Devolver em breve
                    </span>
                  </div>
                </div>

                <div
                  className="bg-[#132238]
                  border-l-4 border-blue-500
                  rounded-2xl p-5"
                >
                  <div className="font-semibold text-lg mb-2">
                    Câmera Digital SLR
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Vence em 14 dias
                    </span>

                    <span className="text-cyan-300 font-medium">
                      Ativo
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="bg-[#0f1c2e]
                border border-cyan-500/10 rounded-3xl
                p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">
                    Histórico Recente
                  </h3>

                  <button className="text-sm text-cyan-300 hover:text-cyan-200 transition">
                    Ver Tudo
                  </button>
                </div>

                <div className="space-y-4">
                  {historico.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#132238]
                      border border-cyan-500/5
                      rounded-2xl p-4 hover:bg-cyan-500/5 transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">
                            {item.nome}
                          </h4>

                          <p className="text-xs text-cyan-300/60 mt-1">
                            {item.codigo}
                          </p>
                        </div>

                        <span
                          className={`text-xs px-3 py-1 rounded-full border
                          ${
                            item.status === 'Devolvido'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20'
                              : 'bg-red-500/10 text-red-300 border-red-400/20'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-400 space-y-1">
                        <div>
                          Empréstimo: {item.emprestado}
                        </div>

                        <div>
                          Devolução: {item.devolvido}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}