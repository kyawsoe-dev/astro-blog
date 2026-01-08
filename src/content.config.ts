import { defineCollection, z } from 'astro:content';

// Blog posts collection
const blog = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			author: z.string().default('Kyaw Soe'),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional().default([]),
			category: z.string().optional(),
			technology: z.string().optional(), // Specific technology focus
			level: z.enum(['beginner', 'intermediate', 'advanced']).optional(), // Difficulty level
			course: z.string().optional(), // Course this post belongs to
			lessonNumber: z.number().optional(), // Lesson number in the course
			draft: z.boolean().optional().default(false),
		}),
});

// Use Starlight's default docs collection
const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    head: z.array(z.object({
      tag: z.string(),
      attrs: z.record(z.string()).optional(),
      content: z.string().optional(),
    })).optional(), // Add head field to prevent undefined values
  }),
});

export const collections = {
  blog,
  docs,
};
