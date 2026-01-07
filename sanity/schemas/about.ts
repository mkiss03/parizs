export default {
  name: 'about',
  title: 'Rólam Szekció',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Leírás',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      title: 'Kép',
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
      ],
    },
    {
      name: 'highlights',
      title: 'Kiemelések',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Ikon neve (Lucide)',
              type: 'string',
              description: 'pl: Award, Users, Star',
            },
            {
              name: 'title',
              title: 'Cím',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Leírás',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    },
  ],
}
