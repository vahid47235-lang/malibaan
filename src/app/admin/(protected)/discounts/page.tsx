import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { categories, services, discountRules, referralCodes, settings } from "@/db/schema";
import {
  createRuleAction,
  toggleRuleAction,
  deleteRuleAction,
  createReferralCodeAction,
  toggleReferralCodeAction,
  deleteReferralCodeAction,
  updateMaxDiscountAction,
} from "./actions";

export default async function AdminDiscountsPage() {
  const [allServices, allCategories, allRules, allReferralCodes, [maxDiscountSetting]] = await Promise.all([
    db.select().from(services).orderBy(asc(services.sortOrder)),
    db.select().from(categories).orderBy(asc(categories.sortOrder)),
    db.select().from(discountRules).orderBy(asc(discountRules.id)),
    db.select().from(referralCodes).orderBy(asc(referralCodes.id)),
    db.select().from(settings).where(eq(settings.key, "maxTotalDiscountPercent")),
  ]);

  const categoryById = new Map(allCategories.map((c) => [c.id, c.label]));
  const serviceById = new Map(allServices.map((s) => [s.id, s.name]));
  const maxDiscount = (maxDiscountSetting?.value as number | undefined) ?? 50;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink-900">تخفیف‌ها و کد معرف</h1>
      <p className="mt-1.5 text-sm text-brand-ink-600">
        منطق محاسبه تخفیف ماشین‌حساب مشتری از همین‌جا کنترل می‌شود. از بین قوانین باندلی که با سبد مشتری مطابقت دارند، فقط
        بیشترین تخفیف اعمال می‌شود؛ تخفیف کد معرف جدا و روی آن جمع می‌شود.
      </p>

      {/* Max discount cap */}
      <div className="mt-8 rounded-2xl border border-brand-line bg-white p-6">
        <h2 className="text-sm font-bold text-brand-ink-900">سقف مجموع تخفیف</h2>
        <p className="mt-1 text-xs text-brand-ink-400">جمع تخفیف باندل + کد معرف هیچ‌وقت از این عدد بیشتر نمی‌شود.</p>
        <form action={updateMaxDiscountAction} className="mt-3 flex items-center gap-3">
          <input
            name="maxTotalDiscountPercent"
            type="number"
            min={0}
            max={100}
            defaultValue={maxDiscount}
            dir="ltr"
            className="w-28 rounded-lg border border-brand-line px-2.5 py-1.5 text-sm outline-none focus:border-brand-green-900/50"
          />
          <span className="text-sm text-brand-ink-600">درصد</span>
          <button type="submit" className="rounded-lg bg-brand-green-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-green-800">
            ذخیره
          </button>
        </form>
      </div>

      {/* Bundle rules */}
      <div className="mt-8 rounded-2xl border border-brand-line bg-white p-6">
        <h2 className="text-sm font-bold text-brand-ink-900">قوانین تخفیف باندلی</h2>
        <div className="mt-4 flex flex-col gap-2">
          {allRules.map((rule) => (
            <div key={rule.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-line bg-brand-cream-50 p-3">
              <div>
                <p className="text-sm font-bold text-brand-ink-900">
                  {rule.label} — {rule.discountPercent}٪
                </p>
                <p className="mt-1 text-xs text-brand-ink-400">
                  {rule.minCategories ? `حداقل ${rule.minCategories} دسته‌بندی` : ""}
                  {rule.minCategories && rule.minServices ? " · " : ""}
                  {rule.minServices ? `حداقل ${rule.minServices} خدمت` : ""}
                  {rule.requiredCategoryIds && rule.requiredCategoryIds.length > 0
                    ? ` · شامل دسته‌بندی‌های: ${rule.requiredCategoryIds.map((id) => categoryById.get(id) ?? id).join("، ")}`
                    : ""}
                  {rule.requiredServiceIds && rule.requiredServiceIds.length > 0
                    ? ` · شامل خدمات: ${rule.requiredServiceIds.map((id) => serviceById.get(id) ?? id).join("، ")}`
                    : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <form action={toggleRuleAction}>
                  <input type="hidden" name="id" value={rule.id} />
                  <input type="hidden" name="isActive" value={String(rule.isActive)} />
                  <button type="submit" className="rounded-lg border border-brand-line px-3 py-1.5 text-xs font-medium hover:bg-white">
                    {rule.isActive ? "فعال" : "غیرفعال"}
                  </button>
                </form>
                <form action={deleteRuleAction}>
                  <input type="hidden" name="id" value={rule.id} />
                  <button type="submit" className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                    حذف
                  </button>
                </form>
              </div>
            </div>
          ))}
          {allRules.length === 0 && <p className="text-sm text-brand-ink-400">هنوز قانون تخفیفی تعریف نشده.</p>}
        </div>

        <form action={createRuleAction} className="mt-6 flex flex-col gap-3 border-t border-brand-line pt-5">
          <p className="text-sm font-bold text-brand-ink-900">افزودن قانون جدید</p>
          <input
            name="label"
            placeholder="عنوان قانون (مثلاً «ثبت شرکت + مالی + بیمه + نرم‌افزار»)"
            required
            className="rounded-lg border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
          />
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm text-brand-ink-600">
              حداقل تعداد دسته‌بندی
              <input name="minCategories" type="number" min={0} dir="ltr" className="w-20 rounded-lg border border-brand-line px-2 py-1.5 text-sm" />
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-ink-600">
              حداقل تعداد خدمت
              <input name="minServices" type="number" min={0} dir="ltr" className="w-20 rounded-lg border border-brand-line px-2 py-1.5 text-sm" />
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-ink-600">
              درصد تخفیف
              <input name="discountPercent" type="number" min={0} max={100} step="0.5" required dir="ltr" className="w-24 rounded-lg border border-brand-line px-2 py-1.5 text-sm" />
            </label>
          </div>
          <div>
            <p className="mb-2 text-xs text-brand-ink-600">
              یا برای «فقط اگر مشتری از هرکدام از این دسته‌بندی‌ها حداقل یک خدمت انتخاب کرد» (مثلاً ثبت شرکت + مالی و
              مدیریتی + بیمه + نرم‌افزار)، دسته‌بندی‌های لازم را انتخاب کنید (اختیاری):
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {allCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 text-xs text-brand-ink-700">
                  <input type="checkbox" name="requiredCategoryIds" value={category.id} />
                  {category.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-brand-ink-600">
              یا برای «فقط اگر دقیقاً این خدمات با هم انتخاب شدند»، خدمات مشخص را انتخاب کنید (اختیاری):
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {allServices.map((service) => (
                <label key={service.id} className="flex items-center gap-2 text-xs text-brand-ink-700">
                  <input type="checkbox" name="requiredServiceIds" value={service.id} />
                  {categoryById.get(service.categoryId)} — {service.name}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="mt-2 w-fit rounded-lg bg-brand-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-800">
            افزودن قانون
          </button>
        </form>
      </div>

      {/* Referral codes */}
      <div className="mt-8 rounded-2xl border border-brand-line bg-white p-6">
        <h2 className="text-sm font-bold text-brand-ink-900">کدهای معرف</h2>
        <div className="mt-4 flex flex-col gap-2">
          {allReferralCodes.map((referral) => (
            <div key={referral.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-line bg-brand-cream-50 p-3">
              <p className="text-sm font-bold text-brand-ink-900" dir="ltr">
                {referral.code} — {referral.discountPercent}٪ {referral.ownerName ? `(${referral.ownerName})` : ""}
              </p>
              <div className="flex items-center gap-2">
                <form action={toggleReferralCodeAction}>
                  <input type="hidden" name="id" value={referral.id} />
                  <input type="hidden" name="isActive" value={String(referral.isActive)} />
                  <button type="submit" className="rounded-lg border border-brand-line px-3 py-1.5 text-xs font-medium hover:bg-white">
                    {referral.isActive ? "فعال" : "غیرفعال"}
                  </button>
                </form>
                <form action={deleteReferralCodeAction}>
                  <input type="hidden" name="id" value={referral.id} />
                  <button type="submit" className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                    حذف
                  </button>
                </form>
              </div>
            </div>
          ))}
          {allReferralCodes.length === 0 && <p className="text-sm text-brand-ink-400">هنوز کد معرفی ثبت نشده.</p>}
        </div>

        <form action={createReferralCodeAction} className="mt-6 flex flex-wrap items-center gap-3 border-t border-brand-line pt-5">
          <input name="code" placeholder="کد (مثلاً ALI5)" required dir="ltr" className="w-40 rounded-lg border border-brand-line px-3 py-2 text-sm" />
          <input name="ownerName" placeholder="نام معرف (اختیاری)" className="w-48 rounded-lg border border-brand-line px-3 py-2 text-sm" />
          <input name="discountPercent" type="number" min={0} max={100} step="0.5" placeholder="درصد تخفیف" required dir="ltr" className="w-28 rounded-lg border border-brand-line px-3 py-2 text-sm" />
          <button type="submit" className="rounded-lg bg-brand-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-800">
            افزودن کد
          </button>
        </form>
      </div>
    </div>
  );
}
