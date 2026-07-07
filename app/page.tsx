"use client";

import React, { useState } from "react";
import { CURRENCIES } from "./api/types/quote";
import HeaderApp from "./components/header";
import { useDailyCurrencies } from "./hooks/currencies";
import axios from "axios";

export default function HomePage() {
  // Estados para o formulário de conversão
  // Padrão inicial: USD para BRL
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [amount, setAmount] = useState("1.00");

  const { data, isLoading, isFetching } = useDailyCurrencies(from, to, "1");
  const result = data?.[0]?.bid ? (Number(data[0].bid) * Number(amount)).toFixed(2) : null;


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

        {/* GRID PRINCIPAL: CONVERSOR + WATCHLIST */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* CARD DO CONVERSOR (OCUPA 2 COLUNAS NO DESKTOP) */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-900 rounded-2xl p-6 md:p-8 backdrop-blur shadow-xl relative overflow-hidden group">
            {/* Linha Neon Estética no topo do Card */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-teal-500 to-pink-500 opacity-70" />

            <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <span>💱</span> Calculadora de Conversão
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* INPUT QUANTIDADE */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Valor
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-medium focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    placeholder="1.00"
                  />
                </div>

                {/* SELECT ORIGEM */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    De (Origem)
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-medium focus:outline-none focus:border-teal-500 transition appearance-none cursor-pointer"
                  >
                    {Object.entries(CURRENCIES).map(([sigla, nome]) => (
                      <option key={sigla} value={sigla}>
                        {sigla} - {nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SELECT DESTINO */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Para (Destino)
                  </label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
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

              {/* result — substitui o botão */}
              <div className="text-slate-100">
                {isLoading && (
                  <p className="text-slate-400">Carregando cotação...</p>
                )}
                {isFetching && !isLoading && (
                  <p className="text-slate-400">Atualizando...</p>
                )}
                {result && (
                  <p className="text-2xl font-bold">
                    {amount} {from} ={" "}
                    <span className="text-teal-400">
                      {result} {to}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* SEÇÃO DE result */}
            {result && (
              <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/30 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    result Obtido
                  </p>
                  <p className="text-2xl font-bold text-teal-400 mt-1">
                    {amount} {from} ={" "}
                    <span className="text-white">
                      {(Number(amount) * Number(result)).toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 },
                      )}
                    </span>{" "}
                    {to}
                  </p>
                </div>
                <div className="text-right sm:text-right w-full sm:w-auto">
                  <p className="text-xs text-slate-500">
                    Taxa de câmbio comercial atual: 1 {from} = {result}{" "}
                    {to}
                  </p>
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
                    <p className="font-bold text-sm text-slate-200 group-hover:text-teal-400 transition-colors">
                      {item.pair}
                    </p>
                    <p className="text-xs text-slate-400">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-slate-200">
                      {item.value}
                    </p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.up
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
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
          <div className="p-3 bg-slate-950 rounded-full text-slate-500 border border-slate-900">
            📊
          </div>
          <p className="text-sm font-semibold text-slate-400">
            Histórico de Tendência da Moeda Selecionada
          </p>
          <p className="text-xs text-slate-500 max-w-sm">
            O gráfico de fechamento dos últimos dias aparecerá aqui ao integrar
            o endpoint <code className="text-pink-400">/daily</code>.
          </p>
        </section>
      </main>
    </div>
  );
}
