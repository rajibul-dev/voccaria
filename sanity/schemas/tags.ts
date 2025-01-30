export default {
  name: 'tags',
  title: 'Tags (optional)',
  type: 'document',
  fields: [
    {name: 'tag', title: 'Tag name', type: 'string'},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'tag',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
