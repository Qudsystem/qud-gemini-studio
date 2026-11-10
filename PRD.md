# 📄 وثيقة متطلبات المنتج (PRD) - الإصدار الشامل
## 🎨 AI Photo Studio - نظام أتمتة Google AI Studio

---

## 🔗 رابط المشروع الأساسي

> [!IMPORTANT]
> **المشروع الأصلي:** [Google AI Studio App](https://ai.studio/apps/drive/1u11BlKEmCusmNyUX3YIWFtPOML-7vXvU)
> 
> هذا المشروع يبني طبقة أتمتة ذكية فوق Google AI Studio لتوفير:
> - واجهة مستخدم مخصصة بدون عناصر العلامة التجارية
> - API داخلي للتكامل مع أي تطبيق
> - نظام موثوق مع استعادة تلقائية للجلسات

---

## 📋 نظرة عامة

| العنصر | التفاصيل |
|--------|----------|
| **اسم المنتج** | AI Photo Studio - نظام أتمتة Google AI Studio |
| **نوع المنتج** | تطبيق ويب لتحرير الصور بالذكاء الاصطناعي + Backend Automation |
| **المنصة الأساسية** | Google AI Studio / Gemini |
| **النوع التقني** | Web Wrapper + Playwright Automation + REST API |
| **الإصدار** | 2.0 |
| **تاريخ التحديث** | 2026-01-07 |

---

## 🎯 الأهداف والمشكلات

### ❌ المشاكل المُعالَجة

1. **لا يوجد API رسمي لـ Google AI Studio**
2. **ظهور عناصر واجهة غير مرغوبة:**
   - شريط العنوان والهيدر
   - رسالة "This app was developed by another user"
   - رابط "Report legal issue"
   - علامات تجارية Google/AppSheet
3. **CORS/Connectivity Issues:**
   - Google تمنع iframes المباشرة
   - Security Headers تمنع التضمين
   - Google Authentication تحتاج تسجيل دخول
4. **Session Expiry ونقص الاستقرار**

### ✅ الحل الشامل

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    تطبيقك       │───▶│   Automation    │───▶│   AI Studio     │
│   (واجهة)       │◀───│   Layer         │◀───│   (منطق)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🏗️ البنية التقنية الكاملة

### هيكل المشروع

```
ai-studio-automation/
├── 📄 server.js              # REST API + Automation Server
├── 📄 index.html             # واجهة المستخدم المتكاملة
├── 📄 service-worker.js      # للتحكم في الطلبات
├── 📄 manifest.json          # PWA manifest
├── 📄 package.json           # اعتماديات Node.js
├── 📄 Dockerfile             # للتشغيل المحمول
├── 📄 docker-compose.yml     # للتشغيل السهل
├── 📄 .env                   # الإعدادات البيئية
├── 📁 chrome-extension/      # إضافة Chrome
│   ├── manifest.json
│   ├── content.js
│   └── hide-elements.css
├── 📁 styles/
│   └── main.css
├── 📁 scripts/
│   └── app.js
├── 📁 uploads/               # ملفات مرفوعة
├── 📁 sessions/              # جلسات محفوظة
├── 📁 logs/                  # سجلات النظام
└── 📁 cache/                 # ملفات مؤقتة
```

---

## 🔧 المتطلبات الوظيفية التفصيلية

### 1. نظام إخفاء العناصر (UI Hiding) - 4 حلول

| الحل | الفعالية | التعقيد | الوصف |
|------|----------|---------|-------|
| **CSS Injection + MutationObserver** | متوسطة | منخفض | حقن CSS في iframe مع مراقبة التغييرات |
| **Service Worker** | عالية جداً | عالي | اعتراض الطلبات وتعديل HTML |
| **Chrome Extension** | كاملة | عالي | تحكم كامل في DOM |
| **Bookmarklet** | أساسية | منخفض | حل سريع يتطلب تفعيل يدوي |

#### عناصر يجب إخفاؤها:

```css
/* العناصر المستهدفة للإخفاء */
[class*="appsheet-chrome-header"]     /* هيدر المنصة */
[class*="app-bar"]                    /* شريط التطبيق */
[class*="appsheet-footer"]            /* الفوتر */
.powered-by-appsheet                  /* علامة تجارية */
.appsheet-branding                    /* براندينج */
header[class*="google"]               /* هيدر Google */
div[class*="banner"]                  /* إعلانات */
div[class*="watermark"]               /* علامات مائية */
/* رسائل التنبيه */
div:contains("This app was developed by another user")
div:contains("Report legal issue")
```

### 2. Automation Server (Backend)

#### المكونات الرئيسية:

| المكون | التقنية | الوظيفة |
|--------|---------|---------|
| **Express Server** | Node.js + Express | REST API Gateway |
| **Browser Automation** | Playwright/Puppeteer | التفاعل مع AI Studio |
| **Session Manager** | Cookies JSON | حفظ/تحميل الجلسات |
| **Rate Limiter** | rate-limiter-flexible | حماية من الإفراط |
| **Queue System** | Bull + Redis | معالجة الطلبات بالترتيب |
| **Logging** | Winston | تسجيل الأحداث والأخطاء |
| **WebSocket** | Socket.IO | تحديثات الوقت الحقيقي |
| **Image Processing** | Sharp | تحسين وضغط الصور |

#### الـ API Endpoints:

```javascript
GET  /health              // فحص صحة النظام
GET  /status              // حالة النظام والجلسة
POST /api/initialize      // تهيئة المتصفح
POST /api/process         // معالجة صورة (توليد/تعديل)
POST /api/batch           // معالجة دفعات (حد أقصى 5)
POST /api/reset           // إعادة تعيين النظام
GET  /health/detailed     // تقرير صحة مفصل
```

#### Request/Response:

```javascript
// POST /api/process
Request: { 
  imageUrl: string,        // رابط الصورة (اختياري)
  prompt: string,          // وصف الصورة
  mode: "generate" | "edit",
  socketId: string         // للتحديثات الحية
}

Response: { 
  success: boolean,
  imageUrl: string,        // رابط/Base64 للنتيجة
  timestamp: string
}
```

### 3. واجهة المستخدم (Frontend)

#### الميزات:

| الميزة | الوصف | الأولوية |
|--------|-------|----------|
| **رفع الصور** | سحب وإفلات + اختيار ملف | 🔴 عالية |
| **معاينة الصورة** | عرض فوري للصورة المرفوعة | 🔴 عالية |
| **حقل البرومبت** | نص متعدد الأسطر مع أمثلة | 🔴 عالية |
| **أزرار العمليات** | توليد جديد / تعديل / تهيئة | 🔴 عالية |
| **شريط التقدم** | تحديث حي للحالة | 🟡 متوسطة |
| **عرض النتيجة** | صورة + معلومات + إجراءات | 🔴 عالية |
| **تحميل الصورة** | حفظ النتيجة محلياً | 🔴 عالية |
| **مشاركة** | Web Share API أو نسخ الرابط | 🟢 منخفضة |
| **إحصائيات** | عداد الصور + معدل النجاح | 🟡 متوسطة |
| **إشعارات** | رسائل نجاح/خطأ منبثقة | 🟡 متوسطة |
| **RTL Support** | دعم اللغة العربية | 🔴 عالية |
| **تصميم متجاوب** | موبايل + ديسكتوب | 🔴 عالية |

### 4. معالجة الصور

| الوضع | الوصف | المتطلبات |
|-------|-------|-----------|
| **Generate** | توليد صورة جديدة من نص | برومبت فقط |
| **Edit** | تعديل صورة موجودة | صورة + برومبت |

#### Pipeline:

```
1. رفع الصورة → تحسين (Sharp) → حفظ مؤقت
2. فتح AI Studio → تسجيل دخول (إذا لزم)
3. رفع الصورة (لو edit) → كتابة البرومبت
4. الضغط على Generate → انتظار النتيجة
5. استخراج URL/Base64 → تنظيف الملفات المؤقتة
6. إرجاع النتيجة للعميل
```

### 5. إدارة الجلسات

| الميزة | الوصف |
|--------|-------|
| **حفظ تلقائي** | حفظ Cookies بعد تسجيل الدخول |
| **تحميل عند البدء** | استعادة الجلسة السابقة |
| **تجديد دوري** | تحديث الجلسة كل ساعة |
| **نسخ احتياطي** | backup تلقائي للجلسات |
| **استعادة تلقائية** | recovery عند انتهاء الجلسة |

### 6. الأمان ومكافحة الحظر

| التقنية | الوصف |
|---------|-------|
| **تأخيرات عشوائية** | 100-800ms بين الإجراءات |
| **User-Agent rotation** | تبديل دوري للهوية |
| **WebDriver bypass** | إزالة navigator.webdriver |
| **HTTPS** | جميع الاتصالات مشفرة |
| **Rate Limiting** | 10 طلبات / 60 ثانية |
| **Authentication** | حماية API (اختياري) |

---

## 📦 الاعتماديات التقنية

### package.json

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "playwright": "^1.40.0",
    "axios": "^1.6.0",
    "form-data": "^4.0.0",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.0",
    "redis": "^4.6.0",
    "bull": "^4.11.0",
    "winston": "^3.11.0",
    "helmet": "^7.1.0",
    "rate-limiter-flexible": "^3.0.9",
    "compression": "^1.7.4",
    "socket.io": "^4.7.0"
  }
}
```

### متطلبات البيئة

```
- Node.js v18+
- Chrome/Chromium
- RAM: 2GB+ (المزيد للـ Headless المتعدد)
- اتصال إنترنت مستقر
- Docker (اختياري)
```

---

## 🐳 إعدادات Docker

### Dockerfile

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-focal
WORKDIR /app
RUN apt-get update && apt-get install -y \
    fonts-arabeyes fonts-noto-color-emoji fonts-noto-cjk
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN mkdir -p uploads sessions logs cache
EXPOSE 3000
ENV NODE_ENV=production AUTO_INITIALIZE=true
CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  ai-studio-proxy:
    build: .
    ports: ["3000:3000"]
    environment:
      - NODE_ENV=production
      - AUTO_INITIALIZE=true
    volumes:
      - ./sessions:/app/sessions
      - ./logs:/app/logs
    restart: unless-stopped
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

---

## 🎨 هوية العلامة التجارية

| اللون | الكود | الاستخدام |
|-------|------|----------|
| 🔵 الأساسي | `#4361ee` | الأزرار والعناوين |
| 🟣 الثانوي | `#3a0ca3` | التدرجات |
| 🔵 النجاح | `#4cc9f0` | حالات النجاح |
| 🔴 التحذير | `#f72585` | حالات الخطأ |
| ⚪ الفاتح | `#f8f9fa` | الخلفيات |
| ⚫ الداكن | `#212529` | النصوص |

---

## 🚀 خطة التنفيذ

| المرحلة | المهام | المدة |
|---------|--------|-------|
| **1️⃣ MVP** | إنشاء Automation Server أساسي | أسبوع 1 |
| **2️⃣ UI** | بناء واجهة المستخدم الكاملة | أسبوع 2 |
| **3️⃣ Integration** | ربط Frontend بـ Backend | أسبوع 3 |
| **4️⃣ Security** | Rate Limiting + مكافحة الحظر | أسبوع 3 |
| **5️⃣ Docker** | Containerization + Deployment | أسبوع 4 |
| **6️⃣ Polish** | اختبار + تحسين + توثيق | أسبوع 4 |

---

## 🌐 خيارات النشر

| المنصة | المميزات | التكلفة |
|--------|----------|---------|
| **DigitalOcean** | Droplets, سهل | $5+/شهر |
| **AWS EC2** | مرونة كبيرة | متغير |
| **Google Cloud** | متكامل مع Google | متغير |
| **Heroku** | سهل جداً | مجاني/مدفوع |
| **Railway** | Deploy سريع | $5+/شهر |

---

## ✅ معايير القبول

- [ ] Server يعمل ويستجيب للطلبات
- [ ] Session تُحفظ وتُستعاد تلقائياً
- [ ] UI تخفي جميع عناصر Google/AppSheet
- [ ] توليد صورة يعمل في < 60 ثانية
- [ ] Rate Limiting يمنع الإفراط
- [ ] WebSocket يبث تحديثات الـ Progress
- [ ] الواجهة متجاوبة على جميع الأجهزة
- [ ] Docker يعمل بدون مشاكل
- [ ] Logs واضحة ومفيدة
- [ ] Error handling سليم

---

## ⚠️ المخاطر والحلول

| المخاطر | الاحتمالية | الحل |
|---------|-----------|------|
| تغيير واجهة AI Studio | عالية | Selectors مرنة + مراقبة دورية |
| حظر من Google | متوسطة | VPN + تأخيرات + rotation |
| انتهاء Session | متوسطة | Auto-recovery + backup |
| CORS يمنع التعديل | عالية | Proxy Server + Extension |
| بطء الأداء | منخفضة | Queue + caching |
| Memory leaks | منخفضة | تنظيف دوري + restart |

---

## 🔧 استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| لا يمكن الاتصال بالسيرفر | تأكد من `docker-compose up -d` |
| فشل تسجيل الدخول | امسح `sessions/` وحاول مرة أخرى |
| بطء في المعالجة | زد RAM في إعدادات Docker |
| انتهاء الجلسة | النظام يعيد التسجيل تلقائياً |
| حظر من Google | استخدم VPN وأضف تأخيرات أكبر |
| رفض الاتصال | استخدم Proxy Server |

---

## 📈 التوسع المستقبلي

1. **Queue System**: Bull + Redis لمعالجة متوازية
2. **Multi-User**: دعم جلسات متعددة
3. **Cloud Storage**: Google Cloud / AWS S3
4. **Analytics**: إحصائيات مفصلة
5. **Webhooks**: إشعارات خارجية
6. **API Keys**: نظام مفاتيح للتكامل

---

## 📚 المراجع

- [Google AI Studio Terms](https://ai.google.dev/gemini-api/terms)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Socket.IO Documentation](https://socket.io/docs/v4/)

---

> [!NOTE]
> هذه الوثيقة حية وقابلة للتحديث مع تطور المشروع.

---

*📅 آخر تحديث: 2026-01-07*
*📌 الإصدار: 2.0 - الشامل*
