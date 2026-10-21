// Корневой компонент приложения.
// MantineProvider обязателен — он даёт всем компонентам Mantine
// доступ к теме и контексту (официальный гайд Mantine для Vite).
import {
  Button,
  Container,
  Group,
  MantineProvider,
  Stack,
  Text,
  Title,
} from '@mantine/core';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Container size="md" py="xl">
        <Stack gap="lg">
          <Title order={1}>Календарь звонков</Title>
          <Text size="lg" c="dimmed">
            Планируйте звонки и бронируйте время в пару кликов —
            каркас приложения, дальше подключим календарь и форму бронирования.
          </Text>
          <Group>
            <Button size="md">Забронировать звонок</Button>
            <Button variant="outline" size="md" color="gray">
              Мои бронирования
            </Button>
          </Group>
        </Stack>
      </Container>
    </MantineProvider>
  );
}
