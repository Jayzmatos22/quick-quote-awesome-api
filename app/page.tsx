"use client";

import React, { useState, useEffect, useRef } from "react";
import { CURRENCIES, CURRENCY_PAIRS, ModelQuote } from "./api/types/quote";
import HeaderApp from "./components/header";
import { useDailyCurrencies } from "./hooks/currencies";

// Interface para os itens do histórico, herdando todos os dados da cotação
export interface HistoryEntry extends ModelQuote {
  requestedAmount: number;
  calculatedResult: number;
}

export default function HomePage() {
  // Estados para o formulário de conversão
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [amount, setAmount] = useState("1.00");

  // Estado do Histórico
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  // Ref para controlar o último timestamp e evitar duplicações no histórico
  const lastTimestampRef = useRef<string | null>(null);

  // Chamada do Hook
  const { data, isLoading, isFetching } = useDailyCurrencies(from, to, "1");

  // Cálculo do Resultado
  const currentQuote = data?.[0];
  const result = currentQuote?.bid
    ? (Number(currentQuote.bid) * Number(amount)).toFixed(2)
    : null;

  // Efeito para alimentar o histórico a cada nova requisição/atualização da API
  useEffect(() => {
    if (currentQuote && currentQuote.timestamp && !isFetching) {
      // Verifica se o timestamp da cotação atual é diferente do último salvo
      if (currentQuote.timestamp !== lastTimestampRef.current) {
        lastTimestampRef.current = currentQuote.timestamp;

        const newEntry: HistoryEntry = {
          ...currentQuote,
          requestedAmount: Number(amount),
          calculatedResult: Number(currentQuote.bid) * Number(amount),
        };

        // Adiciona no início do array e limita a 10 itens para não inflar a UI
        setHistory((prev) => [newEntry, ...prev].slice(0, 10));
      }
    }
  }, [currentQuote, isFetching, amount]); // Inclui amount para salvar o valor exato usado na req.

  // Filtragem dinâmica dos destinos válidos
  const availableTo = [...CURRENCY_PAIRS]
    .filter((pair) => pair.startsWith(`${from}-`))
    .map((pair) => pair.split("-")[1]);

  // Função auxiliar para formatar a data vinda da API (ex: "2023-10-25 10:00:00")
  const formatApiDate = (dateString: string) => {
    if (!dateString) return "";
    const [date, time] = dateString.split(" ");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year} ${time}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-teal-500/30">
      {/* HEADER / NAVBAR */}
      <HeaderApp />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* HERO SECTION */}
        <section className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Conversões de Moedas em{" "}
            <span className="text-teal-400 shadow-teal-500/20 drop-shadow-[0_2px_8px_rgba(45,212,191,0.4)]">
              Tempo Real
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Monitore taxas de câmbio globais, criptomoedas ativos e metais
            preciosos com dados limpos e atualizados diretamente da AwesomeAPI.
          </p>
        </section>

        {/* GRID PRINCIPAL: CONVERSOR + HISTÓRICO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* CARD DO CONVERSOR (OCUPA 2 COLUNAS NO DESKTOP) */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-900 rounded-2xl p-6 md:p-8 backdrop-blur shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-teal-500 to-pink-500 opacity-70" />

            <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <span>💱</span> Calculadora de Conversão
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* INPUT QUANTIDADE */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Valor</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:border-teal-500 transition outline-none"
                    placeholder="1.00"
                  />
                </div>

                {/* SELECT ORIGEM */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">De</label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:border-teal-500 transition cursor-pointer appearance-none outline-none"
                  >
                    {[...CURRENCIES].map((c) => (
                      <option key={c} value={c} className="bg-slate-900">{c}</option>
                    ))}
                  </select>
                </div>

                {/* SELECT DESTINO */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Para</label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:border-teal-500 transition cursor-pointer appearance-none outline-none"
                  >
                    {availableTo.map((c) => (
                      <option key={c} value={c} className="bg-slate-900">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FEEDBACK DE LOADING / FETCHING */}
              <div className="text-slate-100 h-6 flex items-center">
                {isLoading && (
                  <p className="text-sm text-teal-500 animate-pulse">Carregando cotação...</p>
                )}
                {isFetching && !isLoading && (
                  <p className="text-sm text-slate-400 animate-pulse">Atualizando...</p>
                )}
              </div>
            </div>

            {/* SEÇÃO DE RESULTADO */}
            {result && currentQuote && (
              <div className="mt-4 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/30 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Resultado Obtido</p>
                  <p className="text-2xl font-bold text-teal-400 mt-1">
                    {amount} {from} ={" "}
                    <span className="text-white">
                      {Number(result).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>{" "}
                    {to}
                  </p>
                </div>
                <div className="text-right sm:text-right w-full sm:w-auto">
                  <p className="text-xs text-slate-500">Taxa comercial: 1 {from} = {currentQuote.bid} {to}</p>
                </div>
              </div>
            )}
          </div>

          {/* HISTÓRICO DE REQUISIÇÕES (OCUPA 1 COLUNA NO DESKTOP) */}
          <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-6 backdrop-blur shadow-xl h-full min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-pink-500 to-teal-500 opacity-70" />
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span>📜</span> Histórico de Conversões
              </h3>
              {history.length > 0 && (
                <button 
                  onClick={() => setHistory([])}
                  className="text-xs text-slate-500 hover:text-pink-500 transition"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[450px]">
              {history.length === 0 ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-slate-950/50 rounded-full text-teal-500/50 border border-slate-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  </div>
                  <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
                    Seu histórico de requisições aparecerá aqui automaticamente.
                  </p>
                </div>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="bg-slate-950/40 border border-slate-800 rounded-lg p-3 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">
                        {item.requestedAmount} {item.code}
                      </span>
                      <span className="text-slate-500 text-xs">→</span>
                      <span className="text-sm font-bold text-teal-400">
                        {item.calculatedResult.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} {item.codein}
                      </span>
                    </div>
                    
                    {/* Informações extras da API */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800/60">
                      <span>Data:</span>
                      <span className="text-slate-400 text-right">{formatApiDate(item.create_date)}</span>
                      
                      <span>Taxa (Bid):</span>
                      <span className="text-slate-400 text-right">{Number(item.bid).toFixed(4)}</span>
                      
                      <span>Máxima / Mínima:</span>
                      <span className="text-slate-400 text-right">{item.high} / {item.low}</span>
                      
                      <span>Variação:</span>
                      <span className={`text-right font-medium ${Number(item.pctChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {Number(item.pctChange) >= 0 ? '▲' : '▼'} {item.pctChange}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}