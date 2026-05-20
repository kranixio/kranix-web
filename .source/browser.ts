// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  notes: create.doc("notes", {"internal-docs.mdx": () => import("../content/notes/internal-docs.mdx?collection=notes"), }),
  writing: create.doc("writing", {"hello-world.mdx": () => import("../content/writing/hello-world.mdx?collection=writing"), "kranix-api.mdx": () => import("../content/writing/kranix-api.mdx?collection=writing"), "kranix-charts.mdx": () => import("../content/writing/kranix-charts.mdx?collection=writing"), "kranix-cli.mdx": () => import("../content/writing/kranix-cli.mdx?collection=writing"), "kranix-core.mdx": () => import("../content/writing/kranix-core.mdx?collection=writing"), "kranix-examples.mdx": () => import("../content/writing/kranix-examples.mdx?collection=writing"), "kranix-mcp.mdx": () => import("../content/writing/kranix-mcp.mdx?collection=writing"), "kranix-operator.mdx": () => import("../content/writing/kranix-operator.mdx?collection=writing"), "kranix-packages.mdx": () => import("../content/writing/kranix-packages.mdx?collection=writing"), "kranix-runtime.mdx": () => import("../content/writing/kranix-runtime.mdx?collection=writing"), }),
};
export default browserCollections;