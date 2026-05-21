'use client'

import Image from 'next/image'
import Link from 'next/link'
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
} from 'lucide-react'

export default function ItensPage() {

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

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0b1727] border-r border-cyan-500/10 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <div className="p-5 flex justify-center border-b border-cyan-500/10">

            <Image
              src="/images/logo-sige.png"
              alt="SIGE Logo"
              width={120}
              height={40}
              className="object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            />

          </div>

          {/* BOTÃO */}
          <div className="p-5">

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

          </div>

          {/* MENU */}
          <nav className="px-4 space-y-2">

            <Link
              href="/professor/homeprofessor"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition
              text-gray-300 hover:text-cyan-300"
            >
              <LayoutDashboard size={18}/>
              Painel
            </Link>

            <Link
              href="/professor/emprestimoprofessor"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition
              text-gray-300 hover:text-cyan-300"
            >
              <ArrowRightLeft size={18}/>
              Empréstimo
            </Link>

            <Link
              href="/professor/devolucao"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition
              text-gray-300 hover:text-cyan-300"
            >
              <Undo2 size={18}/>
              Devolução
            </Link>

            <Link
              href="/professor/itens"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
            >
              <Package size={18}/>
              Itens
            </Link>

          </nav>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* TOPBAR */}
        <header className="h-20 border-b border-cyan-500/10 bg-[#0b1727]/70 backdrop-blur-xl flex items-center justify-between px-8">

          <div className="flex items-center gap-8"></div>

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
        <div className="p-8 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%)] min-h-[calc(100vh-80px)]">

          {/* HEADER */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Itens Atualmente Alugados
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Visualize todos os equipamentos atualmente em sua posse.
            </p>

          </div>

          {/* CARDS */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            <div className="bg-[#0f1c2e]
            border border-cyan-500/10
            rounded-3xl p-6
            shadow-[0_0_25px_rgba(34,211,238,0.08)]">

              <p className="text-xs text-gray-400 mb-2">
                ITENS EM USO
              </p>

              <h2 className="text-3xl font-bold text-cyan-300">
                3
              </h2>

            </div>

            <div className="bg-[#0f1c2e]
            border border-blue-500/10
            rounded-3xl p-6
            shadow-[0_0_25px_rgba(59,130,246,0.08)]">

              <p className="text-xs text-gray-400 mb-2">
                DEVOLUÇÕES HOJE
              </p>

              <h2 className="text-3xl font-bold text-blue-400">
                1
              </h2>

            </div>

            <div className="bg-[#0f1c2e]
            border border-emerald-500/10
            rounded-3xl p-6
            shadow-[0_0_25px_rgba(16,185,129,0.08)]">

              <p className="text-xs text-gray-400 mb-2">
                STATUS
              </p>

              <h2 className="text-xl font-semibold text-emerald-400">
                Regular
              </h2>

            </div>

          </div>

          {/* GRID DE ITENS */}
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

                {/* IMAGE */}
                <div className="relative">

                  <Image
                    src={item.img}
                    alt={item.nome}
                    width={500}
                    height={300}
                    className="w-full h-52 object-cover"
                  />

                  <div className="absolute top-4 right-4
                  bg-emerald-500/90 text-white
                  px-3 py-1 rounded-full text-xs font-semibold
                  shadow-lg">

                    {item.status}

                  </div>

                </div>

                {/* BODY */}
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

                      <Clock3 size={16} className="text-cyan-300"/>

                      {item.prazo}

                    </div>

                    <div className="flex items-center gap-2 text-sm text-emerald-300">

                      <ShieldCheck size={16}/>

                      Equipamento em conformidade

                    </div>

                  </div>

                  {/* BOTÕES */}
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