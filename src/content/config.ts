import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'inventarios',
      'depositos',
      'wms',
      'rfid',
      'codigo-de-barras',
      'picking',
      'layout',
      'lean-warehouse',
      'supply-chain',
      'exactitud-de-inventario',
    ]),
    publishDate: z.date(),
    author: z.string().default('CDI Consultoría'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
