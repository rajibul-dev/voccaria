import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'
import {AutoAssignIndex} from './actions/resolveProduction'

export default defineConfig({
  name: 'default',
  title: 'voccaria',

  projectId: 'osw478n5',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
