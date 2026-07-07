import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ModelQuote } from "../types/quote";
import { validateParams } from "../../validators/general";
import { validateClientParams } from "../../validators/client";

// Url base da API.
// Há variações, mas esta é a raiz para qualquer endpoint.
const BASE_URL = "https://economia.awesomeapi.com.br/json/";

// Últimas cotações das moedas selecionadas.
// 3 parâmetros: from, to e days (opcional, default 1, máximo 360).
export async function GET(request: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Erro: sem chave API" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from")?.toUpperCase() || "USD";
  const to = searchParams.get("to")?.toUpperCase() || "BRL";
  const days = searchParams.get("days") || "1";

  const validation = validateParams(from, to, days);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const url = `${BASE_URL}daily/${from}-${to}/${days}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Formato esperado.
    const data: ModelQuote[] = response.data;
    console.log("Dados recebidos da API:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados da API" },
      { status: 500 },
    );
  }
}
