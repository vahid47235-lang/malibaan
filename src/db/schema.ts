import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  priceToman: integer("price_toman").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Bundle/combo discount rules. A rule matches a cart when ALL of its set
// (non-null) constraints hold:
// - minCategories: cart must span at least N distinct categories
// - minServices: cart must contain at least N services total
// - requiredCategoryIds: cart must include at least one service from EACH of these categories
// - requiredServiceIds: cart must contain ALL of these specific services (exact combo)
// Only the single highest-value matching rule is applied (no stacking between rules).
export const discountRules = pgTable("discount_rules", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  minCategories: integer("min_categories"),
  minServices: integer("min_services"),
  requiredCategoryIds: jsonb("required_category_ids").$type<number[]>(),
  requiredServiceIds: jsonb("required_service_ids").$type<number[]>(),
  discountPercent: numeric("discount_percent", { precision: 5, scale: 2 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const referralCodes = pgTable("referral_codes", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  ownerName: text("owner_name"),
  discountPercent: numeric("discount_percent", { precision: 5, scale: 2 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  usageCount: integer("usage_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const settings = pgTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: jsonb("value").notNull(),
});

export const popupVariants = pgTable("popup_variants", {
  id: serial("id").primaryKey(),
  variantKey: varchar("variant_key", { length: 10 }).notNull().unique(), // "A" | "B"
  title: text("title").notNull(),
  description: text("description").notNull(),
  ctaLabel: text("cta_label").notNull(),
  delaySeconds: integer("delay_seconds").notNull().default(15),
  weightPercent: integer("weight_percent").notNull().default(50),
  isActive: boolean("is_active").notNull().default(true),
  impressions: integer("impressions").notNull().default(0),
  submissions: integer("submissions").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name"),
  phone: varchar("phone", { length: 20 }).notNull(),
  message: text("message"),
  source: varchar("source", { length: 30 }).notNull(), // contact_form | consultation_form | calculator | popup
  selectedServiceIds: jsonb("selected_service_ids").$type<number[]>(),
  quoteTotalToman: integer("quote_total_toman"),
  referralCode: varchar("referral_code", { length: 50 }),
  popupVariant: varchar("popup_variant", { length: 10 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
  token: varchar("token", { length: 128 }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
