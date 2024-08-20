import { IconBrandGoogle, IconBrandAzure, IconBrandApple, IconPassword, IconBrandGithub } from '@tabler/icons-react';
import { Button } from '@mantine/core';

export function LoginProviderButtons() {
  return (
    <div>
      <Button
        leftIcon={<IconBrandGithub color="white" size="1rem" />}
        radius="xl"
        m="xxs"
        size="xs"
        variant="light"
        color="gray"
      >
        {' '}
        Github{' '}
      </Button>
      <Button
        leftIcon={<IconBrandGoogle color="red" size="1rem" />}
        variant="light"
        radius="xl"
        m="xxs"
        size="xs"
        color="gray"
      >
        {' '}
        Google{' '}
      </Button>
      <Button
        leftIcon={<IconBrandAzure color="blue" size="1rem" />}
        variant="light"
        radius="xl"
        m="xxs"
        size="xs"
        color="gray"
      >
        {' '}
        Microsoft{' '}
      </Button>
      <Button
        leftIcon={<IconBrandApple size="1rem" />}
        variant="light"
        radius="xl"
        m="xxs"
        size="xs"
        color="gray"
      >
        {' '}
        Apple{' '}
      </Button>
      <Button
        leftIcon={<IconPassword size="1rem" />}
        variant="light"
        radius="xl"
        m="xxs"
        size="xs"
        color="gray"
      >
        {' '}
        SSO{' '}
      </Button>
    </div>
  );
}
