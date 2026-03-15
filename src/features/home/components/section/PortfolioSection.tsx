import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioProduct } from "@/lib/api";

type PortfolioSectionProps = {
  products: PortfolioProduct[];
};

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type PortfolioImageProps = {
  imageUrl: string | null;
  title: string;
};

const PortfolioImage = ({ imageUrl, title }: PortfolioImageProps) => {
  const [isImageError, setIsImageError] = useState(false);

  if (!imageUrl || isImageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#0f172a,#1e293b)]">
        <div className="flex flex-col items-center gap-2 text-slate-300">
          <ImageOff className="h-5 w-5 text-cyan-300/80" />
          <p className="text-xs font-medium">Gambar belum tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={title}
      loading="lazy"
      onError={() => setIsImageError(true)}
      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
    />
  );
};

const PortfolioSection = ({ products }: PortfolioSectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<PortfolioProduct | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const visibleProducts = useMemo(
    () =>
      products
        .filter((item) => item && item.isActive !== false)
        .sort((left, right) => left.sortOrder - right.sortOrder),
    [products],
  );

  const selectedProductImages = useMemo(() => {
    if (!selectedProduct) {
      return [];
    }

    const baseImages = Array.isArray(selectedProduct.galleryImages)
      ? selectedProduct.galleryImages
      : [];
    const mergedImages = [...baseImages, selectedProduct.imageUrl]
      .filter((imagePath): imagePath is string => Boolean(imagePath))
      .filter((imagePath, index, array) => array.indexOf(imagePath) === index)
      .slice(0, 4);

    return mergedImages;
  }, [selectedProduct]);

  return (
    <section id="portfolio" className="bg-[#060c18] py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-12 text-center">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.15em] text-cyan-200">
              Portfolio
            </span>
            <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">Portfolio Kami</h2>
          </div>
        </motion.div>

        {visibleProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-cyan-300/20 bg-[#0c1527] p-8 text-center text-slate-300"
          >
            Portfolio belum tersedia. Tambahkan produk melalui dashboard admin.
          </motion.div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedProduct(project);
                  setActiveGalleryImage(
                    (Array.isArray(project.galleryImages) && project.galleryImages[0]) || project.imageUrl || null,
                  );
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedProduct(project);
                    setActiveGalleryImage(
                      (Array.isArray(project.galleryImages) && project.galleryImages[0]) || project.imageUrl || null,
                    );
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#0b1527] shadow-sm transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_18px_34px_-24px_rgba(8,145,178,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060c18]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <PortfolioImage imageUrl={project.imageUrl} title={project.title} />
                </div>

                <div className="space-y-2 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Product Website</p>
                  <h3 className="line-clamp-2 text-base font-extrabold text-white">{project.title}</h3>
                  <p className="text-sm font-bold text-cyan-300">{rupiahFormatter.format(project.price ?? 0)}</p>
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                    Lihat detail <ExternalLink className="h-4 w-4" />
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProduct(null);
            setActiveGalleryImage(null);
          }
        }}
      >
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-cyan-300/20 bg-[#0b1527] text-slate-100">
          {selectedProduct ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-black text-white">{selectedProduct.title}</DialogTitle>
                <DialogDescription className="text-slate-300">
                  Detail produk portfolio website.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-2xl border border-cyan-300/20">
                  <div className="aspect-[4/3]">
                    <PortfolioImage
                      imageUrl={activeGalleryImage ?? selectedProductImages[0] ?? null}
                      title={selectedProduct.title}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedProductImages.length > 1 ? (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedProductImages.map((imageUrl) => {
                        const isActiveImage = (activeGalleryImage ?? selectedProductImages[0]) === imageUrl;
                        return (
                          <button
                            key={imageUrl}
                            type="button"
                            className={`overflow-hidden rounded-lg border transition ${
                              isActiveImage
                                ? "border-cyan-300/80 ring-2 ring-cyan-300/40"
                                : "border-cyan-300/20 hover:border-cyan-300/40"
                            }`}
                            onClick={() => setActiveGalleryImage(imageUrl)}
                          >
                            <img src={imageUrl} alt={selectedProduct.title} className="h-16 w-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  ) : null}

                  <div className="rounded-xl border border-cyan-300/20 bg-[#101b31] p-4">
                    <p className="text-xs uppercase tracking-wide text-cyan-200">Kategori</p>
                    <p className="mt-1 text-sm font-semibold text-white">{selectedProduct.category}</p>
                  </div>
                  <div className="rounded-xl border border-cyan-300/20 bg-[#101b31] p-4">
                    <p className="text-xs uppercase tracking-wide text-cyan-200">Harga</p>
                    <p className="mt-1 text-lg font-black text-cyan-300">
                      {rupiahFormatter.format(selectedProduct.price ?? 0)}
                    </p>
                  </div>

                  {selectedProduct.projectUrl ? (
                    <Button
                      asChild
                      className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white hover:from-cyan-400 hover:to-sky-400"
                    >
                      <a href={selectedProduct.projectUrl} target="_blank" rel="noreferrer">
                        Buka Website <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <p className="text-sm text-slate-300">Link project belum tersedia.</p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
