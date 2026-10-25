# حرفي (Hirfi)

منصة وسيطة تربط العملاء بالحرفيين، مبنية بـ Laravel + Inertia (React + TypeScript) وقاعدة بيانات SQLite.

## المتطلبات

- Git
- Docker و Docker Compose
    - Arch Linux: `sudo pacman -S docker docker-compose`
    - Windows: Docker Desktop مع WSL2 (نفّذ الأوامر من داخل WSL)
    - macOS: Docker Desktop

بعد تثبيت Docker على Linux، شغّل الخدمة وأضف مستخدمك للمجموعة ثم أعد تسجيل الدخول:

```bash
sudo systemctl enable --now docker.service
sudo usermod -aG docker $USER
```

## خطوات التشغيل

### 1. استنسخ المشروع

```bash
git clone https://github.com/shams-addin/Hirfi.git
cd Hirfi
```

### 2. جهّز ملف البيئة

```bash
cp .env.example .env
```

### 3. ثبّت اعتماديات PHP (دون الحاجة إلى PHP على جهازك)

```bash
docker run --rm -v "$(pwd)":/app -w /app laravelsail/php84-composer:latest composer install --ignore-platform-reqs
```

> إن كان إصدار PHP في المشروع مختلفًا فغيّر `php84` إلى الإصدار المناسب.

### 4. شغّل الحاويات

```bash
./vendor/bin/sail up -d
```

### 5. هيّئ التطبيق وقاعدة البيانات

```bash
./vendor/bin/sail artisan key:generate
touch database/database.sqlite
./vendor/bin/sail artisan migrate --seed
```

### 6. ثبّت اعتماديات الواجهة وشغّلها

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

### 7. افتح التطبيق

http://localhost

## أوامر مفيدة

| الأمر                                            | الوظيفة                     |
| ------------------------------------------------ | --------------------------- |
| `./vendor/bin/sail up -d`                        | تشغيل الحاويات              |
| `./vendor/bin/sail down`                         | إيقاف الحاويات              |
| `./vendor/bin/sail artisan migrate`              | تنفيذ migrations الجديدة    |
| `./vendor/bin/sail artisan migrate:fresh --seed` | إعادة بناء القاعدة من الصفر |
| `./vendor/bin/sail test`                         | تشغيل الاختبارات            |

## قواعد العمل في الفريق

1. لا ترفع `.env` ولا `database/database.sqlite` ولا `vendor/` ولا `node_modules/`.
2. أنشئ فرعًا مستقلًا لكل ميزة: `git checkout -b feature/اسم-الميزة`.
3. افتح Pull Request إلى `main` ولا ترفع عليه مباشرة.
4. قبل البدء نفّذ `git pull`، وإن أضاف أحدهم migration جديدًا فنفّذ `sail artisan migrate`.
5. عند تغيير بنية القاعدة أنشئ migration جديدًا ولا تعدّل القديمة بعد رفعها.
