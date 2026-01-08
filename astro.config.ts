import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://kyawsoe-blog.vercel.app",

  integrations: [
    starlight({
      title: "Kyaw Soe's Blog",
      logo: {
        src: "./src/assets/logo.png",
        alt: "Kyaw Soe Logo",
      },
      social: [
        {
          icon: "github",
          href: "https://github.com/kyawsoe-dev",
          label: "GitHub",
        },
      ],
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Courses",
          items: [
            { label: "All Courses", link: "/courses/" },
            {
              label: "JavaScript Mastery",
              link: "/courses/javascript-mastery/",
            },
            { label: "Node.js Backend", link: "/courses/nodejs-backend/" },
            { label: "CSS Layouts", link: "/courses/css-modern-layouts/" },
          ],
        },
        {
          label: "Blog",
          items: [
            { label: "All Posts", link: "/blog/" },
            { label: "HTML", link: "/blog/html/" },
            { label: "CSS", link: "/blog/css/" },
            { label: "JavaScript", link: "/blog/javascript/" },
            { label: "Node.js", link: "/blog/nodejs/" },
            { label: "Express.js", link: "/blog/express/" },
            { label: "NestJS", link: "/blog/nestjs/" },
          ],
        },
        { label: "About", link: "/about/" },
      ],
      customCss: ["./src/styles/blog.css"],
      head: [],
    }),

    vercel(),
  ],
});
