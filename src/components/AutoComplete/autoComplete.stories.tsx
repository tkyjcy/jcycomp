import { ComponentProps } from 'react'
import AutoComplete from './autoComplete'
import { DataSourceType } from './autoComplete'
import { Meta, StoryObj } from '@storybook/react'

type StoryProps = ComponentProps<typeof AutoComplete>
const meta: Meta<StoryProps> = {
  component: AutoComplete,
  title: 'Autocomplete',
  tags: ['autodocs'],
}

type GitHubProps = {
  login: string
  url: string
  avatar_url: string
}

export default meta

type Story = StoryObj<StoryProps>

const renderOption = (item: DataSourceType) => {
  const itemWithGit = item as DataSourceType<GitHubProps>
  return (
    <div>
      <p>{itemWithGit.login}</p>
    </div>
  )
}
// const onSelect = (item: DataSourceType) => {
//   console.log(item)
// }

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items)
      const formatItems = items
        .slice(0, 10)
        .map((item: { login: any }) => ({ value: item.login, ...item }))
      return formatItems
    })
}

export const DefaultAutoComplete: Story = {
  args: {},
  render: (args) => {
    return (
      <AutoComplete
        renderOption={renderOption}
        fetchSuggestions={handleFetch}
        placeholder="输入点东西试试"
      />
    )
  },
}
