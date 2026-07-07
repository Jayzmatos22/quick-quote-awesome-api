'use client';

import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    console.log('--- PÁGINA CARREGOU (FRONTEND) ---');

    axios.get('/api/quote')
      .then((response) => {
        console.log('FRONTEND RECEBEU DO BACKEND:', response.data);
      })
      .catch((error) => {
        console.error('FRONTEND DEU ERRO:', error);
      });
  }, []);

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">Abra o Console para ver o teste (F12)</h1>
    </main>
  );
}