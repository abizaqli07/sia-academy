import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  numeric,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

// =========== Enums ========== //
export const userRole = pgEnum("userRole", ["USER", "MENTOR", "ADMIN"]);
export const purchaseStatus = pgEnum("purchaseStatus", ["PURCHASED", "PENDING", "FREE"]);
export const courseLevel = pgEnum("courseLevel", [
  "BEGINNER",
  "INTERMEDIATE",
  "EXPERT",
]);

export const createTable = pgTableCreator((name) => `sia_${name}`);

/**
 * =========================== User Data ===========================
 * This is for store every user data including :
 *  - data mentor
 *  - sessions
 */
export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  role: userRole("role").default("USER").notNull(),
  phone: varchar("phone", { length: 255 }),
  password: varchar("password", { length: 255 }),
  notifConsent: boolean("notifConsent").default(false),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  carts: many(cart),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

/**
 * ======================== Cart data ===========================
 *
 * Storing mentor data including :
 *  - invoice
 */
export const cart = createTable("cart", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: varchar("courseId")
    .notNull()
    .references(() => course.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const cartRelations = relations(cart, ({ one }) => ({
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
  course: one(course, {
    fields: [cart.courseId],
    references: [course.id],
  }),
}));

/**
 * ======================== Course data ===========================
 *
 * Storing bootcamp data including :
 *  - category
 *  - bootcamp/webinar
 *  - code promo
 */
export const category = createTable("category", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
});

export const categoryRelations = relations(category, ({ many }) => ({
  courses: many(course),
  mentorings: many(mentoring),
}));

export const course = createTable("course", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  price: numeric("price", { precision: 15, scale: 0 }).notNull(),
  image: varchar("image", { length: 255 }),
  bannerImage: varchar("bannerImage", { length: 255 }),
  desc: text("desc"),
  titleDesc: varchar("titleDesc"),
  materi: text("materi"),
  date: timestamp("date", { mode: "date" }),
  level: courseLevel("level").default("BEGINNER"),
  place: varchar("place", { length: 255 }),
  placeUrl: varchar("placeUrl", { length: 255 }),
  isFree: boolean("isFree").default(false),
  isSale: boolean("isSale").default(false),
  salePrice: numeric("salePrice", { precision: 15, scale: 0 }),
  isWebinar: boolean("isWebinar").default(false),
  isFeatured: boolean("isFeatured").default(false),
  isHidden: boolean("isHidden").default(false),
  requireProofment: boolean("requireProofment").default(false),
  categoryId: varchar("categoryId")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  codePromoId: varchar("codePromoId").references(() => codePromo.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const courseRelations = relations(course, ({ many, one }) => ({
  purchases: many(purchase),
  mentors: many(coursesToMentors),
  carts: many(cart),
  category: one(category, {
    fields: [course.categoryId],
    references: [category.id],
  }),
  codePromo: one(codePromo, {
    fields: [course.codePromoId],
    references: [codePromo.id],
  }),
}));

export const coursesToMentors = createTable(
  "coursesToMentors",
  {
    courseId: varchar("courseId")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
    mentorId: varchar("mentorId")
      .notNull()
      .references(() => mentor.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.courseId, t.mentorId] }),
  }),
);

export const coursesToMentorsRelations = relations(
  coursesToMentors,
  ({ one }) => ({
    course: one(course, {
      fields: [coursesToMentors.courseId],
      references: [course.id],
    }),
    mentor: one(mentor, {
      fields: [coursesToMentors.mentorId],
      references: [mentor.id],
    }),
  }),
);

export const codePromo = createTable("codePromo", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  desc: text("desc"),
  code: varchar("code").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  percentage: integer("percentage").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const codePromoRelations = relations(codePromo, ({ many }) => ({
  courses: many(course),
  mentorings: many(mentoring),
}));

/**
 * ======================== Mentors data ===========================
 *
 * Storing mentor data including :
 *  - mentor
 *  - mentoring user data
 *  - mentoring mentor data
 *  - career guidance
 */
export const mentor = createTable("mentor", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  expertise: text("expertise").notNull(),
  image: varchar("image", { length: 255 }),
  desc: text("desc").notNull(),
  linkedin: varchar("linkedin", { length: 255 }),
  github: varchar("github", { length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const mentorRelations = relations(mentor, ({ one, many }) => ({
  mentoring: one(mentoring),
  courses: many(coursesToMentors),
}));

export const mentoring = createTable("mentoring", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  desc: text("desc").notNull(),
  materi: text("materi").notNull(),
  bannerImage: varchar("bannerImage", { length: 255 }),
  price: numeric("price", { precision: 15, scale: 0 }).notNull(),
  isFeatured: boolean("isFeatured").default(false),
  isHidden: boolean("isHidden").default(false),
  mentorId: varchar("mentorId")
    .notNull()
    .references(() => mentor.id, { onDelete: "cascade" }),
  codePromoId: varchar("codePromoId").references(() => codePromo.id, {
    onDelete: "cascade",
  }),
  categoryId: varchar("categoryId")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const mentoringRelations = relations(mentoring, ({ one, many }) => ({
  userMentoringDatas: many(userMentoringData),
  codePromo: one(codePromo, {
    fields: [mentoring.codePromoId],
    references: [codePromo.id],
  }),
  category: one(category, {
    fields: [mentoring.categoryId],
    references: [category.id],
  }),
  mentor: one(mentor, {
    fields: [mentoring.mentorId],
    references: [mentor.id],
  }),
}));

export const userMentoringData = createTable(
  "userMentoringData",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    objective: varchar("objective", { length: 255 }).notNull(),
    preference: text("preference"),
    positionPreference: text("positionPreference"),
    cv: varchar("cv", { length: 255 }).notNull(),
    referral: varchar("referral", { length: 255 }),
    mentoringId: varchar("mentoringId").references(() => mentoring.id, {
      onDelete: "cascade",
    }),
    userId: varchar("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => ({
    userMentorUnq: unique("userMentorUnq").on(t.userId, t.mentoringId),
  }),
);

export const userMentoringDataRelations = relations(
  userMentoringData,
  ({ one, many }) => ({
    mentoring: one(mentoring, {
      fields: [userMentoringData.mentoringId],
      references: [mentoring.id],
    }),
    user: one(users, {
      fields: [userMentoringData.userId],
      references: [users.id],
    }),
    schedules: many(mentoringSchedule),
    purchases: many(purchase),
  }),
);

export const mentoringSchedule = createTable("mentoringSchedule", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  date: timestamp("expires", { mode: "date" }).notNull(),
  userMentoringDataId: varchar("userMentoringDataId")
    .notNull()
    .references(() => userMentoringData.id, { onDelete: "cascade" }),
});

export const mentoringScheduleRelations = relations(
  mentoringSchedule,
  ({ one }) => ({
    userMentoringData: one(userMentoringData, {
      fields: [mentoringSchedule.userMentoringDataId],
      references: [userMentoringData.id],
    }),
  }),
);

/**
 * ======================== Invoice data ===========================
 *
 * Storing mentor data including :
 *  - invoice
 */
export const purchase = createTable("purchase", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: varchar("courseId").references(() => course.id),
  mentoringId: varchar("mentoringId").references(() => userMentoringData.id),
  status: purchaseStatus("status").default("PENDING"),
  invoiceId: varchar("invoiceId", { length: 255 }).unique(),
  invoiceUrl: varchar("invoiceUrl", { length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const purchaseRelations = relations(purchase, ({ one }) => ({
  user: one(users, {
    fields: [purchase.userId],
    references: [users.id],
  }),
  course: one(course, {
    fields: [purchase.courseId],
    references: [course.id],
  }),
  mentoring: one(userMentoringData, {
    fields: [purchase.mentoringId],
    references: [userMentoringData.id],
  }),
}));
