export default {
  name: 'siteSettings',
  title: 'Oldal Beállítások',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Oldal Neve',
      type: 'string',
    },
    {
      name: 'siteDescription',
      title: 'Oldal Leírása',
      type: 'text',
    },
    {
      name: 'contactEmail',
      title: 'Email Cím',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Telefonszám',
      type: 'string',
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Szám',
      type: 'string',
      description: 'Formátum: +36301234567',
    },
    {
      name: 'socialLinks',
      title: 'Közösségi Média Linkek',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'logo',
      title: 'Logó',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
