import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewDesign = mutation({
  args: {
    name: v.string(),
    width: v.number(),
    height: v.number(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("designs", {
      name: args.name,
      height: args.height,
      width: args.width,
      uid: args.uid,
    });
    return result;
  },
});

export const GetDesign = query({
  args: {
    id: v.id("designs")
  },
  handler: async (ctx, args) => {
    const design = await ctx.db.get(args.id);
    return design;
  },
});

export const UpdateDesignName = mutation({
  args: {
    id: v.id("designs"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
    });
  },
});
