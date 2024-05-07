import type { Meta, StoryObj } from '@storybook/react';
import SearchForm  from './SearchForm';

const meta = {
  title: 'Movie/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialSearchQuery: '',
    onSearch: (query: string) => console.log(`Searched for: ${query}`),
  },
};
