import { CURRENCIES } from "../api/types/quote";
import { CURRENCY_PAIRS } from "../api/types/quote";


// Verificação nas moedas possíveis.
function validateCurrency(currency: string): boolean {
  return currency in CURRENCIES;
}


// Valida os parâmetros 'from', 'to' e 'days'.
// Isola a lógica de validação para facilitar testes e manutenção.
export function validateParams(from: string, to: string, days: string): { valid: boolean; error?: string } {
  if (!from || !to) {
    return { valid: false, error: "Erro: parâmetros 'from' e 'to' são obrigatórios" };
  }

  const pair = `${from}-${to}`;
  if (!CURRENCY_PAIRS.has(pair)) {
    return { valid: false, error: `Par '${pair}' não disponível.` };
  }

  if (isNaN(Number(days)) || Number(days) > 360) {
    return { valid: false, error: "Erro: parâmetro 'days' inválido. Máximo permitido é 360." };
  }

  return { valid: true };
}