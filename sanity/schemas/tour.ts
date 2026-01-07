export default {
  name: 'tour',
  title: 'Túrák',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Túra Neve',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'shortDescription',
      title: 'Rövid Leírás',
      type: 'text',
      rows: 3,
    },
    {
      name: 'fullDescription',
      title: 'Teljes Leírás',
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
      name: 'price',
      title: 'Ár (EUR)',
      type: 'number',
    },
    {
      name: 'duration',
      title: 'Időtartam (órában)',
      type: 'number',
    },
    {
      name: 'maxGroupSize',
      title: 'Max. Létszám',
      type: 'number',
    },
    {
      name: 'features',
      title: 'Jellemzők',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'order',
      title: 'Sorrend',
      type: 'number',
      description: 'Melyik sorrendben jelenjen meg (alacsonyabb szám = előrébb)',
    },
    {
      name: 'featured',
      title: 'Kiemelt Túra',
      type: 'boolean',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Sorrend, Növekvő',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
