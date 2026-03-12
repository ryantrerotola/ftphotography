# CMS Integration Plan for FT Photography

## CMS Options (Ranked by ease of use + price for a photography site)

### Option 1: Sanity (Recommended)
- **Free tier:** 100 GB asset storage, 100 GB bandwidth/mo, 250K API requests/mo
- **Image handling:** On-the-fly image transformations via CDN (resize, crop, format conversion). Upload originals, serve optimized versions automatically
- **Ease of use:** Polished admin panel (Sanity Studio). Non-technical users can upload and manage photos easily once set up
- **Next.js integration:** First-class `next-sanity` SDK with App Router + Server Components support
- **Upgrade cost:** $15/user/mo if you outgrow free tier
- **No commercial use restriction on free tier**

### Option 2: Payload CMS
- **Free tier:** Fully open source, no limits when self-hosted
- **Image handling:** Built-in upload collections with auto-resize, crop, focal point. Needs external storage (Vercel Blob, S3, R2)
- **Ease of use:** Clean React admin panel, but config is all TypeScript
- **Next.js integration:** Deepest possible — lives inside your Next.js app directory
- **Upgrade cost:** $35/mo for managed Payload Cloud

### Option 3: Strapi (Self-hosted)
- **Free tier:** Fully open source, unlimited when self-hosted
- **Image handling:** Media library with folder organization & bulk uploads. No built-in image transforms (needs Cloudinary/Imgix)
- **Ease of use:** Intuitive admin panel, but requires someone technical to host/maintain
- **Next.js integration:** Good via REST/GraphQL APIs
- **Upgrade cost:** $15/mo for Strapi Cloud

### Avoid
- **Contentful** — free tier now prohibits commercial use; paid starts at $300/mo
- **Hygraph** — paid jump is $299/mo
- **TinaCMS** — Git-backed storage is bad for photo-heavy sites (repo bloat)
- **Cloud CMS** — enterprise-focused, no Next.js ecosystem

---

## Implementation Plan (using Sanity)

### Step 1: Set up Sanity project
- Install `sanity` and `next-sanity` packages
- Create Sanity Studio configuration in the project
- Define content schemas: Portfolio images, Gallery categories, Testimonials, About page content

### Step 2: Create content schemas
- **Gallery Image** schema: image, title, category, date, featured flag
- **Gallery Category** schema: name, description, cover image
- **Testimonial** schema: quote, client name, session type, rating, Google review link
- **About** schema: headshot, bio text
- **Blog Post** schema: title, slug, content, cover image, date

### Step 3: Integrate Sanity with Next.js pages
- Set up Sanity client with API tokens
- Update Portfolio page to fetch images from Sanity
- Update Home page testimonials section to pull from Sanity
- Update About page to pull headshot and bio from Sanity
- Update Blog to optionally pull from Sanity
- Use `next/image` with Sanity's image CDN for optimized delivery

### Step 4: Configure image optimization
- Set up Sanity image URL builder for on-the-fly transforms
- Configure Next.js `images.remotePatterns` for Sanity CDN domain
- Implement responsive image sizes for portfolio gallery

### Step 5: Deploy Sanity Studio
- Embed Sanity Studio at `/studio` route (or deploy separately)
- Configure CORS and authentication
- Test the full upload-to-display workflow

### Step 6: Build and verify
- Run `npm run build` to confirm everything compiles
- Test image upload and display end-to-end
