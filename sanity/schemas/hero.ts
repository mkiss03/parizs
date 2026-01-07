export default {
  name: 'hero',
  title: 'Hero Szekció',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Főcím',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subheadline',
      title: 'Alcím',
      type: 'text',
      rows: 3,
    },
    {
      name: 'backgroundImage',
      title: 'Háttérkép',
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
      name: 'backgroundVideo',
      title: 'Háttér Videó URL (opcionális)',
      type: 'url',
      description: 'Ha videót szeretne, adjon meg egy YouTube vagy közvetlen MP4 linket',
    },
    {
      name: 'ctaText',
      title: 'Gomb Szövege',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'Gomb Link',
      type: 'string',
    },
  ],
}
