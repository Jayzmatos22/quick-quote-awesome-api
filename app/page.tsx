'use client';

import React, { useState } from 'react';
import { CURRENCIES } from './api/types/quote';

export default function HomePage() {
  // Estados para o formulário de conversão
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('BRL');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Mock de dados para a Watchlist rápida (você pode buscar do seu endpoint /json/last)
  const quickPairs = [
    { pair: 'USD-BRL', name: 'Dólar Comercial', value: 'R$ 5,72', change: '-0.09%', up: false },
    { pair: 'EUR-BRL', name: 'Euro', value: 'R$ 6,21', change: '+0.15%', up: true },
    { pair: 'BTC-BRL', name: 'Bitcoin', value: 'R$ 360.000', change: '+4.98%', up: true },
    { pair: 'SOL-BRL', name: 'Solana', value: 'R$ 845,20', change: '+2.31%', up: true },
  ];

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aqui você vai chamar a sua API de rota interna que criamos antes:
      // const res = await axios.get(`/api/quote?from=${fromCurrency}&to=${toCurrency}&days=1`);
      // Lógica de cálculo...
      setResult('5.72'); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-teal-500/30">
      
      {/* HEADER / NAVBAR */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_#2dd4bf]" />
            <span className="font-bold text-xl tracking-wider uppercase bg-gradient-to-r from-teal-400 via-cyan-400 to-magenta-500 bg-clip-text text-transparent">
              Nexus<span className="text-pink-500">Quote</span>
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="text-teal-400 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Histórico</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Sobre</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* HERO SECTION */}
        <section className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Conversões de Moedas em <span className="text-teal-400 shadow-teal-500/20 drop-shadow-[0_2px_8px_rgba(45,212,191,0.4)]">Tempo Real</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Monitore taxas de câmbio globais, criptomoedas ativos e metais preciosos com dados limpos e atualizados diretamente da AwesomeAPI.
          </p>
        </section>

        {/* GRID PRINCIPAL: CONVERSOR + WATCHLIST */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* CARD DO CONVERSOR (OCUPA 2 COLUNAS NO DESKTOP) */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-900 rounded-2xl p-6 md:p-8 backdrop-blur shadow-xl relative overflow-hidden group">
            {/* Linha Neon Estética no topo do Card */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500 to-pink-500 opacity-70" />
            
            <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <span>💱</span> Calculadora de Conversão
            </h2>

            <form onSubmit={handleConvert} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* INPUT QUANTIDADE */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Valor</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-medium focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    placeholder="1.00"
                  />
                </div>

                {/* SELECT ORIGEM (FROM) */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">De (Origem)</label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-medium focus:outline-none focus:border-teal-500 transition appearance-none cursor-pointer"
                  >
                    {Object.entries(CURRENCIES).map(([sigla, nome]) => (
                      <option key={sigla} value={sigla}>
                        {sigla} - {nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SELECT DESTINO (TO) */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Para (Destino)</label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-medium focus:outline-none focus:border-teal-500 transition appearance-none cursor-pointer"
                  >
                    {Object.entries(CURRENCIES).map(([sigla, nome]) => (
                      <option key={sigla} value={sigla}>
                        {sigla} - {nome}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* BOTÃO SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold tracking-wide transition shadow-[0_4px_20px_rgba(45,212,191,0.2)] disabled:opacity-50"
              >
                {loading ? 'Processando...' : 'Calcular Cotação'}
              </button>
            </form>

            {/* SEÇÃO DE RESULTADO */}
            {result && (
              <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/30 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Resultado Obtido</p>
                  <p className="text-2xl font-bold text-teal-400 mt-1">
                    {amount} {fromCurrency} = <span className="text-white">{(Number(amount) * Number(result)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> {toCurrency}
                  </p>
                </div>
                <div className="text-right sm:text-right w-full sm:w-auto">
                  <p className="text-xs text-slate-500">Taxa de câmbio comercial atual: 1 {fromCurrency} = {result} {toCurrency}</p>
                </div>
              </div>
            )}
          </div>

          {/* WATCHLIST / PARES RÁPIDOS (OCUPA 1 COLUNA NO DESKTOP) */}
          <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-6 backdrop-blur shadow-xl space-y-6">
            <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <span>📈</span> Mercado Hoje
            </h2>
            
            <div className="space-y-4">
              {quickPairs.map((item) => (
                <div 
                  key={item.pair} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 transition group cursor-pointer"
                >
                  <div>
                    <p className="font-bold text-sm text-slate-200 group-hover:text-teal-400 transition-colors">{item.pair}</p>
                    <p className="text-xs text-slate-400">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-slate-200">{item.value}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      item.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CONTAINER SPACE FOR THE HISTORICAL CHART (PRÓXIMO PASSO) */}
        <section className="bg-slate-900/30 border border-slate-900/80 rounded-2xl p-6 h-64 flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3 bg-slate-950 rounded-full text-slate-500 border border-slate-900">📊</div>
          <p className="text-sm font-semibold text-slate-400">Histórico de Tendência da Moeda Selecionada</p>
          <p className="text-xs text-slate-500 max-w-sm">
            O gráfico de fechamento dos últimos dias aparecerá aqui ao integrar o endpoint <code className="text-pink-400">/daily</code>.
          </p>
        </section>

      </main>
    </div>
  );
}