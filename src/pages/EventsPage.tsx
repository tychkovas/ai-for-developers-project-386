// Каталог типов события (→ /events) — стаб-страница:
// витрина уже ведёт сюда, сама фича каталога в разработке.
import { Container, Stack, Text, Title } from '@mantine/core';
import { AppHeader } from '../components/AppHeader';

export default function EventsPage() {
  return (
    <>
      <AppHeader />
      <Container size="md" py="xl">
        <Stack gap="lg" maw={640}>
          <Title order={1}>Типы события</Title>
          <Text size="lg" c="dimmed">
            Каталог типов события скоро появится здесь —
            выбор слота и форма записи в разработке.
          </Text>
        </Stack>
      </Container>
    </>
  );
}
