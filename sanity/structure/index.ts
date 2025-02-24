import {MdOutlinePostAdd, MdTag} from 'react-icons/md'
import {TbCategoryPlus} from 'react-icons/tb'
import {VscPreview} from 'react-icons/vsc'

import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Blog Content')
    .items([
      // Standard lists for blog posts and categories
      S.documentTypeListItem('blog').title('Blog | post a new blog here =>').icon(MdOutlinePostAdd),
      S.documentTypeListItem('category')
        .title('Category | create category =>')
        .icon(TbCategoryPlus),
      S.documentTypeListItem('tags').title('Tags (optional) | create tag =>').icon(MdTag),

      // Divider and Heading for Reordering
      S.divider(),

      // Make the "Categories" section draggable
      orderableDocumentListDeskItem({
        type: 'category',
        title: 'Reorder Categories',
        id: 'ordered-categories',
        S,
        context,
      }),

      // "Posts By Category" section:
      S.listItem()
        .title('Posts in Category (re-order posts)')
        .icon(VscPreview)
        .child(
          S.documentTypeList('category')
            .title(`Posts in Category | btn does nothing =>`)
            .id('ordered-posts')
            .defaultOrdering([{field: 'orderRank', direction: 'asc'}])
            .child((categoryId) =>
              S.list()
                .title('Re-order posts')
                .items([
                  orderableDocumentListDeskItem({
                    type: 'blog',
                    title: 'Ordered Posts',
                    id: `ordered-posts-${categoryId}`,
                    filter: '_type == "blog" && ofCategory._ref == $categoryId',
                    params: {categoryId},
                    S,
                    context,
                  }),
                ]),
            ),
        ),
    ])
