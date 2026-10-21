// Корневой компонент приложения.
// MantineProvider обязателен — он даёт всем компонентам Mantine
// доступ к теме и контексту (официальный гайд Mantine для Vite).
// Маршруты (дизайн, docs/design/booking-app.md): / — витрина,
// /events — каталог типов события; остальные пока возвращают на главную.
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
