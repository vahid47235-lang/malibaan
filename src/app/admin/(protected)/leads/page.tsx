import { desc } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { toPersianDigits, formatJalaliDate } from "@/lib/utils";
import { deleteLeadAction } from "./actions";

const sourceLabels: Record<string, string> = {
  contact_form: "فرم تماس با ما",
  consultation_form: "فرم مشاوره رایگان",
  calculator: "ماشین‌حساب قیمت",
  popup: "پاپ‌آپ",
};

export default async function AdminLeadsPage() {
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink-900">لیدهای دریافتی</h1>
      <p className="mt-1.5 text-sm text-brand-ink-600">تمام تماس‌های ثبت‌شده از فرم‌ها، ماشین‌حساب و پاپ‌آپ سایت.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-brand-line text-start text-xs text-brand-ink-400">
              <th className="p-4 text-start">تاریخ</th>
              <th className="p-4 text-start">نام</th>
              <th className="p-4 text-start">شماره تماس</th>
              <th className="p-4 text-start">منبع</th>
              <th className="p-4 text-start">مبلغ پیش‌فاکتور</th>
              <th className="p-4 text-start">کد معرف</th>
              <th className="p-4 text-start">توضیح</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {allLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-brand-line last:border-0">
                <td className="whitespace-nowrap p-4 text-brand-ink-600">
                  {formatJalaliDate(lead.createdAt.toISOString().slice(0, 10))}
                </td>
                <td className="p-4 text-brand-ink-900">{lead.name || "—"}</td>
                <td className="whitespace-nowrap p-4 text-brand-ink-900" dir="ltr">
                  {lead.phone}
                </td>
                <td className="p-4 text-brand-ink-600">{sourceLabels[lead.source] ?? lead.source}</td>
                <td className="whitespace-nowrap p-4 text-brand-ink-900">
                  {lead.quoteTotalToman ? `${toPersianDigits(lead.quoteTotalToman.toLocaleString("en-US"))} تومان` : "—"}
                </td>
                <td className="p-4 text-brand-ink-600" dir="ltr">
                  {lead.referralCode || "—"}
                </td>
                <td className="max-w-xs truncate p-4 text-brand-ink-600">{lead.message || "—"}</td>
                <td className="p-4">
                  <form action={deleteLeadAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button type="submit" className="text-xs font-medium text-red-600 hover:underline">
                      حذف
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allLeads.length === 0 && <p className="p-6 text-sm text-brand-ink-400">هنوز لیدی ثبت نشده.</p>}
      </div>
    </div>
  );
}
