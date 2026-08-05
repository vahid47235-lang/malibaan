import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "4rem 1rem" }}>
        <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>این صفحه پیدا نشد</p>
        <Link href="/" style={{ color: "#0d4214" }}>
          بازگشت به صفحه اصلی
        </Link>
      </body>
    </html>
  );
}
