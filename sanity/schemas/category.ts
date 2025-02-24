import {TbCategoryFilled} from 'react-icons/tb'

export default {
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: TbCategoryFilled,
  fields: [
    {
      name: 'title',
      title: 'Category name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
    },
    {
      name: 'order',
      title: 'Category order',
      type: 'number',
      hidden: true,
    },
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      description: 'This field is required for ordering blog posts using drag-and-drop.',
      options: {
        sortable: true, // Required for Sanity Orderable Document List
      },
      hidden: true,
    },
  ],
}
