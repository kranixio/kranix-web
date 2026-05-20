// @ts-nocheck
import * as __fd_glob_10 from "../content/writing/kranix-runtime.mdx?collection=writing"
import * as __fd_glob_9 from "../content/writing/kranix-packages.mdx?collection=writing"
import * as __fd_glob_8 from "../content/writing/kranix-operator.mdx?collection=writing"
import * as __fd_glob_7 from "../content/writing/kranix-mcp.mdx?collection=writing"
import * as __fd_glob_6 from "../content/writing/kranix-examples.mdx?collection=writing"
import * as __fd_glob_5 from "../content/writing/kranix-core.mdx?collection=writing"
import * as __fd_glob_4 from "../content/writing/kranix-cli.mdx?collection=writing"
import * as __fd_glob_3 from "../content/writing/kranix-charts.mdx?collection=writing"
import * as __fd_glob_2 from "../content/writing/kranix-api.mdx?collection=writing"
import * as __fd_glob_1 from "../content/writing/hello-world.mdx?collection=writing"
import * as __fd_glob_0 from "../content/notes/internal-docs.mdx?collection=notes"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const notes = await create.docs("notes", "content/notes", {}, {"internal-docs.mdx": __fd_glob_0, });

export const writing = await create.docs("writing", "content/writing", {}, {"hello-world.mdx": __fd_glob_1, "kranix-api.mdx": __fd_glob_2, "kranix-charts.mdx": __fd_glob_3, "kranix-cli.mdx": __fd_glob_4, "kranix-core.mdx": __fd_glob_5, "kranix-examples.mdx": __fd_glob_6, "kranix-mcp.mdx": __fd_glob_7, "kranix-operator.mdx": __fd_glob_8, "kranix-packages.mdx": __fd_glob_9, "kranix-runtime.mdx": __fd_glob_10, });