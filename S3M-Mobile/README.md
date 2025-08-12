# S3M E-Sports Mobile App

تطبيق جوال لفريق S3M E-Sports مبني باستخدام React Native و Expo.

## المميزات

- 🏠 الصفحة الرئيسية مع إحصائيات الفريق
- 🏆 قائمة المتصدرين مع الإحصائيات التفصيلية
- 🎮 البطولات والمنافسات
- 📰 الأخبار والتحديثات
- 👤 الملف الشخصي وإدارة الحساب
- 🔐 نظام تسجيل دخول آمن
- 📱 تصميم متجاوب لجميع أحجام الشاشات

## التقنيات المستخدمة

- **React Native** - إطار العمل الأساسي
- **Expo** - منصة التطوير والنشر
- **TypeScript** - لغة البرمجة
- **Supabase** - قاعدة البيانات والمصادقة
- **React Query** - إدارة البيانات
- **Expo Router** - التنقل بين الصفحات

## التشغيل المحلي

```bash
# تثبيت المتطلبات
npm install

# تشغيل التطبيق
npx expo start

# تشغيل على iOS
npx expo start --ios

# تشغيل على Android
npx expo start --android
```

## البناء للإنتاج

```bash
# بناء للـ iOS
eas build --platform ios

# بناء للـ Android
eas build --platform android
```

## الخطوات التالية

1. إضافة الخطوط العربية (Cairo) إلى مجلد assets/fonts
2. إضافة الأيقونات والصور المطلوبة
3. تكوين EAS Build للنشر على App Store و Google Play
4. إضافة Push Notifications
5. تحسين الأداء والتجربة

## الدعم

للدعم والاستفسارات، تواصل مع فريق التطوير.