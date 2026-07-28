import { count } from "drizzle-orm";
import { db } from "@/db";
import { services, leads, categories } from "@/db/schema";

export default async function AdminDashboardPage() {
  const [[serviceStats], [categoryStats], [leadStats]] = await Promise.all([
    db.select({ total: count() }).from(services),
    db.select({ total: count() }).from(categories),
    db.select({ total: count() }).from(leads),
  ]);

  const cards = [
    { label: "خدمات ثبت‌شده", value: serviceStats?.total ?? 0 },
    { label: "دسته‌بندی‌ها", value: categoryStats?.total ?? 0 },
    { label: "لیدهای دریافتی", value: leadStats?.total ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink-900">داشبورد</h1>
      <p className="mt-1.5 text-sm text-brand-ink-600">خلاصه وضعیت پنل مدیریت مالی‌بان</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-brand-line bg-white p-6">
            <p className="text-3xl font-bold text-brand-green-900">{card.value}</p>
            <p className="mt-1 text-sm text-brand-ink-600">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
