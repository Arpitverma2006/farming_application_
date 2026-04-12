from pathlib import Path

# import os
# from dotenv import load_dotenv

# load_dotenv()

# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# print("KEY LOADED:", GROQ_API_KEY)  # Should NOT be None

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-o0=@(lh&t!v%@nh45uuqe$-c+m*i5hhs23(t$nj5g22$6tc!y9'

DEBUG = True

ALLOWED_HOSTS = []

# ✅ Applications
INSTALLED_APPS = [
    'corsheaders',          # ✅ CORS
    'farming',
    'crops',
    'rest_framework', 
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# ✅ Middleware (FIXED ORDER 🔥)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # ✅ MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',   # ✅ only once
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]

ROOT_URLCONF = 'farming_app.urls'

# ✅ CORS SETTINGS (IMPORTANT 🔥)
CORS_ALLOW_ALL_ORIGINS = True

# (Better option - use this instead of above in production)
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
# ]

# (Optional but helpful for POST requests)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'farming_app.wsgi.application'

# ✅ Database (PostgreSQL)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "farmingapp",
        "USER": "arpit",
        "PASSWORD": "Farming1234",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'