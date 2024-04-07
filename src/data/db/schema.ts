import { integer, serial, text, pgTable, timestamp, primaryKey, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const toolCategories = pgTable("tool_categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
})

export const toolCategoriesRelations = relations(toolCategories, ({ many }) => ({
    tools: many(tools),
}))

export const tools = pgTable("tools", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    icon: text("icon").notNull(),
    lightColor: text("lightcolor").notNull(),
    darkColor: text("darkcolor").notNull(),
    categoryId: integer("categoryid").notNull(),
})

export const toolsRelations = relations(tools, ({ one, many }) => ({
    category: one(toolCategories, {
        fields: [tools.categoryId],
        references: [toolCategories.id],
    }),
    projects: many(projectsToTools),
}))

export const socials = pgTable("socials", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    icon: text("icon").notNull(),
    link: text("link").notNull(),
})

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    link: text("link").notNull(),
    releasedAt: timestamp("releasedat", { withTimezone: true }).defaultNow().notNull(),
})

export const projectsRelations = relations(projects, ({ many }) => ({
    tools: many(projectsToTools),
}))

export const projectsToTools = pgTable("tp", {
    projectId: integer("projectid").notNull().references(() => projects.id),
    toolId: integer("toolid").notNull().references(() => tools.id),
}, t => ({
    pk: primaryKey({ columns: [t.projectId, t.toolId] }),
}))

export const projectsToToolsRelations = relations(projectsToTools, ({ one }) => ({
    project: one(projects, {
        fields: [projectsToTools.projectId],
        references: [projects.id],
    }),
    tool: one(tools, {
        fields: [projectsToTools.toolId],
        references: [tools.id],
    }),
}))

export const blogPosts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").unique().notNull(),
    image: text("image"),
    postedAt: timestamp("postedat", { withTimezone: true }).defaultNow().notNull(),
    content: text("content").notNull(),
    unlisted: boolean("unlisted").default(true).notNull(),
})

export const webringSites = pgTable("webring_sites", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
})
