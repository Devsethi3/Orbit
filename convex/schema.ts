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
          accessLevel: v.union(v.literal("view"), v.literal("edit")),
        })
      )
    ),
    isPublic: v.optional(v.boolean()),
    publicAccessToken: v.optional(v.string()),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["organizationId", "ownerId"],
    }),
});
