// import type { Preview } from '@storybook/react'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// // preview.ts
// import '!style-loader!css-loader!resolve-url-loader!sass-loader!../src/styles/index.scss'
// library.add(fas)
// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i,
//       },
//     },
//     options: {
//       storySort: {
//         order: ['Start Page', '*'], // 将 Start Page 排在最前面
//       },
//     },
//   },
// }

// export default preview

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../src/styles/index.scss'
library.add(fas)
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: 'docs',
  options: {
    storySort: {
      order: [
        'Start Page',
        'Button',
        'Alert',
        'Menu',
        'Tabs',
        'Icon',
        'Input',
        'AutoComplete',
        'Select',
        'Upload',
      ],
    },
  },
  tags: ['autodocs'],
}
