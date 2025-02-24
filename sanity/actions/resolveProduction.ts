import {useDocumentOperation} from 'sanity'

interface AutoAssignIndexProps {
  id: string
  draft?: {
    _id: string
    _type: string
    ofCategory?: {
      _ref: string
    }
  }
  published?: object // Published document (if exists, it means it's already published)
  client: {
    fetch: (query: string, params: Record<string, any>) => Promise<number>
  }
}

export function AutoAssignIndex(props: AutoAssignIndexProps) {
  const {patch} = useDocumentOperation(props.id, 'post')

  if (!props.draft || props.published) return null

  return {
    label: 'Assign Index',
    onHandle: async () => {
      const categoryId = props.draft?.ofCategory?._ref
      if (!categoryId) {
        alert('Assign a category first!')
        return
      }

      // Fetch the highest postIndexInCategory in this category
      const query = `count(*[_type == "post" && references($categoryId)])`
      const count = await props.client.fetch(query, {categoryId})

      // Set the next available index
      patch.execute([{set: {postIndexInCategory: count + 1}}])
    },
  }
}
