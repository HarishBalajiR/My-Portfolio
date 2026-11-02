# Image Optimization Guide

## Critical: Optimize Hero Images

Your hero images are **5.8MB total** - they should be under 200KB each!

### Option 1: Online Tools (Quickest)
1. Go to https://squoosh.app/
2. Upload `harish-photo-new.jpg` and `harish-photo-back.jpg`
3. Settings:
   - Format: **WebP** or **AVIF**
   - Quality: **75-80%**
   - Resize: Max width **800px** (they're displayed at ~240px!)
4. Download and replace files

### Option 2: Command Line (Best Quality)
```bash
# Install imagemagick or use sharp-cli
npm install -g sharp-cli

# Convert and optimize
sharp -i src/assets/harish-photo-new.jpg -o src/assets/harish-photo-new.webp --webp-quality 80 --resize 800
sharp -i src/assets/harish-photo-back.jpg -o src/assets/harish-photo-back.webp --webp-quality 80 --resize 800
```

### Expected Results
- Before: 5.8MB
- After: ~50-100KB each
- **Savings: 5.6MB+ (97% reduction!)**

### Other Images to Optimize
- `logo-photo.png`: 2.1MB → should be ~50KB
- `portrait.png`: 76KB → OK, but could be WebP
- `chesscom.png`: 72KB → OK, but could be WebP

## Why This Matters
- **LCP (Largest Contentful Paint)**: Your hero image IS the LCP - this is killing your score
- **Mobile users**: 5.8MB on 3G = 30+ seconds to load
- **SEO**: Google penalizes slow sites
