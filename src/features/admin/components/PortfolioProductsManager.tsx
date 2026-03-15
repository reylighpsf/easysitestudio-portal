import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PortfolioProductPayload } from "@/api/admin-api";
import type { PortfolioProduct } from "@/lib/api";

type PortfolioProductsManagerProps = {
  products: PortfolioProduct[];
  isLoading?: boolean;
  isMutating?: boolean;
  onRefresh: () => void;
  onCreate: (payload: PortfolioProductPayload, imageFiles: File[] | null) => Promise<unknown>;
  onUpdate: (
    productId: number,
    payload: PortfolioProductPayload,
    imageFiles: File[] | null,
  ) => Promise<unknown>;
  onDelete: (productId: number) => Promise<unknown>;
};

type ProductFormDraft = {
  title: string;
  category: string;
  price: string;
  imageUrl: string;
  galleryImages: string[];
  projectUrl: string;
  sortOrder: string;
  isActive: boolean;
};

const DEFAULT_DRAFT: ProductFormDraft = {
  title: "",
  category: "General",
  price: "0",
  imageUrl: "",
  galleryImages: [],
  projectUrl: "",
  sortOrder: "0",
  isActive: true,
};

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function toProductDraft(product: PortfolioProduct): ProductFormDraft {
  const normalizedPrice =
    typeof product.price === "number" && Number.isFinite(product.price) && product.price >= 0
      ? Math.round(product.price)
      : 0;

  return {
    title: product.title,
    category: product.category,
    price: String(normalizedPrice),
    imageUrl: product.imageUrl ?? "",
    galleryImages:
      Array.isArray(product.galleryImages) && product.galleryImages.length > 0
        ? product.galleryImages.slice(0, 4)
        : product.imageUrl
          ? [product.imageUrl]
          : [],
    projectUrl: product.projectUrl ?? "",
    sortOrder: String(product.sortOrder),
    isActive: product.isActive,
  };
}

const PortfolioProductsManager = ({
  products,
  isLoading = false,
  isMutating = false,
  onRefresh,
  onCreate,
  onUpdate,
  onDelete,
}: PortfolioProductsManagerProps) => {
  const [draft, setDraft] = useState<ProductFormDraft>(DEFAULT_DRAFT);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageFilePreviews, setImageFilePreviews] = useState<string[]>([]);
  const [removeImage, setRemoveImage] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (imageFiles.length === 0) {
      setImageFilePreviews([]);
      return;
    }

    const objectUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setImageFilePreviews(objectUrls);

    return () => {
      objectUrls.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [imageFiles]);

  const sortedProducts = useMemo(
    () => [...products].sort((left, right) => left.sortOrder - right.sortOrder),
    [products],
  );
  const isDisabled = isLoading || isMutating;
  const previewImages = imageFilePreviews.length > 0 ? imageFilePreviews : draft.galleryImages;

  function resetForm() {
    setDraft(DEFAULT_DRAFT);
    setEditingId(null);
    setFormError(null);
    setImageFiles([]);
    setRemoveImage(false);
  }

  function closeFormDialog() {
    setIsFormOpen(false);
    resetForm();
  }

  function openCreateForm() {
    resetForm();
    setIsFormOpen(true);
  }

  function openEditForm(product: PortfolioProduct) {
    setEditingId(product.id);
    setDraft(toProductDraft(product));
    setFormError(null);
    setImageFiles([]);
    setRemoveImage(false);
    setIsFormOpen(true);
  }

  function setDraftField(field: keyof ProductFormDraft, value: string | boolean | string[]) {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    const title = draft.title.trim();
    const category = draft.category.trim() || "General";
    const parsedPrice = Number(draft.price);
    const projectUrl = draft.projectUrl.trim();
    const parsedSortOrder = Number(draft.sortOrder);

    if (!title) {
      setFormError("Judul wajib diisi.");
      return;
    }

    if (projectUrl && !/^https?:\/\/.+/i.test(projectUrl)) {
      setFormError("Link project harus diawali http:// atau https://");
      return;
    }

    if (!Number.isInteger(parsedPrice) || parsedPrice < 0) {
      setFormError("Harga harus angka 0 atau lebih besar.");
      return;
    }

    if (!Number.isInteger(parsedSortOrder) || parsedSortOrder < 0) {
      setFormError("Urutan tampil harus angka 0 atau lebih besar.");
      return;
    }

    if (imageFiles.length > 4) {
      setFormError("Maksimal 4 gambar product.");
      return;
    }

    if (!editingId && imageFiles.length === 0) {
      setFormError("Minimal 1 gambar product wajib diupload.");
      return;
    }

    setFormError(null);

    const payload: PortfolioProductPayload = {
      title,
      category,
      price: parsedPrice,
      projectUrl,
      sortOrder: parsedSortOrder,
      isActive: draft.isActive,
      removeImage,
    };

    try {
      if (editingId) {
        await onUpdate(editingId, payload, imageFiles.length > 0 ? imageFiles : null);
      } else {
        await onCreate(payload, imageFiles);
      }
      closeFormDialog();
    } catch {
      // Status error ditangani di parent component.
    }
  }

  async function handleDelete(productId: number) {
    try {
      await onDelete(productId);
      if (editingId === productId) {
        closeFormDialog();
      }
    } catch {
      // Status error ditangani di parent component.
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Product Portfolio" : "Tambah Product Portfolio"}</DialogTitle>
            <DialogDescription>
              Lengkapi data product, upload gambar, lalu simpan perubahan.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="portfolio-title">Judul Product</Label>
              <Input
                id="portfolio-title"
                value={draft.title}
                placeholder="Website Dealer Mobil"
                disabled={isDisabled}
                onChange={(event) => setDraftField("title", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio-url">Link Project (opsional)</Label>
              <Input
                id="portfolio-url"
                value={draft.projectUrl}
                placeholder="https://example.com"
                disabled={isDisabled}
                onChange={(event) => setDraftField("projectUrl", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio-sort-order">Urutan Tampil</Label>
              <Input
                id="portfolio-sort-order"
                type="number"
                min={0}
                value={draft.sortOrder}
                disabled={isDisabled}
                onChange={(event) => setDraftField("sortOrder", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio-price">Harga (IDR)</Label>
              <Input
                id="portfolio-price"
                type="number"
                min={0}
                value={draft.price}
                disabled={isDisabled}
                onChange={(event) => setDraftField("price", event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="portfolio-image-file">Upload Gambar Product (Maks 4)</Label>
              <Input
                id="portfolio-image-file"
                type="file"
                accept="image/*"
                multiple
                disabled={isDisabled}
                onChange={(event) => {
                  const selectedFiles = Array.from(event.target.files ?? []).slice(0, 4);
                  setImageFiles(selectedFiles);
                  if (selectedFiles.length > 0) {
                    setRemoveImage(false);
                    setDraftField("galleryImages", []);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Format: JPG, PNG, WEBP, GIF, SVG. Maksimal 5MB per gambar.
              </p>
            </div>
          </div>

          {previewImages.length > 0 ? (
            <div className="space-y-2">
              <Label>Preview Gambar ({previewImages.length}/4)</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {previewImages.slice(0, 4).map((previewImage, index) => (
                  <img
                    key={`${previewImage}-${index}`}
                    src={previewImage}
                    alt={`Preview product ${index + 1}`}
                    className="h-24 w-full rounded-lg border border-border/70 object-cover"
                  />
                ))}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isDisabled}
                  onClick={() => {
                    setImageFiles([]);
                    setDraftField("imageUrl", "");
                    setDraftField("galleryImages", []);
                    setRemoveImage(true);
                  }}
                >
                  Hapus Semua Gambar
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <Switch
              id="portfolio-is-active"
              checked={draft.isActive}
              disabled={isDisabled}
              onCheckedChange={(checked) => setDraftField("isActive", checked)}
            />
            <Label htmlFor="portfolio-is-active">Tampilkan di portfolio website</Label>
          </div>

          {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeFormDialog} disabled={isDisabled}>
              Batal
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isDisabled}>
              {editingId ? "Update Product" : "Tambah Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <div>
            <CardTitle>Tabel Portfolio Product</CardTitle>
            <CardDescription>Daftar product portfolio yang tersedia di website.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={openCreateForm} disabled={isDisabled}>
              Tambah Product
            </Button>
            <Button type="button" variant="outline" onClick={onRefresh} disabled={isDisabled}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/70">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Urutan</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Jumlah Gambar</TableHead>
                  <TableHead>Gambar</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      {isLoading ? "Memuat data..." : "Belum ada product portfolio."}
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.sortOrder}</TableCell>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{rupiahFormatter.format(product.price ?? 0)}</TableCell>
                      <TableCell>{Array.isArray(product.galleryImages) ? product.galleryImages.length : 0}</TableCell>
                      <TableCell>
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-10 w-16 rounded border border-border/70 object-cover"
                          />
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{product.isActive ? "Aktif" : "Nonaktif"}</TableCell>
                      <TableCell className="max-w-[220px] truncate">
                        {product.projectUrl || "-"}
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={isDisabled}
                          onClick={() => openEditForm(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          disabled={isDisabled}
                          onClick={() => handleDelete(product.id)}
                        >
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioProductsManager;
