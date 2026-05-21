'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  LayoutDashboard,
  ArrowRightLeft,
  Undo2,
  Bell,
  Search,
  Settings,
  User,
  UserCircle2,
  LogOut,
} from 'lucide-react'

export default function EquipamentosEmprestadosPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const emprestimos = [
    {
      id: 'EQ-2026-001',
      equipamento: 'Projetor Epson 4K',
      professor: 'Prof. Carlos Alberto',
      matricula: '202310045',
      departamento: 'Ciência da Computação',
      dataEmprestimo: '20/05/2026 08:30',
      devolucao: '21/05/2026 18:00',
      status: 'Em andamento',
      imagem: '/images/projetor.jpg',
    },
    {
      id: 'EQ-2026-002',
      equipamento: 'Notebook Dell Latitude',
      professor: 'Prof. Ana Bezerra',
      matricula: '202210122',
      departamento: 'Engenharia de Software',
      dataEmprestimo: '20/05/2026 09:15',
      devolucao: '22/05/2026 12:00',
      status: 'Em andamento',
      imagem: '/images/notebook.jpg',
    },
    {
      id: 'EQ-2026-003',
      equipamento: 'Chave Laboratório K11',
      professor: 'Prof. João Mendes',
      matricula: '202110087',
      departamento: 'Redes',
      dataEmprestimo: '19/05/2026 14:20',
      devolucao: '20/05/2026 22:00',
      status: 'Atrasado',
      imagem: '/images/chave.jpg',
    },
  ]

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
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <LayoutDashboard size={18} />
              Painel Principal
            </Link>

            <Link
              href="/secretaria/emprestimos"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300"
            >
              <ArrowRightLeft size={18} />
              Equipamentos Emprestados
            </Link>

            <Link
              href="/secretaria/devolucoes"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-cyan-500/10 transition text-gray-300 hover:text-cyan-300"
            >
              <Undo2 size={18} />
              Devoluções
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-cyan-500/10 bg-[#0b1727]/70 backdrop-blur-xl flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Controle de Empréstimos
            </h1>

            <p className="text-xs text-cyan-300/70 mt-1">
              Secretaria • Gestão em tempo real
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
              <Search size={16} className="text-cyan-300" />

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
              <Bell size={18} className="text-cyan-300" />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-11 h-11 rounded-2xl
                bg-[#132238]/80 border border-cyan-400/10
                flex items-center justify-center
                hover:bg-cyan-500/10 hover:border-cyan-400/20
                transition-all duration-300
                shadow-[0_0_20px_rgba(34,211,238,0.05)]"
              >
                <Settings size={18} className="text-cyan-300" />
              </button>

              {menuOpen && (
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
                    text-red-300 hover:bg-red-500/10 transition"
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
              text-white font-bold
              shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            >
              <UserCircle2 size={20} />

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
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Equipamentos Emprestados
            </h2>

            <p className="text-gray-400 mt-2">
              Lista completa de equipamentos atualmente emprestados.
            </p>
          </div>

          <div className="space-y-5">
            {emprestimos.map((item, index) => (
              <div
                key={index}
                className="bg-[#0f1c2e]/90 border border-cyan-500/10 rounded-2xl p-5 hover:bg-cyan-500/5 transition"
              >
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <Image
                      src={item.imagem}
                      alt={item.equipamento}
                      width={80}
                      height={80}
                      className="rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="text-xl font-semibold">
                        {item.equipamento}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {item.professor}
                      </p>

                      <p className="text-gray-500 text-xs">
                        {item.departamento}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-cyan-300 text-sm">
                      {item.devolucao}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.id}
                    </p>
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