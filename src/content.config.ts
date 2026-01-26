import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date().optional(),
      author: z.string().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).optional().default([]),
      category: z.string().optional(),
      technology: z.string().optional(),
      level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      course: z.string().optional(),
      lessonNumber: z.number().optional(),
      draft: z.boolean().optional().default(false),
      head: z.array(z.object({
        tag: z.string(),
        attrs: z.record(z.string()).optional(),
        content: z.string().optional(),
      })).optional(),
    }),
});

export const collections = {
  docs,
};

