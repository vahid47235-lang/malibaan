import { asc } from "drizzle-orm";
import { db } from "@/db";
import { categories, services } from "@/db/schema";
import {
  createCategoryAction,
  deleteCategoryAction,
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "./actions";

export default async function AdminServicesPage() {
  const allCategories = await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.id));
  const allServices = await db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink-900">خدمات و دسته‌بندی‌ها</h1>
      <p className="mt-1.5 text-sm text-brand-ink-600">
        افزودن، ویرایش، قیمت‌گذاری و حذف خدمات و دسته‌بندی‌ها. این فهرست همان چیزی است که در ماشین‌حساب مشتری نمایش داده می‌شود.
      </p>

      <div className="mt-8 rounded-2xl border border-brand-line bg-white p-6">
        <h2 className="text-sm font-bold text-brand-ink-900">افزودن دسته‌بندی جدید</h2>
        <form action={createCategoryAction} className="mt-3 flex flex-wrap gap-3">
          <input
            name="label"
            placeholder="مثلاً «خدمات ثبتی»"
            required
            className="min-w-[240px] flex-1 rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
          />
          <button type="submit" className="rounded-lg bg-brand-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-800">
            افزودن دسته‌بندی
          </button>
        </form>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {allCategories.map((category) => {
          const categoryServices = allServices.filter((s) => s.categoryId === category.id);
          return (
            <div key={category.id} className="rounded-2xl border border-brand-line bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-brand-ink-900">{category.label}</h2>
                <form action={deleteCategoryAction}>
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit" className="text-xs font-medium text-red-600 hover:underline">
                    حذف دسته‌بندی (و خدمات آن)
                  </button>
                </form>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {categoryServices.map((service) => (
                  <form
                    key={service.id}
                    action={updateServiceAction}
                    className="flex flex-wrap items-center gap-2 rounded-xl border border-brand-line bg-brand-cream-50 p-3"
                  >
                    <input type="hidden" name="id" value={service.id} />
                    <input
                      name="name"
                      defaultValue={service.name}
                      className="min-w-[180px] flex-1 rounded-lg border border-brand-line bg-white px-2.5 py-1.5 text-sm outline-none focus:border-brand-green-900/50"
                    />
                    <div className="flex items-center gap-1.5">
                      <input
                        name="priceToman"
                        type="number"
                        min={0}
                        step={1000}
                        defaultValue={service.priceToman}
                        dir="ltr"
                        className="w-32 rounded-lg border border-brand-line bg-white px-2.5 py-1.5 text-sm outline-none focus:border-brand-green-900/50"
                      />
                      <span className="text-xs text-brand-ink-400">تومان</span>
                    </div>
                    <label className="flex items-center gap-1.5 text-xs text-brand-ink-600">
                      <input type="checkbox" name="isActive" defaultChecked={service.isActive} />
                      فعال
                    </label>
                    <button type="submit" className="rounded-lg bg-brand-green-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-green-800">
                      ذخیره
                    </button>
                    <button
                      formAction={deleteServiceAction}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      حذف
                    </button>
                  </form>
                ))}
                {categoryServices.length === 0 && (
                  <p className="text-sm text-brand-ink-400">هنوز خدمتی در این دسته‌بندی ثبت نشده.</p>
                )}
              </div>

              <form action={createServiceAction} className="mt-4 flex flex-wrap items-center gap-2 border-t border-brand-line pt-4">
                <input type="hidden" name="categoryId" value={category.id} />
                <input
                  name="name"
                  placeholder="نام خدمت جدید"
                  required
                  className="min-w-[180px] flex-1 rounded-lg border border-brand-line px-2.5 py-1.5 text-sm outline-none focus:border-brand-green-900/50"
                />
                <input
                  name="priceToman"
                  type="number"
                  min={0}
                  step={1000}
                  placeholder="قیمت (تومان)"
                  dir="ltr"
                  className="w-36 rounded-lg border border-brand-line px-2.5 py-1.5 text-sm outline-none focus:border-brand-green-900/50"
                />
                <button type="submit" className="rounded-lg bg-brand-green-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-green-800">
                  افزودن خدمت
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
