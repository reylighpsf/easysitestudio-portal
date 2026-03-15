import { useMemo, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import type { AdminPricePlan, PricePlanPayload } from "@/api/admin-api";

type PricePlansManagerProps = {
  plans: AdminPricePlan[];
  isLoading?: boolean;
  isMutating?: boolean;
  onRefresh: () => void;
  onCreate: (payload: PricePlanPayload) => Promise<unknown>;
  onUpdate: (pricePlanId: number, payload: PricePlanPayload) => Promise<unknown>;
  onDelete: (pricePlanId: number) => Promise<unknown>;
};

type PricePlanDraft = {
  name: string;
  price: string;
  features: string;
  sortOrder: string;
  isHighlighted: boolean;
  isActive: boolean;
};

const DEFAULT_DRAFT: PricePlanDraft = {
  name: "",
  price: "0",
  features: "",
  sortOrder: "0",
  isHighlighted: false,
  isActive: true,
};

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function toDraft(item: AdminPricePlan): PricePlanDraft {
  const normalizedPrice =
    typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0
      ? Math.round(item.price)
      : 0;
  const normalizedSortOrder =
    typeof item.sortOrder === "number" && Number.isFinite(item.sortOrder) ? item.sortOrder : 0;

  return {
    name: item.name,
    price: String(normalizedPrice),
    features: item.features,
    sortOrder: String(normalizedSortOrder),
    isHighlighted: item.isHighlighted,
    isActive: item.isActive,
  };
}

const PricePlansManager = ({
  plans,
  isLoading = false,
  isMutating = false,
  onRefresh,
  onCreate,
  onUpdate,
  onDelete,
}: PricePlansManagerProps) => {
  const [draft, setDraft] = useState<PricePlanDraft>(DEFAULT_DRAFT);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const sortedPlans = useMemo(
    () => [...plans].sort((left, right) => left.sortOrder - right.sortOrder),
    [plans],
  );
  const isDisabled = isLoading || isMutating;

  function resetForm() {
    setDraft(DEFAULT_DRAFT);
    setEditingId(null);
    setFormError(null);
  }

  function openCreateForm() {
    resetForm();
    setIsFormOpen(true);
  }

  function openEditForm(item: AdminPricePlan) {
    setEditingId(item.id);
    setDraft(toDraft(item));
    setFormError(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    resetForm();
  }

  function setDraftField(field: keyof PricePlanDraft, value: string | boolean) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    const name = draft.name.trim();
    const features = draft.features.trim();
    const price = Number(draft.price);
    const sortOrder = Number(draft.sortOrder);

    if (!name) {
      setFormError("Nama paket wajib diisi.");
      return;
    }

    if (!features) {
      setFormError("Fitur paket wajib diisi.");
      return;
    }

    if (!Number.isInteger(price) || price < 0) {
      setFormError("Harga harus angka 0 atau lebih besar.");
      return;
    }

    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      setFormError("Urutan tampil harus angka 0 atau lebih besar.");
      return;
    }

    setFormError(null);

    const payload: PricePlanPayload = {
      name,
      price,
      features,
      sortOrder,
      isHighlighted: draft.isHighlighted,
      isActive: draft.isActive,
    };

    try {
      if (editingId) {
        await onUpdate(editingId, payload);
      } else {
        await onCreate(payload);
      }
      closeForm();
    } catch {
      // Status error ditangani parent component.
    }
  }

  async function handleDelete(pricePlanId: number) {
    try {
      await onDelete(pricePlanId);
      if (editingId === pricePlanId) {
        closeForm();
      }
    } catch {
      // Status error ditangani parent component.
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
            <DialogTitle>{editingId ? "Edit Paket Harga" : "Tambah Paket Harga"}</DialogTitle>
            <DialogDescription>
              Masukkan nama paket, harga, daftar fitur, dan urutan tampil di homepage.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price-plan-name">Nama Paket</Label>
              <Input
                id="price-plan-name"
                value={draft.name}
                placeholder="Business"
                disabled={isDisabled}
                onChange={(event) => setDraftField("name", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-plan-price">Harga (IDR)</Label>
              <Input
                id="price-plan-price"
                type="number"
                min={0}
                value={draft.price}
                disabled={isDisabled}
                onChange={(event) => setDraftField("price", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-plan-sort-order">Urutan Tampil</Label>
              <Input
                id="price-plan-sort-order"
                type="number"
                min={0}
                value={draft.sortOrder}
                disabled={isDisabled}
                onChange={(event) => setDraftField("sortOrder", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-plan-highlight">Paket Highlight</Label>
              <div className="flex min-h-10 items-center rounded-md border border-input px-3">
                <Switch
                  id="price-plan-highlight"
                  checked={draft.isHighlighted}
                  disabled={isDisabled}
                  onCheckedChange={(checked) => setDraftField("isHighlighted", checked)}
                />
                <Label htmlFor="price-plan-highlight" className="ml-3">
                  Tandai sebagai paket populer
                </Label>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="price-plan-features">Daftar Fitur (1 baris = 1 fitur)</Label>
              <Textarea
                id="price-plan-features"
                className="min-h-[130px]"
                value={draft.features}
                placeholder={"3-5 halaman\nSEO dasar\nIntegrasi WhatsApp"}
                disabled={isDisabled}
                onChange={(event) => setDraftField("features", event.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="price-plan-is-active"
              checked={draft.isActive}
              disabled={isDisabled}
              onCheckedChange={(checked) => setDraftField("isActive", checked)}
            />
            <Label htmlFor="price-plan-is-active">Tampilkan paket ini di section harga</Label>
          </div>

          {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeForm} disabled={isDisabled}>
              Batal
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isDisabled}>
              {editingId ? "Update Paket" : "Tambah Paket"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <div>
            <CardTitle>Tabel Paket Harga</CardTitle>
            <CardDescription>Kelola daftar paket harga yang tampil di homepage.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={openCreateForm} disabled={isDisabled}>
              Tambah Paket
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
                  <TableHead>Paket</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Highlight</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fitur</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      {isLoading ? "Memuat data..." : "Belum ada paket harga."}
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedPlans.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.sortOrder}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{rupiahFormatter.format(item.price)}</TableCell>
                      <TableCell>{item.isHighlighted ? "Ya" : "Tidak"}</TableCell>
                      <TableCell>{item.isActive ? "Aktif" : "Nonaktif"}</TableCell>
                      <TableCell className="max-w-[340px] whitespace-pre-line text-xs text-muted-foreground">
                        {item.features}
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={isDisabled}
                          onClick={() => openEditForm(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          disabled={isDisabled}
                          onClick={() => handleDelete(item.id)}
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

export default PricePlansManager;
