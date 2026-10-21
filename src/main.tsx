// Стили Mantine подключаются один раз в корневом файле приложения.
// Стили @mantine/core обязательны, стили остальных пакетов —
// только если используются компоненты из этих пакетов.
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
