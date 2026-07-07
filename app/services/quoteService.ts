// src/services/quoteService.ts
import axios from "axios";
import { validateClientParams } from "./../validators/client";

export const quoteService = {
  getDailyQuotes: async (from: string, to: string, days: string) => {
    const validation = validateClientParams(from, to, days);
    if (!validation.valid) throw new Error(validation.error);

    const response = await axios.get(
      `/api/quote?from=${from}&to=${to}&days=${days}`,
    );
    return response.data;
  },
};
