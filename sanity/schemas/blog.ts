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
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug / ID of this post',
      options: {
        source: 'title',
      },
    },
    {
      name: 'ofCategory',
      title: 'Belongs to which Category?',
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
  ],

  preview: {
    select: {
      title: 'title',
      category: 'ofCategory.title',
      description: 'smallDescription',
    },
    prepare(selection: any) {
      const {category} = selection
      return Object.assign({}, selection, {
        subtitle: category && `${category}`,
      })
    },
  },
}
