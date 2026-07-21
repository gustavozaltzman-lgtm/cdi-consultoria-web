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

const casos = defineCollection({
  type: 'content',
  schema: z.object({
    client: z.string(),
    industry: z.string(),
    status: z.string(),
    subtitle: z.string(),
    headline: z.string(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    relatedService: z.string().optional(),
    relatedServiceLabel: z.string().optional(),
    datePublished: z.date().default(() => new Date('2024-01-01')),
    order: z.number().default(99),
  }),
});

export const collections = { blog, casos };
