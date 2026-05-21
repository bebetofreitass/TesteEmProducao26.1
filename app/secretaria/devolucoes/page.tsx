'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  LayoutDashboard,
  ArrowRightLeft,
  Bell,
  Search,
  Settings,
  Undo2,
  Calendar,
  User,
  BadgeCheck,
  CheckCircle2,
  PackageCheck,
  Clock3,
} from 'lucide-react'

export default function DevolucoesSecretariaPage() {

  const devolucoes = [
    {
      id: 'DEV-2026-001',
      equipamento: 'Projetor Epson 4K',
      professor: 'Prof. Carlos Alberto',
      matricula: '202310045',
      dataEmprestimo: '18/05/2026 08:30',
      dataDevolucao: '20/05/2026 17:40',
      status: 'Devolvido',
      imagem: '/images/projetor.jpg',
    },
    {
      id: 'DEV-2026-002',
      equipamento: 'Notebook Dell Latitude',
      professor: 'Prof. Ana Bezerra',
      matricula: '202210122',
      dataEmprestimo: '17/05/2026 10:15',
      dataDevolucao: '20/05/2026 14:10',
      status: 'Inspecionado',
      imagem: '/images/notebook.jpg',
    },
    {
      id: 'DEV-2026-003',
      equipamento: 'Chave Laboratório K11',
      professor: 'Prof. João Mendes',
      matricula: '202110087',
      dataEmprestimo: '16/05/2026 14:20',
      dataDevolucao: '19/05/2026 18:00',
      status: 'Devolvido',
      imagem: '/images/chave.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex">

      {/* SIDEBAR */}
<aside className="w-72 bg-[#0b1727] border-r border-cyan-500/10 flex flex-col justify-between">

        <div>

          {/* LOGO */}
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

          {/* BOTÃO */}
          <div className="p-5"></div>

          {/* MENU */}
          <nav className="px-4 space-y-2">

            <Link
              href="/secretaria/home"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <LayoutDashboard size={18}/>
              Painel Principal
            </Link>

            <Link
              href="/secretaria/emprestimos"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <ArrowRightLeft size={18}/>
              Equipamentos Emprestados
            </Link>

            <Link
              href="/secretaria/devolucoes"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
            >
              <Undo2 size={18}/>
              Devoluções
            </Link>

          </nav>

        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-cyan-500/10">

          <button
            className="w-full py-3 rounded-2xl border border-red-500/20
            text-red-300 hover:bg-red-500/10 transition"
          >
            Sair da conta
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-20 border-b border-cyan-500/10 bg-[#0b1727]/70 backdrop-blur-xl flex items-center justify-between px-8">

          <div>
            <h1 className="text-xl font-semibold text-white">
              Controle de Devoluções
            </h1>
          </div>

          {/* AÇÕES */}
          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <div className="flex items-center bg-[#132238]
            border border-cyan-400/10 rounded-xl px-4 py-2 w-80">

              <Search size={16} className="text-cyan-300"/>

              <input
                placeholder="Buscar equipamento..."
                className="bg-transparent outline-none ml-2 text-sm w-full placeholder:text-gray-500"
              />

            </div>

            <Bell className="text-cyan-300 cursor-pointer"/>

            <Settings className="text-cyan-300 cursor-pointer"/>

            <div className="w-10 h-10 rounded-full
            bg-gradient-to-br from-cyan-400 to-blue-600
            shadow-[0_0_15px_rgba(34,211,238,0.5)]"/>

          </div>

        </header>

        {/* CONTEÚDO */}
        <div className="p-8">

          {/* HEADER */}
          <div className="mb-8">

            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Equipamentos Devolvidos
            </h2>

            <p className="text-gray-400 mt-2">
              Lista de equipamentos devolvidos pelos professores.
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            <div className="bg-[#0f1c2e] border border-cyan-500/10 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-3">

                <Undo2 className="text-cyan-300"/>

                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300">
                  Hoje
                </span>

              </div>

              <h3 className="text-4xl font-bold text-white">
                24
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Equipamentos devolvidos
              </p>

            </div>

            <div className="bg-[#0f1c2e] border border-emerald-500/10 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-3">

                <CheckCircle2 className="text-emerald-300"/>

                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300">
                  OK
                </span>

              </div>

              <h3 className="text-4xl font-bold text-white">
                21
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Sem avarias
              </p>

            </div>

            <div className="bg-[#0f1c2e] border border-yellow-500/10 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-3">

                <Clock3 className="text-yellow-300"/>

                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300">
                  Revisão
                </span>

              </div>

              <h3 className="text-4xl font-bold text-white">
                3
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Precisam de inspeção
              </p>

            </div>

          </div>

          {/* LISTA */}
          <div className="space-y-5">

            {devolucoes.map((item, index) => (

              <Link
                key={index}
                href="/secretaria/detalhedevolucao"
                className="block"
              >

                <div
                  className="bg-[#0f1c2e]/90 border border-cyan-500/10
                  rounded-2xl p-5 hover:border-cyan-400/20
                  hover:bg-cyan-500/5
                  transition-all duration-300 shadow-xl cursor-pointer"
                >

                  <div className="flex items-center justify-between">

                    {/* ESQUERDA */}
                    <div className="flex items-center gap-5">

                      <Image
                        src={item.imagem}
                        alt={item.equipamento}
                        width={90}
                        height={90}
                        className="rounded-2xl object-cover border border-cyan-400/20"
                      />

                      <div>

                        <div className="flex items-center gap-3 mb-2">

                          <h3 className="text-xl font-semibold text-white">
                            {item.equipamento}
                          </h3>

                          <span className={`text-xs px-3 py-1 rounded-full border
                            ${
                              item.status === 'Inspecionado'
                                ? 'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
                                : 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20'
                            }
                          `}>
                            {item.status}
                          </span>

                        </div>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">

                          <div className="flex items-center gap-2 text-gray-300">
                            <User size={15} className="text-cyan-300"/>
                            {item.professor}
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <BadgeCheck size={15} className="text-cyan-300"/>
                            Matrícula: {item.matricula}
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar size={15} className="text-cyan-300"/>
                            Empréstimo: {item.dataEmprestimo}
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <Undo2 size={15} className="text-cyan-300"/>
                            Devolução: {item.dataDevolucao}
                          </div>

                        </div>

                      </div>

                    </div>

                    {/* DIREITA */}
                    <div className="text-right">

                      <p className="text-sm text-gray-400 mb-2">
                        Código da devolução
                      </p>

                      <p className="text-lg font-semibold text-cyan-300">
                        {item.id}
                      </p>

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}