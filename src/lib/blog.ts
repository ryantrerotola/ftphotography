export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

// Blog posts are stored here. To add a new post, add a new object to this array.
// In the future, this can be replaced with a CMS or MDX files.
const posts: BlogPost[] = [
  {
    slug: "what-to-wear-for-your-family-photo-session",
    title: "What to Wear for Your Family Photo Session",
    date: "March 10, 2026",
    category: "Tips & Guides",
    excerpt:
      "Not sure what to wear? Here are my top tips for choosing outfits that look amazing in photos without the stress.",
    content: `
      <p>One of the most common questions I get from clients is: <em>"What should we wear?"</em> And I totally get it — choosing outfits for your whole family can feel overwhelming. But don't worry, I've got you covered!</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Coordinate, Don't Match</h2>
      <p>Gone are the days of everyone wearing the same white shirt and khakis (thank goodness!). Instead, think about choosing a color palette and letting each person express their own style within it.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Stick to Soft, Neutral Tones</h2>
      <p>Earth tones, muted blues, creams, soft greens, and dusty pinks photograph beautifully. These colors work in almost any outdoor setting and won't distract from the most important thing — your faces and expressions.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Avoid These Common Mistakes</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Large logos or graphic tees</li>
        <li>Neon or overly bright colors</li>
        <li>All-black outfits (they absorb light)</li>
        <li>Brand-new shoes that might cause blisters</li>
      </ul>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Texture Is Your Friend</h2>
      <p>Knits, denim, linen, lace — mixing textures adds visual interest to your photos. A chunky knit sweater next to a flowy dress creates a beautiful contrast.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">When in Doubt, Ask Me!</h2>
      <p>After booking, I send a detailed style guide with specific suggestions based on your session location and time of year. I'm always happy to review outfit choices before your session day!</p>
    `,
  },
  {
    slug: "best-photo-locations-southern-maine",
    title: "The Best Photo Locations in Southern Maine",
    date: "February 25, 2026",
    category: "Local Guide",
    excerpt:
      "From rocky coastlines to charming downtown streets, here are my favorite spots for portrait sessions in Southern Maine.",
    content: `
      <p>Southern Maine is an absolute dream for photography. Between the dramatic coastline, charming New England architecture, and lush forests, there's no shortage of stunning backdrops. Here are some of my favorites:</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Fort Williams Park, Cape Elizabeth</h2>
      <p>Home to Portland Head Light, this park offers ocean views, rocky shores, and sprawling green fields. It's perfect for families who want that classic Maine feel. Pro tip: go during golden hour for the most incredible light on the lighthouse.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Wolfe's Neck Woods State Park, Freeport</h2>
      <p>If you love a woodland vibe, this is the spot. Tall pines, dappled light, and a peaceful atmosphere make it ideal for intimate couples sessions or maternity shoots.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Old Port, Portland</h2>
      <p>The cobblestone streets, brick buildings, and colorful storefronts of Portland's Old Port add an urban charm that's perfect for senior portraits and engagement sessions.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Kettle Cove, Cape Elizabeth</h2>
      <p>A more secluded beach with soft sand and beautiful light. Wonderful for laid-back family sessions where kids can run and play in the waves.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">Your Own Backyard</h2>
      <p>Some of my favorite sessions have taken place right at home! There's something special about capturing your family in the place where life actually happens. Don't underestimate the beauty of your own space.</p>
    `,
  },
  {
    slug: "why-golden-hour-makes-the-best-photos",
    title: "Why Golden Hour Makes the Best Photos",
    date: "February 10, 2026",
    category: "Photography Tips",
    excerpt:
      "That magical hour before sunset isn't just beautiful — it's the secret to the most flattering, glowing portraits.",
    content: `
      <p>If you've ever scrolled through photography feeds and wondered why some portraits have that warm, dreamy glow — the secret is golden hour. It's the roughly one-hour window before sunset (and just after sunrise) when the sun sits low on the horizon, casting the most beautiful light imaginable.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">What Makes It So Special?</h2>
      <p>During golden hour, sunlight travels through more of the atmosphere, which filters out harsh blue tones and leaves behind warm, soft, golden light. This means:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>No squinting:</strong> The low angle means light comes from the side, not above, so nobody's squinting into the sun</li>
        <li><strong>Flattering skin tones:</strong> Warm light makes everyone's skin look healthy and radiant</li>
        <li><strong>Beautiful backlight:</strong> That gorgeous "glow" behind your hair? That's golden hour magic</li>
        <li><strong>Soft shadows:</strong> No harsh under-eye shadows or unflattering contrasts</li>
      </ul>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">When Is Golden Hour?</h2>
      <p>It changes with the seasons! In summer here in Maine, golden hour can start around 7:00–7:30 PM. In fall and winter, it can be as early as 3:30–4:00 PM. I always plan session times around the best light.</p>

      <h2 class="font-heading text-2xl text-warm-900 mt-8 mb-4">What If Golden Hour Doesn't Work With Our Schedule?</h2>
      <p>Don't worry — I'm an expert at finding beautiful light at any time of day. Open shade, overcast skies, and indoor window light are all wonderful alternatives. The most important thing is that we find a time that works for your family!</p>
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
