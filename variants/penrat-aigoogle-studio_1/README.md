# ✨ PixShop - AI Photo Studio

تطبيق متكامل لتجربة Google AI Studio بواجهة نظيفة وأنيقة، مع شاشة تحميل جميلة.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/hussamgalal999/pixshop)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🎯 المميزات

| الميزة | الوصف |
|--------|-------|
| 🎬 **شاشة تحميل** | شاشة تحميل أنيقة تظهر قبل التطبيق |
| 🧹 **واجهة نظيفة** | إخفاء جميع عناصر UI غير المرغوبة |
| 📱 **شاشة كاملة** | توسيع المحتوى للشاشة الكاملة |
| 🚀 **تلقائي** | يعمل تلقائياً بدون تدخل يدوي |
| 🎨 **تصميم حديث** | تدرجات لونية وأنيميشن سلسة |

---

## 📁 محتويات المشروع

```
pixshop/
├── 📱 android-app/              # تطبيق Android
│   └── app/src/main/
│       ├── java/.../MainActivity.java
│       └── res/
│           ├── layout/activity_main.xml
│           └── values/ (colors.xml, strings.xml)
├── 🔌 chrome-extension/         # إضافة Chrome
│   ├── manifest.json
│   ├── popup.html
│   ├── scripts/
│   │   ├── content.js           # v6.0 with Loading Screen
│   │   ├── background.js
│   │   └── popup.js
│   └── styles/
│       └── hide-elements.css
├── 📄 bookmarklet.html          # Bookmarklet للاستخدام السريع
└── 📄 README.md
```

---

## 🚀 طرق الاستخدام

### 1️⃣ Chrome Extension (الأفضل) ⭐

الحل الأمثل والدائم مع شاشة تحميل جميلة.

**طريقة التثبيت:**

1. افتح Chrome وانتقل إلى: `chrome://extensions/`
2. فعّل **وضع المطور** (Developer mode) من أعلى اليمين
3. انقر على **"تحميل موسع غير مُعبأ"** (Load unpacked)
4. اختر مجلد: `chrome-extension`
5. ستظهر أيقونة ✨ الإضافة في شريط الأدوات

**المميزات:**
- ✅ شاشة تحميل أنيقة (جديد!)
- ✅ تعمل تلقائياً على AI Studio
- ✅ إخفاء جميع العناصر المشتتة
- ✅ واجهة popup أنيقة

---

### 2️⃣ Android App (للموبايل) 📱

تطبيق Android متكامل مع شاشة تحميل.

**الميزات:**
- ✅ شاشة تحميل مع شعار PixShop
- ✅ وضع ملء الشاشة
- ✅ تنظيف تلقائي للواجهة
- ✅ Desktop User Agent للتوافق الأفضل

**للبناء:**
```bash
cd android-app
./gradlew assembleDebug
```

---

### 3️⃣ Bookmarklet (سريع وبسيط)

حل سريع بدون تثبيت.

**طريقة التثبيت:**
1. افتح ملف `bookmarklet.html` في المتصفح
2. اسحب الزر إلى شريط المفضلة
3. افتح Google AI Studio
4. انقر على الـ Bookmarklet

---

## 🙈 العناصر التي يتم إخفاؤها

| العنصر | الوصف |
|--------|-------|
| الشريط الجانبي | Code Assistant, Sidebar |
| الشريط العلوي | Header, Title Bar |
| أزرار التحكم | Preview/Code tabs |
| التذييل | Footer, Branding |

---

## 🎨 شاشة التحميل

شاشة التحميل الجديدة تتضمن:
- شعار ✨ PixShop بتدرج لوني
- دائرة تحميل متحركة
- نص "جاري التحميل..."
- شريط تقدم متحرك
- تأثير اختفاء سلس

---

## 📦 الإصدارات

| الإصدار | التاريخ | التغييرات |
|---------|---------|-----------|
| v2.0.0 | 2026-01-09 | شاشة تحميل، تحديث العلامة التجارية |
| v1.0.0 | 2026-01-07 | الإصدار الأول |

---

## 📞 الدعم

للمساعدة أو الإبلاغ عن مشاكل:
- [GitHub Issues](https://github.com/hussamgalal999/pixshop/issues)

---

*Made with ❤️ by PixShop Team*
