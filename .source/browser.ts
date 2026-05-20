// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  notes: create.doc("notes", {"internal-docs.mdx": () => import("../content/notes/internal-docs.mdx?collection=notes"), }),
  writing: create.doc("writing", {"hello-world.mdx": () => import("../content/writing/hello-world.mdx?collection=writing"), "kranix-api.mdx": () => import("../content/writing/kranix-api.mdx?collection=writing"), "kranix-core.mdx": () => import("../content/writing/kranix-core.mdx?collection=writing"), }),
};
export default browserCollections;