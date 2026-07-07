// validators/client.ts
export function validateClientParams(from: string, to: string, days: string) {
  if (!from || !to) return { valid: false, error: "from e to são obrigatórios" }
  if (isNaN(Number(days))) return { valid: false, error: "days inválido" }
  return { valid: true }
}