'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Bell,
  Search,
  Settings,
  User,
  Calendar,
  BadgeCheck,
  Package,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
} from 'lucide-react'

export default function DetalheEmprestimoPage() {

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

      {/* TOPBAR */}
      <header className="h-20 border-b border-cyan-500/10 bg-[#0b1727]/70 backdrop-blur-xl flex items-center justify-between px-8">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <Link
            href="/secretaria/home"
            className="w-11 h-11 rounded-xl
            bg-cyan-500/10 border border-cyan-400/20
            flex items-center justify-center
            hover:bg-cyan-500/20 transition"
          >
            <ArrowLeft className="text-cyan-300" size={20}/>
          </Link>

          <div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Detalhes do Empréstimo
            </h1>

            <p className="text-sm text-gray-400">
              Informações completas do empréstimo realizado
            </p>

          </div>

        </div>

        {/* RIGHT */}
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

      {/* CONTENT */}
      <main className="p-8">

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6">

          {/* ESQUERDA */}
          <div className="col-span-2 space-y-6">

            {/* PROFESSOR */}
            <div className="bg-[#0f1c2e]
            border border-cyan-500/10
            rounded-3xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-semibold text-white">
                    Dados do Professor
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Informações do responsável pelo empréstimo
                  </p>

                </div>

                <div className="w-20 h-20 rounded-2xl
                bg-gradient-to-br from-cyan-400 to-blue-600
                flex items-center justify-center
                shadow-[0_0_30px_rgba(34,211,238,0.35)]">

                  <User size={36}/>

                </div>

              </div>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-6">

                <div className="bg-[#132238]
                border border-cyan-400/10
                rounded-2xl p-5">

                  <div className="text-xs text-cyan-300/70 mb-2">
                    PROFESSOR
                  </div>

                  <div className="text-lg font-semibold">
                    Prof. Ricardo Mendes
                  </div>

                </div>

                <div className="bg-[#132238]
                border border-cyan-400/10
                rounded-2xl p-5">

                  <div className="text-xs text-cyan-300/70 mb-2">
                    MATRÍCULA
                  </div>

                  <div className="text-lg font-semibold">
                    202600182
                  </div>

                </div>

                <div className="bg-[#132238]
                border border-cyan-400/10
                rounded-2xl p-5">

                  <div className="text-xs text-cyan-300/70 mb-2">
                    DEPARTAMENTO
                  </div>

                  <div className="text-lg font-semibold">
                    Ciência da Computação
                  </div>

                </div>

                <div className="bg-[#132238]
                border border-cyan-400/10
                rounded-2xl p-5">

                  <div className="text-xs text-cyan-300/70 mb-2">
                    CONTATO
                  </div>

                  <div className="text-lg font-semibold">
                    (85) 99999-9999
                  </div>

                </div>

              </div>

            </div>

            {/* ITENS */}
            <div className="bg-[#0f1c2e]
            border border-cyan-500/10
            rounded-3xl overflow-hidden shadow-2xl">

              {/* HEADER */}
              <div className="px-6 py-5 border-b border-cyan-500/10">

                <h2 className="text-2xl font-semibold">
                  Itens Emprestados
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Equipamentos vinculados ao empréstimo
                </p>

              </div>

              {/* LISTA */}
              <div>

                {itens.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between
                    px-6 py-5 border-b border-cyan-500/5
                    hover:bg-cyan-500/5 transition"
                  >

                    {/* ITEM */}
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

                    {/* STATUS */}
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

          {/* DIREITA */}
          <div className="space-y-6">

            {/* STATUS */}
            <div className="bg-gradient-to-br
            from-cyan-500/20 to-blue-600/20
            border border-cyan-400/20
            rounded-3xl p-6
            shadow-[0_0_40px_rgba(34,211,238,0.15)]">

              <div className="flex items-center justify-between mb-6">

                <div className="w-14 h-14 rounded-2xl
                bg-white/10 flex items-center justify-center">

                  <ClipboardCheck className="text-cyan-200"/>

                </div>

                <span className="px-4 py-1 rounded-full
                text-xs bg-emerald-500/10
                text-emerald-300 border border-emerald-400/20">
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

            {/* DETALHES */}
            <div className="bg-[#0f1c2e]
            border border-cyan-500/10
            rounded-3xl p-6 shadow-xl">

              <h2 className="text-2xl font-semibold mb-6">
                Informações
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl
                  bg-cyan-500/10
                  flex items-center justify-center">

                    <Calendar className="text-cyan-300"/>

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

                  <div className="w-12 h-12 rounded-2xl
                  bg-blue-500/10
                  flex items-center justify-center">

                    <Clock3 className="text-blue-300"/>

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

                  <div className="w-12 h-12 rounded-2xl
                  bg-emerald-500/10
                  flex items-center justify-center">

                    <BadgeCheck className="text-emerald-300"/>

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

                  <div className="w-12 h-12 rounded-2xl
                  bg-yellow-500/10
                  flex items-center justify-center">

                    <Package className="text-yellow-300"/>

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

            {/* BOTÕES */}
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