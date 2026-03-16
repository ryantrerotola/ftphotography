/**
 * Migration script: moves standalone galleryImage documents into the
 * images[] array on their parent galleryCategory documents.
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> \
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> \
 *   NEXT_PUBLIC_SANITY_DATASET=<dataset> \
 *   node scripts/migrate-images-to-categories.mjs
 *
 * What it does:
 *   1. Fetches every galleryImage document with its category reference
 *   2. Groups them by category, sorted by their existing `order` field
 *   3. Patches each galleryCategory to set the `images` array
 *   4. Optionally deletes the old galleryImage documents (--delete flag)
 *
 * Run WITHOUT --delete first to verify, then re-run WITH --delete to clean up.
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_TOKEN."
  );
  process.exit(1);
}

const shouldDelete = process.argv.includes("--delete");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function migrate() {
  console.log("Fetching all gallery images...");

  const images = await client.fetch(`
    *[_type == "galleryImage"] | order(order asc, date desc) {
      _id,
      title,
      image,
      featured,
      date,
      order,
      "categoryId": category._ref
    }
  `);

  console.log(`Found ${images.length} gallery images.`);

  if (images.length === 0) {
    console.log("No images to migrate. Done!");
    return;
  }

  // Group by category
  const byCategory = {};
  for (const img of images) {
    const catId = img.categoryId;
    if (!catId) {
      console.warn(`  Skipping image "${img.title || img._id}" — no category`);
      continue;
    }
    if (!byCategory[catId]) byCategory[catId] = [];
    byCategory[catId].push(img);
  }

  const categoryIds = Object.keys(byCategory);
  console.log(`Images span ${categoryIds.length} categories.\n`);

  // Fetch category names for logging
  const categories = await client.fetch(
    `*[_type == "galleryCategory" && _id in $ids] { _id, title }`,
    { ids: categoryIds }
  );
  const catNames = Object.fromEntries(categories.map((c) => [c._id, c.title]));

  // Patch each category
  for (const catId of categoryIds) {
    const catImages = byCategory[catId];
    const catName = catNames[catId] || catId;

    console.log(`Migrating ${catImages.length} images → "${catName}"`);

    const arrayItems = catImages.map((img) => ({
      _key: randomUUID().replace(/-/g, "").slice(0, 12),
      _type: "image",
      asset: img.image?.asset,
      hotspot: img.image?.hotspot,
      crop: img.image?.crop,
      title: img.title || undefined,
      featured: img.featured || false,
      date: img.date || undefined,
    }));

    await client
      .patch(catId)
      .set({ images: arrayItems })
      .commit();

    console.log(`  ✓ Patched "${catName}" with ${arrayItems.length} photos`);
  }

  console.log("\nMigration complete!");

  if (shouldDelete) {
    console.log("\nDeleting old galleryImage documents...");
    const imageIds = images.map((img) => img._id);
    // Delete in batches of 50
    for (let i = 0; i < imageIds.length; i += 50) {
      const batch = imageIds.slice(i, i + 50);
      const tx = client.transaction();
      for (const id of batch) {
        tx.delete(id);
      }
      await tx.commit();
      console.log(`  Deleted batch ${Math.floor(i / 50) + 1}`);
    }
    console.log("Old documents deleted.");
  } else {
    console.log(
      "\nOld galleryImage documents were NOT deleted. Re-run with --delete to remove them."
    );
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
