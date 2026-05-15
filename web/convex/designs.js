import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewDesign = mutation({
  args: {
    name: v.string(),
    width: v.string(),
    height: v.string(),
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("designs", {
      name: args.name,
      height: args.height,
      width: args.width,
      uid: args.uid,
    });
    return result
  },
});
