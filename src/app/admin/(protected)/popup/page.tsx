import { asc } from "drizzle-orm";
import { db } from "@/db";
import { popupVariants } from "@/db/schema";
import { updateVariantAction, resetStatsAction } from "./actions";

export default async function AdminPopupPage() {
  const variants = await db.select().from(popupVariants).orderBy(asc(popupVariants.variantKey));

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink-900">پاپ‌آپ تماس + A/B تست</h1>
      <p className="mt-1.5 text-sm text-brand-ink-600">
        متن، تأخیر نمایش و سهم ترافیک هر نسخه را تنظیم کنید. هر بازدیدکننده تصادفی (بر اساس سهم درصدی) به یکی از نسخه‌ها
        اختصاص داده می‌شود و همان نسخه در بازدیدهای بعدی‌اش حفظ می‌شود.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {variants.map((variant) => {
          const rate = variant.impressions > 0 ? ((variant.submissions / variant.impressions) * 100).toFixed(1) : "۰";
          return (
            <div key={variant.id} className="rounded-2xl border border-brand-line bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-brand-ink-900">نسخه {variant.variantKey}</h2>
                <span className="text-xs text-brand-ink-400">
                  {variant.impressions} نمایش · {variant.submissions} ثبت‌نام · نرخ تبدیل {rate}٪
                </span>
              </div>

              <form action={updateVariantAction} className="mt-4 flex flex-col gap-3">
                <input type="hidden" name="id" value={variant.id} />
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink-900">عنوان</label>
                  <input
                    name="title"
                    defaultValue={variant.title}
                    required
                    className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink-900">توضیح</label>
                  <textarea
                    name="description"
                    defaultValue={variant.description}
                    rows={3}
                    required
                    className="w-full resize-none rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink-900">متن دکمه</label>
                  <input
                    name="ctaLabel"
                    defaultValue={variant.ctaLabel}
                    required
                    className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 text-sm text-brand-ink-600">
                    تأخیر نمایش (ثانیه)
                    <input
                      name="delaySeconds"
                      type="number"
                      min={0}
                      dir="ltr"
                      defaultValue={variant.delaySeconds}
                      className="w-20 rounded-lg border border-brand-line px-2 py-1.5 text-sm"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-brand-ink-600">
                    سهم ترافیک (٪)
                    <input
                      name="weightPercent"
                      type="number"
                      min={0}
                      max={100}
                      dir="ltr"
                      defaultValue={variant.weightPercent}
                      className="w-20 rounded-lg border border-brand-line px-2 py-1.5 text-sm"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-brand-ink-600">
                    <input type="checkbox" name="isActive" defaultChecked={variant.isActive} />
                    فعال
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <button type="submit" className="rounded-lg bg-brand-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-800">
                    ذخیره
                  </button>
                  <button
                    formAction={resetStatsAction}
                    className="rounded-lg border border-brand-line px-4 py-2 text-sm font-medium text-brand-ink-600 hover:bg-brand-cream-100"
                  >
                    ریست آمار
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
