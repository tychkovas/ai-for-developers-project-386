// Тесты главной страницы и маршрутизации: витрина, переход по CTA,
// хедер с «Админкой», catch-all-редирект (дизайн, docs/design/booking-app.md).
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
  window.history.pushState(null, '', '/');
});

test('витрина: заголовок, описание и CTA на /events', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { level: 1, name: 'Запишитесь на звонок в пару кликов' }),
  ).toBeTruthy();
  expect(screen.getByText(/свободный слот в календаре/i)).toBeTruthy();
  expect(
    screen.getByRole('link', { name: 'Записаться на звонок' }).getAttribute('href'),
  ).toBe('/events');
});

test('хедер: название ведёт на /, кнопка «Админка» — на /admin', () => {
  render(<App />);

  expect(
    screen.getByRole('link', { name: 'Календарь звонков' }).getAttribute('href'),
  ).toBe('/');
  expect(screen.getByRole('link', { name: 'Админка' }).getAttribute('href')).toBe('/admin');
});

test('CTA переводит на стаб каталога типов события', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('link', { name: 'Записаться на звонок' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Типы события' }),
  ).toBeTruthy();
  expect(window.location.pathname).toBe('/events');
});

test('неизвестный маршрут редиректит на витрину', () => {
  window.history.pushState(null, '', '/admin');
  render(<App />);

  expect(
    screen.getByRole('heading', { level: 1, name: 'Запишитесь на звонок в пару кликов' }),
  ).toBeTruthy();
  expect(window.location.pathname).toBe('/');
});
