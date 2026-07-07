import { CURRENCIES } from "../api/types/quote";


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

  if (!validateCurrency(from) || !validateCurrency(to)) {
    return { valid: false, error: "Erro: moeda inválida ou indisponível." };
  }

  if (isNaN(Number(days)) || Number(days) > 360) {
    return { valid: false, error: "Erro: parâmetro 'days' inválido. Máximo permitido é 360." };
  }

  return { valid: true };
}