'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  ArrowRightLeft,
  Undo2,
  Package,
  Users,
  LogOut,
} from 'lucide-react'

export default function HomeProfessorPage() {

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

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex">

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
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
            >
              <LayoutDashboard size={18}/>
              Painel
            </Link>

            <Link
              href="/professor/emprestimoprofessor"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <ArrowRightLeft size={18}/>
              Empréstimo
            </Link>

            <Link
              href="/professor/devolucao"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <Undo2 size={18}/>
              Devolução
            </Link>

            <Link
              href="/professor/itens"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl
              hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
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

          {/* MENU */}
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
        <div className="p-8">

          {/* HEADER */}
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

          {/* GRID */}
          <div className="grid grid-cols-3 gap-8">

            {/* ESQUERDA */}
            <div className="col-span-2">

              {/* TITULO */}
              <div className="flex items-center justify-between mb-6">

                <h2 className="text-3xl font-bold">
                  Equipamentos Disponíveis
                </h2>

                <button className="text-cyan-300 hover:text-cyan-200 transition">
                  Ver Todos →
                </button>

              </div>

              {/* CARDS */}
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

                      <span className="absolute top-4 right-4
                      bg-green-500/20 text-green-300
                      text-xs px-4 py-1 rounded-full border border-green-400/20">
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

                      <button
                        className="w-full py-3 rounded-2xl
                        bg-gradient-to-r from-cyan-400 to-blue-600
                        text-white font-semibold
                        shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                      >
                        Emprestar Item
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* DIREITA */}
            <div>

              <div className="bg-[#0f1c2e]
              border border-cyan-500/10 rounded-3xl
              p-6 shadow-2xl">

                <h3 className="text-3xl font-bold mb-6">
                  Meus Itens Ativos
                </h3>

                {/* ITEM */}
                <div className="bg-[#132238]
                border-l-4 border-cyan-400
                rounded-2xl p-5 mb-4">

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

                {/* ITEM */}
                <div className="bg-[#132238]
                border-l-4 border-blue-500
                rounded-2xl p-5">

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

                {/* FOOTER */}
                <div className="border-t border-cyan-500/10 mt-8 pt-6 space-y-3">

                  <div className="flex justify-between">

                    <span className="text-gray-400">
                      Total Emprestado
                    </span>

                    <span className="font-semibold">
                      2 Itens
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-400">
                      Atrasados
                    </span>

                    <span className="font-semibold text-red-400">
                      0 Itens
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* HISTÓRICO */}
          <div className="mt-12">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Histórico Recente de Empréstimos
              </h2>

              <div className="flex gap-3">

                <button className="px-5 py-2 rounded-xl border border-cyan-400/20 hover:bg-cyan-500/10 transition">
                  Baixar CSV
                </button>

                <button className="px-5 py-2 rounded-xl border border-cyan-400/20 hover:bg-cyan-500/10 transition">
                  Filtrar
                </button>

              </div>

            </div>

            {/* TABELA */}
            <div className="bg-[#0f1c2e]
            border border-cyan-500/10
            rounded-3xl overflow-hidden">

              {/* HEADER */}
              <div className="grid grid-cols-5 px-8 py-5
              border-b border-cyan-500/10
              text-gray-400 font-semibold">

                <div>NOME DO ITEM</div>
                <div>EMPRESTADO EM</div>
                <div>DEVOLVIDO EM</div>
                <div>STATUS</div>
                <div>AÇÃO</div>

              </div>

              {/* LINHAS */}
              {historico.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 px-8 py-6
                  border-b border-cyan-500/5
                  hover:bg-cyan-500/5 transition"
                >

                  <div>

                    <div className="font-semibold">
                      {item.nome}
                    </div>

                    <div className="text-sm text-gray-500">
                      {item.codigo}
                    </div>

                  </div>

                  <div className="text-gray-300">
                    {item.emprestado}
                  </div>

                  <div className="text-gray-300">
                    {item.devolvido}
                  </div>

                  <div>

                    <span className={`px-4 py-1 rounded-full text-sm
                      ${
                        item.status === 'Devolvido'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-red-500/20 text-red-300'
                      }
                    `}>
                      {item.status}
                    </span>

                  </div>

                  <button className="text-cyan-300 hover:text-cyan-200 transition text-left">
                    Detalhes
                  </button>

                </div>
              ))}

              {/* FOOTER */}
              <div className="text-center py-5 text-cyan-300 cursor-pointer hover:text-cyan-200 transition">
                Carregar Mais Histórico
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}