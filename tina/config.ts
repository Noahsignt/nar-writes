import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        label: 'Homepage',
        name: 'homepage',
        path: 'content/',
        fields: [
          {
            type: 'image',
            name: 'banner',
            label: 'Banner Image',
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "object",
            name: "route",
            label: "Route Coordinates",
            list: true,
            fields: [
              {
                type: "number",
                name: "lat",
                label: "Latitude",
              },
              {
                type: "number",
                name: "lng",
                label: "Longitude",
              },
            ],
          },
          {
            type: "string",
            name: "routeColor",
            label: "Route Color (hex code)",
            description: "e.g. #E63946",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
