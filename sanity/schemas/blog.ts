import {PlayIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {YouTubePreview} from '../youtube/youtubePreview'

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog posts',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: `Note: the title will be the Heading 1 (H1) of the post's page, so please don't use another H1 in the main content.`,
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug / ID of this post',
      description: `This ID sets the post’s URL: "voccaria.com/blog/<slug>". Click "Generate" after adding the title.`,
      options: {
        source: 'title',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ofCategory',
      title: 'Category',
      description: 'Select the category this item belongs to.',
      type: 'reference',
      to: {type: 'category'},
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          name: 'youtube',
          type: 'object',
          title: 'YouTube Embed',
          icon: PlayIcon,
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'YouTube video URL',
            }),
          ],
          preview: {
            select: {title: 'url'},
          },
          components: {
            preview: YouTubePreview,
          },
        },
      ],
    },
    {
      name: 'postTags',
      title: 'Tags (optional)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tags'}]}],
    },
    {
      name: 'postIndexInCategory',
      title: 'Post index in category',
      description:
        'This is to determine the order of post when showing it in a structed way with categories. Specefically on the discord style sidebar and the blog index screen.',
      type: 'number',
    },
  ],

  preview: {
    select: {
      title: 'title',
      category: 'ofCategory.title',
      postIndex: 'postIndexInCategory',
      description: 'smallDescription',
    },
    prepare(selection: any) {
      const {category, postIndex} = selection
      return Object.assign({}, selection, {
        subtitle: category && `${category}${postIndex ? ` • ${postIndex}` : ''}`,
      })
    },
  },
}
