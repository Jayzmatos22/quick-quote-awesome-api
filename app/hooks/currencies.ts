import { useQuery } from "@tanstack/react-query";
import { quoteService } from "../services/quoteService";


// 5 minutos de cache para evitar chamadas desnecessárias à API
export const useDailyCurrencies = (from: string, to: string, days: string) => {
  return useQuery({
    queryKey: ["dailyCurrencies", from, to, days],
    queryFn: () => quoteService.getDailyQuotes(from, to, days),
    enabled: !!from && !!to,
    staleTime: 1000 * 60 * 5,
  });
};
