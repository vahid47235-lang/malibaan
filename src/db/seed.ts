import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { services as serviceGroups } from "../lib/services-data";
import { hashPassword, generateRandomPassword } from "../lib/admin/password";

const PLACEHOLDER_PRICE_TOMAN = 3_000_000;

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const client = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });
  const db = drizzle(client, { schema });

  const existingCategories = await db.select().from(schema.categories);
  if (existingCategories.length > 0) {
    console.log("Categories already seeded — skipping catalog seed.");
  } else {
    for (const [index, group] of serviceGroups.entries()) {
      const [category] = await db
        .insert(schema.categories)
        .values({ slug: group.slug, label: group.navLabel, sortOrder: index })
        .returning();

      const offerings = group.offerings ?? [group.navLabel];
      for (const [serviceIndex, offering] of offerings.entries()) {
        await db.insert(schema.services).values({
          categoryId: category.id,
          name: offering,
          priceToman: PLACEHOLDER_PRICE_TOMAN,
          sortOrder: serviceIndex,
        });
      }
    }
    console.log(
      `Seeded ${serviceGroups.length} categories with placeholder prices (${PLACEHOLDER_PRICE_TOMAN.toLocaleString()} تومان each — edit real prices in /admin/services).`
    );

    await db.insert(schema.settings).values({ key: "maxTotalDiscountPercent", value: 50 });

    const categoryBySlug = new Map(
      (await db.select().from(schema.categories)).map((c) => [c.slug, c.id])
    );
    const requiredCategoryIds = [
      categoryBySlug.get("company-registration"),
      categoryBySlug.get("financial-consulting"),
      categoryBySlug.get("payroll"),
      categoryBySlug.get("digital-fintech"),
    ].filter((id): id is number => typeof id === "number");

    if (requiredCategoryIds.length === 4) {
      await db.insert(schema.discountRules).values({
        label: "ثبت شرکت + مالی و مدیریتی + بیمه پرسنل + نرم‌افزار مالی",
        requiredCategoryIds,
        discountPercent: "10",
      });
    }

    await db.insert(schema.referralCodes).values({
      code: "REF5",
      ownerName: "کد معرف نمونه",
      discountPercent: "5",
    });

    await db.insert(schema.popupVariants).values([
      {
        variantKey: "A",
        title: "مشاوره رایگان مالی می‌خواهید؟",
        description: "شماره‌تان را بگذارید تا کارشناسان مالی‌بان برای یک مشاوره ۳۰ دقیقه‌ای رایگان با شما تماس بگیرند.",
        ctaLabel: "درخواست تماس",
        delaySeconds: 20,
        weightPercent: 50,
      },
      {
        variantKey: "B",
        title: "همین امروز با یک کارشناس صحبت کنید",
        description: "بدون هیچ هزینه یا تعهدی، وضعیت مالی و مالیاتی کسب‌وکارتان را بررسی می‌کنیم.",
        ctaLabel: "می‌خواهم تماس بگیرید",
        delaySeconds: 20,
        weightPercent: 50,
      },
    ]);
  }

  const existingAdmins = await db.select().from(schema.adminUsers);
  if (existingAdmins.length === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || "admin@malibaan.com";
    const password = process.env.SEED_ADMIN_PASSWORD || generateRandomPassword(16);
    await db.insert(schema.adminUsers).values({ email, passwordHash: hashPassword(password) });
    console.log("=== SUPER ADMIN CREATED ===");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("===========================");
  } else {
    console.log("Admin user already exists — skipping.");
  }

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
