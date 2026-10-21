// Общий хедер приложения (дизайн, docs/design/booking-app.md):
// на витрине — название сервиса и кнопка «Админка» (→ /admin).
import { Anchor, Button, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

export function AppHeader() {
  return (
    <Container size="md" py="md">
      <Group justify="space-between">
        <Anchor
          component={Link}
          to="/"
          underline="never"
          size="lg"
          fw={600}
          c="inherit"
        >
          Календарь звонков
        </Anchor>
        <Button variant="outline" size="sm" component={Link} to="/admin">
          Админка
        </Button>
      </Group>
    </Container>
  );
}
