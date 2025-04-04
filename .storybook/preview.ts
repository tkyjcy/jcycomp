import type { Preview } from '@storybook/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// preview.ts
import '!style-loader!css-loader!resolve-url-loader!sass-loader!../src/styles/index.scss'
library.add(fas)
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Start Page', '*'], // 将 Start Page 排在最前面
      },
    },
  },
}

export default preview
