import { defineConfig } from "@astrojs/starlight/config";

export default defineConfig({
  sidebar: [
    { label: "Home", link: "/" },
    { label: "Blog", link: "/blog/" },
    { label: "About", link: "/about/" },
  ],
});
