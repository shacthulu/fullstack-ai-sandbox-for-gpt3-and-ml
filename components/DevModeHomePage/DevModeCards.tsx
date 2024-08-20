import { createStyles, Paper, Text, ThemeIcon, rem, Box } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: theme.fn.linearGradient(0, theme.colors.pink[6], theme.colors.orange[6]),
    },
  },
}));

interface DevModeCardProps {
  title: string;
  description: string;
  link: string;
  icon: any;
}

export default function DevModeCard({ title, description, link, icon }: DevModeCardProps) {
  const { classes } = useStyles();
  return (
    <Box<typeof Link> component={Link} href={link} style={{ textDecoration: 'none' }}>
      <Paper withBorder radius="md" className={classes.card}>
        <ThemeIcon
          size="xl"
          radius="md"
          variant="gradient"
          gradient={{ deg: 0, from: 'pink', to: 'orange' }}
        >
          {icon}
        </ThemeIcon>
        <Text size="xl" weight={500} mt="md">
          {title}
        </Text>
        <Text size="sm" mt="sm" color="dimmed">
          {description}
        </Text>
      </Paper>
    </Box>
  );
}
