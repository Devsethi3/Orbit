import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    ownerId: v.string(),
    organizationId: v.optional(v.string()),
    initialContent: v.optional(v.string()),
    sharedWith: v.optional(
      v.array(
        v.object({
          userId: v.string(),
          email: v.optional(v.string()), // Made optional for backward compatibility
          accessLevel: v.union(v.literal("view"), v.literal("edit")),
          sharedAt: v.optional(v.number()), // Made optional for backward compatibility
        })
      )
    ),
    isPublic: v.optional(v.boolean()),
    publicAccessToken: v.optional(v.string()),
    publicAccessLevel: v.optional(
      v.union(v.literal("view"), v.literal("edit"))
    ),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .index("by_public_token", ["publicAccessToken"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["organizationId", "ownerId"],
    }),
});
