import type { Metadata } from "next";
import gallery from "@/data/gallery.json";
import { PageShell, Block } from "@/components/PageShell";
import Gallery from "@/components/Gallery";
import FeaturedReel from "@/components/FeaturedReel";

export const metadata: Metadata = { title: "Photos" };

export default function PhotosPage() {
  const { photos, graphics } = gallery;

  return (
    <PageShell
      title="Photos"
      intro="Shots from this season. Full-resolution game photos and team graphics."
    >
      <FeaturedReel />

      <Block label="Gallery">
        <div className="mt-4">
          <Gallery photos={photos} />
        </div>
      </Block>

      {graphics.length > 0 && (
        <Block label="Gameday graphics">
          <div className="mt-4">
            <Gallery photos={graphics} />
          </div>
        </Block>
      )}
    </PageShell>
  );
}
