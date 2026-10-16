# Money Empire — لعبة ويب قابلة للتثبيت (PWA)
ملفات ثابتة فقط: لا تحتاج npm ولا بناء. لا تستخدم Firestore أو Functions أو FCM أو Firebase Hosting.

## تجربة محلية
`python3 -m http.server 8080` ثم افتح http://localhost:8080  (الـ Service Worker يعمل على localhost أو HTTPS فقط)

## النشر (يلزم HTTPS)
ارفع كل الملفات كما هي إلى أي استضافة ثابتة مجانية تختارها، مثل GitHub Pages أو Netlify أو Cloudflare Pages. ثم:
1. Firebase ← Authentication ← Settings ← Authorized domains: أضف نطاق موقعك.
2. Authentication ← Sign-in method: فعّل Email/Password و Google و Anonymous.
3. Realtime Database: ضع الرابط الصحيح في `databaseURL` داخل `cloud.js`، والصق `database.rules.json` في Rules.

## الإصدار 4: تحالفات وهجمات
- الصق `database.rules.json` الجديد كاملًا (يضيف alliances و chat و attacks و cool).
- قواعد المهلة بين الهجمات تعتمد على `newData.root` ولم تُختبر: إن رُفضت الهجمات، استخدم محاكي القواعد في Firebase Console.
- مكافأة التحالف وتأثير التخريب يُطبَّقان في جهاز اللاعب نفسه (بدون خادم)، ويمكن لمن يعدّل كوده تجاهلهما.
- قوة التحالف مجموع دخل أعضائه كما يعلنونه؛ لا يوجد تحقق خادمي كامل.

## التثبيت
- Android Chrome: ⋮ ← «تثبيت التطبيق» (أو زر التثبيت في الإعدادات داخل اللعبة).
- iPhone Safari: مشاركة ← «إضافة إلى الشاشة الرئيسية».
- Desktop Chrome/Edge: أيقونة التثبيت في شريط العنوان.

## عند تحديث اللعبة
غيّر `V='me-v3'` في `sw.js` إلى رقم أعلى ليحدّث الأجهزة نسختها المخزنة.

## حدود
- الحماية ضد الغش جزئية (قواعد تحدّ سرعة زيادة الثروة لكنها تثق بالدخل المُعلن).
- التقدم محفوظ على الجهاز؛ مسح بيانات المتصفح يمسحه. وضع «لعب محلي» لا يظهر في الترتيب.
- مكتبات Firebase تُحمَّل من gstatic.com وتُخزَّن للاستخدام دون اتصال بعد أول تحميل.

## النشر على Vercel
ارفع محتوى المجلد كما هو (مشروع ثابت: لا Build Command ولا Output Directory). ثم أضف نطاق Vercel (مثل your-app.vercel.app) في Firebase ← Authentication ← Settings ← Authorized domains.

## الأيقونات
الشريط السفلي يستخدم أيقونات Lucide الخمس (house, store, clipboard-list, trophy, user) كـ SVG مضمّنة داخل index.html بدل حزمة npm، ليبقى المشروع ثابتًا ويعمل دون إنترنت.

## الموسيقى
رابط الموسيقى الخارجي موجود في الثابت BGM داخل index.html. تأكد أن لديك ترخيص استخدامه.
