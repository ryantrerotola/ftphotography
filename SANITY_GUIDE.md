# Francesca Trerotola Photography — Sanity CMS Startup Guide

Everything you need to populate your website with real content. Follow these steps in order.

---

## STEP 1: Log Into Sanity Studio

1. Open your browser
2. Go to `http://localhost:3000/studio` (or your live site URL + `/studio`)
3. Sign in with your Sanity account (the one you created at sanity.io)
4. You'll see a left sidebar with these sections:
   - **Gallery Category**
   - **Gallery Image**
   - **Testimonial**
   - **About Page**

---

## STEP 2: Set Up Your About Page (1 document)

This is the easiest one — there's only one document to create.

Click **"About Page"** in the sidebar, then click the **+** button to create a new document.

### Fields to fill in:

| Field | What to upload | Where it appears on the site |
|---|---|---|
| **Headshot** | A professional photo of you (vertical/portrait orientation works best, at least 1400px wide) | About page — next to "My Story" |
| **Home Page Photo** | A lifestyle photo of you — shooting, laughing, being yourself (vertical orientation, at least 1600px wide) | Home page — "Meet Francesca" section |
| **Bio** | You can leave this blank for now — the site has your bio hardcoded already | About page (future use) |

### Tips for these photos:
- Use your best, most approachable photo for the Home Page Photo — this is the first impression
- The headshot can be more "professional" since it's on the About page
- Both images get cropped to vertical rectangles, so make sure your face isn't at the very edge
- After uploading, click on the image and drag the **hotspot circle** over your face — this tells the site where to crop

**Click "Publish" (bottom right) when done.**

---

## STEP 3: Create Your 6 Gallery Categories

Click **"Gallery Category"** in the sidebar. You need to create **6 separate documents** — one for each type of photography you offer.

Create them in this exact order (click **+** for each new one):

### Category 1: Families

| Field | What to enter |
|---|---|
| **Title** | `Families` |
| **Slug** | Click "Generate" — it will create `families` |
| **Description** | `Joyful, authentic family sessions in beautiful Maine locations` |
| **Cover Image** | Upload your single BEST family photo (vertical, at least 1200px wide) |
| **Display Order** | `1` |

### Category 2: Weddings

| Field | What to enter |
|---|---|
| **Title** | `Weddings` |
| **Slug** | Click "Generate" → `weddings` |
| **Description** | `Every heartfelt moment from your most special day` |
| **Cover Image** | Your single BEST wedding photo (vertical) |
| **Display Order** | `2` |

### Category 3: Engagements & Proposals

| Field | What to enter |
|---|---|
| **Title** | `Engagements & Proposals` |
| **Slug** | Click "Generate" → `engagements-proposals` |
| **Description** | `Celebrating love stories in their most exciting chapter` |
| **Cover Image** | Your single BEST engagement/proposal photo (vertical) |
| **Display Order** | `3` |

### Category 4: Senior Portraits

| Field | What to enter |
|---|---|
| **Title** | `Senior Portraits` |
| **Slug** | Click "Generate" → `senior-portraits` |
| **Description** | `Milestone portraits full of personality and style` |
| **Cover Image** | Your single BEST senior portrait (vertical) |
| **Display Order** | `4` |

### Category 5: Headshots

| Field | What to enter |
|---|---|
| **Title** | `Headshots` |
| **Slug** | Click "Generate" → `headshots` |
| **Description** | `Professional, approachable portraits for your brand` |
| **Cover Image** | Your single BEST headshot example (vertical) |
| **Display Order** | `5` |

### Category 6: Pets

| Field | What to enter |
|---|---|
| **Title** | `Pets` |
| **Slug** | Click "Generate" → `pets` |
| **Description** | `Because your furry family members deserve the spotlight too` |
| **Cover Image** | Your single BEST pet photo (vertical) |
| **Display Order** | `6` |

**Click "Publish" after creating each one.**

### Tips for cover images:
- These 6 photos are the FIRST thing people see on your Portfolio page
- They display as tall vertical rectangles (4:5 ratio) — choose photos that look great cropped that way
- Pick your most eye-catching, emotional image for each category
- Set the hotspot on each image over the most important part (faces, eyes, etc.)

---

## STEP 4: Upload Your Featured Gallery Images (up to 8)

These are the photos that appear in the **"Latest Sessions"** section at the bottom of your Portfolio page. Think of these as your highlight reel — the 8 photos you're most proud of right now.

Click **"Gallery Image"** in the sidebar. Click **+** to create a new one.

### For each of the 8 images:

| Field | What to enter |
|---|---|
| **Image** | Upload the photo (at least 800px wide) |
| **Title** | A short, descriptive title for SEO (see examples below) |
| **Category** | Click and select the matching category (Families, Weddings, etc.) |
| **Featured** | **Toggle this ON** (this is what puts it in the Latest Sessions grid) |
| **Date** | The date of the session (helps with sorting — newest first) |
| **Display Order** | `1` through `8` (controls left-to-right, top-to-bottom order) |

### Example titles (good for SEO):

| Photo of... | Good title |
|---|---|
| Family on the beach | `Johnson Family Beach Session — Scarborough Maine` |
| Wedding first dance | `Romantic First Dance — Kennebunkport Wedding` |
| Engagement at Portland Head Light | `Portland Head Light Engagement — Cape Elizabeth` |
| Senior portrait in fall leaves | `Fall Senior Portrait — Cumberland Maine` |
| Professional headshot | `Creative Professional Headshot — Portland Maine` |
| Dog at the park | `Golden Retriever Portrait — Mackworth Island` |
| Couple at sunset | `Sunset Engagement Session — Old Orchard Beach` |
| Family holiday session | `Holiday Family Mini Session — Southern Maine` |

### Tips:
- Mix up the categories — don't put 8 family photos. Show variety
- Include location names in titles — this helps you show up in Google searches for "Maine photographer"
- Photos 1, 4, 7 display taller (3:4 ratio), the rest display square — plan accordingly
- You can change these seasonally to keep things fresh

**Click "Publish" after each one.**

---

## STEP 5: Add Your Testimonials (at least 3)

These replace the placeholder quotes on your Home page under "What Clients Are Saying."

Click **"Testimonial"** in the sidebar. Click **+** for each new review.

| Field | What to enter |
|---|---|
| **Quote** | The full review text (copy from Google, Facebook, etc.) |
| **Client Name** | Their name (e.g., `Sarah M.` or `Emily & Jake`) |
| **Session Type** | What kind of session it was (e.g., `Family Session`, `Wedding`, `Engagement Session`, `Senior Portraits`) |
| **Rating** | `5` (assuming these are your best reviews!) |
| **Google Review URL** | Paste the link to the original review if it's on Google (optional) |
| **Display Order** | `1`, `2`, `3`, etc. |

### Tips:
- 3 testimonials show on the home page — pick your most glowing reviews
- Try to include one from each major category (family, wedding, portrait)
- Keep quotes to 2-3 sentences for best visual appearance
- You can add as many as you want — only the first 3 will show based on display order

**Click "Publish" after each one.**

---

## STEP 6: Upload Additional Gallery Images (optional, for future use)

Beyond the 8 featured images, you can upload as many Gallery Images as you want. These are stored and organized by category for when category-specific gallery pages are built out later.

Same process as Step 4, but leave **Featured = OFF**.

---

## WHAT'S NOT IN SANITY (yet)

These items are currently hardcoded in the website code and can't be changed from Studio:

| Item | Where it is | How to change it |
|---|---|---|
| Blog posts & blog images | Blog page | Currently hardcoded — ask your developer to wire these to Sanity |
| Open Graph share image | Shows when you share the site on social media | Place a file called `og.jpg` in the `/public/images/` folder (1200x630px) |
| Services & pricing | Services page | Ask your developer to update the code |
| Booking availability calendar | Booking page | Ask your developer to update the code |
| Bio text on About page | About page | Currently hardcoded — the Sanity bio field exists but isn't wired up yet |
| Bio text on Home page | Home page "Meet Francesca" section | Ask your developer to update the code |

---

## IMAGE SIZE CHEAT SHEET

| Where | Minimum width | Orientation | Aspect ratio |
|---|---|---|---|
| Home — your portrait | 1600px | Vertical | 4:5 |
| About — headshot | 1400px | Vertical | 3:4 |
| Portfolio — category covers | 1200px | Vertical | 4:5 |
| Portfolio — featured grid | 800px | Vertical or Square | 3:4 or 1:1 |
| Open Graph image | 1200px | Horizontal | ~1.9:1 (1200x630) |

### General image rules:
- Bigger is better — Sanity and Next.js will resize them automatically
- Always use high-quality JPGs (not screenshots or phone-quality crops)
- File names don't matter — Sanity renames them automatically
- Set the **hotspot** on every image by clicking on it after upload and dragging the circle to the focal point (usually faces)

---

## AFTER YOU'RE DONE

1. Go to your website's home page and refresh
2. Your photos should appear within a few seconds
3. If you don't see changes, try a hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
4. If images still don't appear, your Sanity project may need CORS configured — go to sanity.io/manage → your project → API → CORS Origins → add your website URL

---

## QUICK REFERENCE: Everything You Need to Create

| What to create | How many | Section in Studio |
|---|---|---|
| About Page document | 1 | About Page |
| Gallery Categories | 6 | Gallery Category |
| Featured Gallery Images | 8 | Gallery Image (featured=ON) |
| Testimonials | 3+ | Testimonial |
| **Total items to create** | **18+** | |

Do them in order: About Page → Categories → Featured Images → Testimonials.
