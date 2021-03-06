// @flow
import path from 'path'
import slash from 'slash'
import pluginTester from 'babel-plugin-tester'
import plugin from '../'

const filename = path.resolve(
  slash(__dirname),
  '..',
  '__fixtures__',
  'messages.js'
)

const standardTest = {
  title: 'basic',
  code: `
import { defineMessages } from 'react-intl'

export default defineMessages({
  new: {
    id: 'App.Components.Greeting.hello',
    defaultMessage: 'id',
    description: 'describe text for translation'
  }
})
`,
}

const missingIdTest = {
  title: 'missingId',
  code: `
import { defineMessages } from 'react-intl'

export default defineMessages({
  new: {
    defaultMessage: 'missing id',
    description: 'should not fail when id is missing'
  }
})
`,
}

const stringIdTest = {
  title: 'stringId',
  code: `
import { defineMessages } from 'react-intl'

export default defineMessages({
  new: {
    "id": "App.Components.Greeting.hello",
    "defaultMessage": "id",
    "description": "describe text for translation"
  }
})
`,
}

function pTest(opts: Object) {
  pluginTester(
    Object.assign(
      {
        plugin,
        snapshot: true,
        babelOptions: { filename },
      },
      opts
    )
  )
}

pTest({
  title: 'default',
  tests: [standardTest, missingIdTest, stringIdTest],
  pluginOptions: {},
})

pTest({
  title: 'murmur3 hash',
  tests: [standardTest, missingIdTest, stringIdTest],
  pluginOptions: { idHash: 'murmur3' },
})
