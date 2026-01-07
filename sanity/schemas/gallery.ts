export default {
  name: 'gallery',
  title: 'Galéria',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Cím',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Képek',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatív szöveg',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Képaláírás',
            },
          ],
        },
      ],
    },
  ],
}
