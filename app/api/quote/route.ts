import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
const BASE_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"


export async function GET(request: NextRequest) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Erro: sem chave API" }, { status: 500 });
  }

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = response.data;
    console.log("Dados recebidos da API:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return NextResponse.json({ error: "Erro ao buscar dados da API" }, { status: 500 });
  }
}