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
} from 'lucide-react'

export default function EmprestimoPage() {

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
              bg-cyan-500/10 border border-cyan-400/20
              text-cyan-300"
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
        <div className="p-8 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%)] min-h-[calc(100vh-80px)]">

          {/* HEADER */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Novo Empréstimo
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Identifique o item para iniciar a solicitação.
            </p>

          </div>

          <div className="grid grid-cols-3 gap-6">

            {/* ESQUERDA */}
            <div className="col-span-2 space-y-6">

              {/* BOTÕES */}
              <div className="flex gap-4 flex-wrap">

                {/* NFC */}
                <button
                  className="bg-cyan-500/10 border border-cyan-400/20
                  text-cyan-300 px-5 py-3 rounded-xl text-sm font-medium
                  hover:bg-cyan-500/20 transition
                  shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                >
                  📶 Escanear NFC
                </button>

                {/* QR CODE */}
                <button
                  onClick={handleQRCode}
                  className="bg-blue-500/10 border border-blue-400/20
                  text-blue-300 px-5 py-3 rounded-xl text-sm font-medium
                  hover:bg-blue-500/20 transition
                  shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                >
                  📷 Escanear QR Code
                </button>

              </div>

              {/* CARD */}
              <div className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl shadow-2xl p-10 text-center">

                <div className="text-6xl mb-5 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  📡
                </div>

                <h2 className="font-semibold text-2xl text-white mb-2">
                  Aproxime o Dispositivo
                </h2>

                <p className="text-sm text-gray-400 mb-8">
                  Aproxime o cartão NFC ou digite o código abaixo.
                </p>

                <input
                  placeholder="Digite o código (ex: 2024-001)"
                  className="border border-cyan-400/20 rounded-xl px-4 py-4
                  w-80 max-w-full text-center bg-[#132238] text-white
                  placeholder:text-gray-500
                  focus:ring-2 focus:ring-cyan-400
                  focus:border-cyan-400
                  outline-none transition"
                />

              </div>

            </div>

            {/* DIREITA */}
            <div className="space-y-5">

              {/* ITENS */}
              <div className="bg-[#0f1c2e]
              border border-cyan-500/10
              rounded-3xl shadow-xl p-6">

                <h3 className="font-semibold text-white text-xl mb-5">
                  Seus Itens Atuais
                </h3>

                {/* ITEM */}
                <div className="flex gap-3 mb-4 p-3 rounded-2xl hover:bg-cyan-500/5 transition">

                  <Image
                    src="/images/projetor.jpg"
                    alt="Projetor"
                    width={56}
                    height={56}
                    className="rounded-xl object-cover border border-cyan-400/20"
                  />

                  <div className="text-sm">

                    <div className="font-medium text-white">
                      Projetor Epson 4K
                    </div>

                    <div className="text-xs text-cyan-300/70 mt-1">
                      Devolução em: 2h 15m
                    </div>

                  </div>

                </div>

                {/* ITEM */}
                <div className="flex gap-3 p-3 rounded-2xl hover:bg-cyan-500/5 transition">

                  <Image
                    src="/images/chave.jpg"
                    alt="Chave"
                    width={56}
                    height={56}
                    className="rounded-xl object-cover border border-cyan-400/20"
                  />

                  <div className="text-sm">

                    <div className="font-medium text-white">
                      Chave Laboratório K11
                    </div>

                    <div className="text-xs text-cyan-300/70 mt-1">
                      Devolução: Amanhã
                    </div>

                  </div>

                </div>

              </div>

              {/* DICA */}
              <div className="bg-gradient-to-br
              from-cyan-500/20 to-blue-600/20
              border border-cyan-400/20
              rounded-3xl p-6
              shadow-[0_0_30px_rgba(34,211,238,0.08)]">

                <h3 className="font-semibold text-cyan-200 mb-3 text-lg">
                  Dica SIGE
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Verifique cabos e acessórios antes de finalizar o empréstimo.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  )
}