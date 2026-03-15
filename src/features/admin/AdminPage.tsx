import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AdminApiError,
  type PricePlanPayload,
  type PortfolioProductPayload,
  createAdminPricePlan,
  createAdminPortfolioProduct,
  deleteAdminPricePlan,
  deleteAdminPortfolioProduct,
  fetchAdminContacts,
  fetchAdminPricePlans,
  fetchAdminPortfolioProducts,
  loginAdmin,
  updateAdminPricePlan,
  updateAdminPortfolioProduct,
} from "@/api/admin-api";
import AdminLoginCard from "@/features/admin/components/AdminLoginCard";
import ContactSubmissionsTable from "@/features/admin/components/ContactSubmissionsTable";
import PortfolioProductsManager from "@/features/admin/components/PortfolioProductsManager";
import PricePlansManager from "@/features/admin/components/PricePlansManager";
import AdminSidebar from "@/features/admin/components/layout/Sidebar";
import { useAdminSession } from "@/hooks/use-admin-session";
import { cn } from "@/lib/utils";
import {
  BadgeDollarSign,
  BarChart3,
  CircleCheck,
  LayoutDashboard,
  MailCheck,
  Package,
  TriangleAlert,
} from "lucide-react";

type AdminPanelKey = "overview" | "portfolio" | "prices" | "contacts";

type OverviewStat = {
  label: string;
  value: string;
  caption: string;
  icon: typeof LayoutDashboard;
};

const adminPanels: Array<{
  key: AdminPanelKey;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { key: "overview", label: "Ringkasan", icon: LayoutDashboard },
  { key: "portfolio", label: "Product Portfolio", icon: Package },
  { key: "prices", label: "Paket Harga", icon: BadgeDollarSign },
  { key: "contacts", label: "Leads", icon: MailCheck },
];

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

function countTodayContacts(createdAtValues: string[]) {
  const now = new Date();
  return createdAtValues.reduce((count, value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return count;
    }

    const isSameDay =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    return isSameDay ? count + 1 : count;
  }, 0);
}

const AdminPage = () => {
  const queryClient = useQueryClient();
  const { authToken, adminProfile, isReady, saveSession, clearSession } = useAdminSession();

  const [activePanel, setActivePanel] = useState<AdminPanelKey>("overview");
  const [adminIdDraft, setAdminIdDraft] = useState("admin");
  const [passwordDraft, setPasswordDraft] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady || !adminProfile?.loginId) {
      return;
    }

    setAdminIdDraft(adminProfile.loginId);
  }, [adminProfile?.loginId, isReady]);

  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (response) => {
      saveSession({
        token: response.token,
        admin: response.admin,
      });
      setPasswordDraft("");
      setStatusError(null);
      setStatusMessage("Login berhasil. Selamat datang di dashboard admin.");
      setActivePanel("overview");
    },
    onError: (error) => {
      if (error instanceof AdminApiError) {
        setStatusError(error.message);
        return;
      }

      setStatusError("Gagal login. Silakan coba lagi.");
    },
  });

  const contactsQuery = useQuery({
    queryKey: ["admin", "contacts", authToken],
    queryFn: () => fetchAdminContacts(authToken, 200),
    enabled: Boolean(authToken),
    retry: false,
    refetchInterval: 30000,
  });

  const portfolioProductsQuery = useQuery({
    queryKey: ["admin", "portfolio-products", authToken],
    queryFn: () => fetchAdminPortfolioProducts(authToken),
    enabled: Boolean(authToken),
    retry: false,
  });

  const pricePlansQuery = useQuery({
    queryKey: ["admin", "price-plans", authToken],
    queryFn: () => fetchAdminPricePlans(authToken),
    enabled: Boolean(authToken),
    retry: false,
  });

  const createPortfolioProductMutation = useMutation({
    mutationFn: ({
      payload,
      imageFiles,
    }: {
      payload: PortfolioProductPayload;
      imageFiles: File[] | null;
    }) => createAdminPortfolioProduct(authToken, payload, imageFiles),
    onSuccess: () => {
      setStatusError(null);
      setStatusMessage("Product portfolio berhasil ditambahkan.");
      queryClient.invalidateQueries({
        queryKey: ["admin", "portfolio-products", authToken],
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio-products"],
      });
    },
    onError: (error) => {
      if (error instanceof AdminApiError) {
        setStatusError(error.message);
        return;
      }

      setStatusError("Gagal menambahkan product portfolio.");
    },
  });

  const updatePortfolioProductMutation = useMutation({
    mutationFn: ({
      productId,
      payload,
      imageFiles,
    }: {
      productId: number;
      payload: PortfolioProductPayload;
      imageFiles: File[] | null;
    }) => updateAdminPortfolioProduct(authToken, productId, payload, imageFiles),
    onSuccess: () => {
      setStatusError(null);
      setStatusMessage("Product portfolio berhasil diperbarui.");
      queryClient.invalidateQueries({
        queryKey: ["admin", "portfolio-products", authToken],
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio-products"],
      });
    },
    onError: (error) => {
      if (error instanceof AdminApiError) {
        setStatusError(error.message);
        return;
      }

      setStatusError("Gagal memperbarui product portfolio.");
    },
  });

  const deletePortfolioProductMutation = useMutation({
    mutationFn: (productId: number) => deleteAdminPortfolioProduct(authToken, productId),
    onSuccess: () => {
      setStatusError(null);
      setStatusMessage("Product portfolio berhasil dihapus.");
      queryClient.invalidateQueries({
        queryKey: ["admin", "portfolio-products", authToken],
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio-products"],
      });
    },
    onError: (error) => {
      if (error instanceof AdminApiError) {
        setStatusError(error.message);
        return;
      }

      setStatusError("Gagal menghapus product portfolio.");
    },
  });

  const createPricePlanMutation = useMutation({
    mutationFn: (payload: PricePlanPayload) => createAdminPricePlan(authToken, payload),
    onSuccess: () => {
      setStatusError(null);
      setStatusMessage("Paket harga berhasil ditambahkan.");
      queryClient.invalidateQueries({
        queryKey: ["admin", "price-plans", authToken],
      });
      queryClient.invalidateQueries({
        queryKey: ["price-plans"],
      });
    },
    onError: (error) => {
      if (error instanceof AdminApiError) {
        setStatusError(error.message);
        return;
      }

      setStatusError("Gagal menambahkan paket harga.");
    },
  });

  const updatePricePlanMutation = useMutation({
    mutationFn: ({
      pricePlanId,
      payload,
    }: {
      pricePlanId: number;
      payload: PricePlanPayload;
    }) => updateAdminPricePlan(authToken, pricePlanId, payload),
    onSuccess: () => {
      setStatusError(null);
      setStatusMessage("Paket harga berhasil diperbarui.");
      queryClient.invalidateQueries({
        queryKey: ["admin", "price-plans", authToken],
      });
      queryClient.invalidateQueries({
        queryKey: ["price-plans"],
      });
    },
    onError: (error) => {
      if (error instanceof AdminApiError) {
        setStatusError(error.message);
        return;
      }

      setStatusError("Gagal memperbarui paket harga.");
    },
  });

  const deletePricePlanMutation = useMutation({
    mutationFn: (pricePlanId: number) => deleteAdminPricePlan(authToken, pricePlanId),
    onSuccess: () => {
      setStatusError(null);
      setStatusMessage("Paket harga berhasil dihapus.");
      queryClient.invalidateQueries({
        queryKey: ["admin", "price-plans", authToken],
      });
      queryClient.invalidateQueries({
        queryKey: ["price-plans"],
      });
    },
    onError: (error) => {
      if (error instanceof AdminApiError) {
        setStatusError(error.message);
        return;
      }

      setStatusError("Gagal menghapus paket harga.");
    },
  });

  const unauthorizedError = useMemo(() => {
    const errors = [
      contactsQuery.error,
      portfolioProductsQuery.error,
      pricePlansQuery.error,
      createPortfolioProductMutation.error,
      updatePortfolioProductMutation.error,
      deletePortfolioProductMutation.error,
      createPricePlanMutation.error,
      updatePricePlanMutation.error,
      deletePricePlanMutation.error,
    ];
    for (const error of errors) {
      if (error instanceof AdminApiError && error.status === 401) {
        return "Sesi admin sudah berakhir. Silakan login ulang.";
      }
    }

    return null;
  }, [
    contactsQuery.error,
    createPortfolioProductMutation.error,
    createPricePlanMutation.error,
    deletePricePlanMutation.error,
    deletePortfolioProductMutation.error,
    portfolioProductsQuery.error,
    pricePlansQuery.error,
    updatePricePlanMutation.error,
    updatePortfolioProductMutation.error,
  ]);

  useEffect(() => {
    if (!unauthorizedError) {
      return;
    }

    clearSession();
    setPasswordDraft("");
    setStatusMessage(null);
    setStatusError(unauthorizedError);
  }, [clearSession, unauthorizedError]);

  useEffect(() => {
    if (unauthorizedError) {
      return;
    }

    const firstError =
      contactsQuery.error ??
      portfolioProductsQuery.error ??
      pricePlansQuery.error ??
      createPortfolioProductMutation.error ??
      updatePortfolioProductMutation.error ??
      deletePortfolioProductMutation.error ??
      createPricePlanMutation.error ??
      updatePricePlanMutation.error ??
      deletePricePlanMutation.error;
    if (!firstError) {
      return;
    }

    if (firstError instanceof AdminApiError) {
      setStatusError(firstError.message);
      return;
    }

    if (firstError instanceof Error && firstError.message.trim()) {
      setStatusError(firstError.message);
      return;
    }

    setStatusError("Terjadi kendala saat memuat data dashboard.");
  }, [
    contactsQuery.error,
    createPortfolioProductMutation.error,
    createPricePlanMutation.error,
    deletePricePlanMutation.error,
    deletePortfolioProductMutation.error,
    portfolioProductsQuery.error,
    pricePlansQuery.error,
    unauthorizedError,
    updatePricePlanMutation.error,
    updatePortfolioProductMutation.error,
  ]);

  const contactItems = contactsQuery.data ?? [];
  const portfolioItems = portfolioProductsQuery.data ?? [];
  const pricePlanItems = pricePlansQuery.data ?? [];
  const latestContact = contactItems[0];
  const totalLeads = contactItems.length;
  const leadsToday = countTodayContacts(contactItems.map((item) => item.createdAt));
  const totalPortfolioProducts = portfolioItems.length;
  const activePortfolioProducts = portfolioItems.filter((item) => item.isActive).length;
  const totalPricePlans = pricePlanItems.length;
  const activePricePlans = pricePlanItems.filter((item) => item.isActive).length;

  const overviewStats: OverviewStat[] = [
    {
      label: "Total Leads",
      value: totalLeads.toString(),
      caption: "Semua data kontak yang masuk",
      icon: MailCheck,
    },
    {
      label: "Leads Hari Ini",
      value: leadsToday.toString(),
      caption: "Masuk pada tanggal hari ini",
      icon: BarChart3,
    },
    {
      label: "Lead Terakhir",
      value: latestContact ? latestContact.name : "-",
      caption: latestContact ? formatDateTime(latestContact.createdAt) : "Belum ada kontak masuk",
      icon: LayoutDashboard,
    },
    {
      label: "Product Portfolio",
      value: `${activePortfolioProducts}/${totalPortfolioProducts}`,
      caption: "Jumlah product aktif dari total portfolio",
      icon: Package,
    },
    {
      label: "Paket Harga",
      value: `${activePricePlans}/${totalPricePlans}`,
      caption: "Jumlah paket harga aktif dari total paket",
      icon: BadgeDollarSign,
    },
  ];

  const activePanelMeta =
    adminPanels.find((panelItem) => panelItem.key === activePanel) ?? adminPanels[0];

  const panelDescriptionMap: Record<AdminPanelKey, string> = {
    overview: "Pantau performa lead dan product portfolio website.",
    portfolio: "Tambah, edit, dan atur product portfolio beserta gambar upload.",
    prices: "Kelola daftar paket harga yang tampil di section harga homepage.",
    contacts: "Monitor leads terbaru dari form kontak website.",
  };

  function handleLogin() {
    const adminId = adminIdDraft.trim();
    const password = passwordDraft;

    if (!adminId || !password) {
      setStatusError("ID admin dan password wajib diisi.");
      return;
    }

    setStatusError(null);
    setStatusMessage(null);
    loginMutation.mutate({ id: adminId, password });
  }

  function handleLogout() {
    clearSession();
    setPasswordDraft("");
    setStatusMessage("Anda telah logout dari dashboard admin.");
    setStatusError(null);
    setActivePanel("overview");
    queryClient.removeQueries({
      queryKey: ["admin"],
    });
  }

  async function handleCreatePortfolioProduct(
    payload: PortfolioProductPayload,
    imageFiles: File[] | null,
  ) {
    setStatusMessage(null);
    setStatusError(null);
    await createPortfolioProductMutation.mutateAsync({
      payload,
      imageFiles,
    });
  }

  async function handleUpdatePortfolioProduct(
    productId: number,
    payload: PortfolioProductPayload,
    imageFiles: File[] | null,
  ) {
    setStatusMessage(null);
    setStatusError(null);
    await updatePortfolioProductMutation.mutateAsync({
      productId,
      payload,
      imageFiles,
    });
  }

  async function handleDeletePortfolioProduct(productId: number) {
    setStatusMessage(null);
    setStatusError(null);
    await deletePortfolioProductMutation.mutateAsync(productId);
  }

  async function handleCreatePricePlan(payload: PricePlanPayload) {
    setStatusMessage(null);
    setStatusError(null);
    await createPricePlanMutation.mutateAsync(payload);
  }

  async function handleUpdatePricePlan(pricePlanId: number, payload: PricePlanPayload) {
    setStatusMessage(null);
    setStatusError(null);
    await updatePricePlanMutation.mutateAsync({
      pricePlanId,
      payload,
    });
  }

  async function handleDeletePricePlan(pricePlanId: number) {
    setStatusMessage(null);
    setStatusError(null);
    await deletePricePlanMutation.mutateAsync(pricePlanId);
  }

  if (!authToken) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
        <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="hidden space-y-6 lg:block">
            <Badge variant="secondary" className="w-fit border border-slate-200 bg-white/70">
              SiteStudio Admin
            </Badge>
            <div className="space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Dashboard Kontrol
                <br />
                untuk Website Anda
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-600">
                Pantau leads dan kelola product portfolio website dari satu dashboard admin.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-slate-200 bg-white/90">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Portfolio Management</CardTitle>
                  <CardDescription>Kelola produk portfolio beserta gambar upload.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-slate-200 bg-white/90">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Lead Monitoring</CardTitle>
                  <CardDescription>Semua data kontak masuk dalam satu tabel.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <AdminLoginCard
            adminIdDraft={adminIdDraft}
            passwordDraft={passwordDraft}
            errorMessage={statusError}
            onAdminIdDraftChange={setAdminIdDraft}
            onPasswordDraftChange={setPasswordDraft}
            onLogin={handleLogin}
            isLoading={loginMutation.isPending}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e2e8f0_0%,#f8fafc_42%,#f8fafc_100%)]">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4 px-3 py-4 md:gap-6 md:px-6 md:py-6">
        <AdminSidebar
          items={adminPanels}
          activePanel={activePanel}
          onSelectPanel={(panel) => setActivePanel(panel as AdminPanelKey)}
          profile={adminProfile}
          onLogout={handleLogout}
        />

        <main className="min-w-0 flex-1 space-y-4 md:space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="space-y-4 px-4 py-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Dashboard Admin
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    {activePanelMeta.label}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {panelDescriptionMap[activePanelMeta.key]}
                  </p>
                </div>
                <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 md:block">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Login Admin
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{adminProfile?.name}</p>
                  <p className="text-xs text-slate-600">{adminProfile?.loginId}</p>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {adminPanels.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePanel === item.key;
                  return (
                    <Button
                      key={item.key}
                      type="button"
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className="shrink-0 gap-2"
                      onClick={() => setActivePanel(item.key)}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>

              <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 md:grid-cols-4">
                <div>
                  <p className="text-xs text-slate-500">Total Leads</p>
                  <p className="text-sm font-semibold text-slate-900">{totalLeads}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Leads Hari Ini</p>
                  <p className="text-sm font-semibold text-slate-900">{leadsToday}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Product Aktif</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {activePortfolioProducts}/{totalPortfolioProducts}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Paket Harga Aktif</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {activePricePlans}/{totalPricePlans}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {(statusMessage || statusError) && (
            <Card
              className={cn(
                "shadow-sm",
                statusError
                  ? "border-red-200 bg-red-50/60"
                  : "border-emerald-200 bg-emerald-50/70",
              )}
            >
              <CardContent className="flex items-start gap-3 px-4 py-3 text-sm">
                {statusError ? (
                  <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-600" />
                ) : (
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                )}
                <div className="space-y-1">
                  {statusMessage ? <p className="text-emerald-700">{statusMessage}</p> : null}
                  {statusError ? <p className="text-red-700">{statusError}</p> : null}
                </div>
              </CardContent>
            </Card>
          )}

          {activePanel === "overview" ? (
            <div className="space-y-4 md:space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewStats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.label} className="border-slate-200 bg-white shadow-sm">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <CardDescription>{item.label}</CardDescription>
                        <Icon className="size-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-1 text-xl font-bold text-slate-900">{item.value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.caption}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid gap-4">
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Akses cepat ke area yang paling sering dipakai.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                      onClick={() => setActivePanel("contacts")}
                    >
                      Lihat Data Leads
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                      onClick={() => setActivePanel("portfolio")}
                    >
                      Kelola Product Portfolio
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                      onClick={() => setActivePanel("prices")}
                    >
                      Kelola Paket Harga
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                      onClick={() => contactsQuery.refetch()}
                      disabled={contactsQuery.isFetching}
                    >
                      {contactsQuery.isFetching ? "Memuat ulang data..." : "Refresh Data Leads"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                      onClick={() => portfolioProductsQuery.refetch()}
                      disabled={portfolioProductsQuery.isFetching}
                    >
                      {portfolioProductsQuery.isFetching
                        ? "Memuat ulang portfolio..."
                        : "Refresh Product Portfolio"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                      onClick={() => pricePlansQuery.refetch()}
                      disabled={pricePlansQuery.isFetching}
                    >
                      {pricePlansQuery.isFetching
                        ? "Memuat ulang paket harga..."
                        : "Refresh Paket Harga"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : null}

          {activePanel === "portfolio" ? (
            <PortfolioProductsManager
              products={portfolioItems}
              isLoading={portfolioProductsQuery.isLoading || portfolioProductsQuery.isFetching}
              isMutating={
                createPortfolioProductMutation.isPending ||
                updatePortfolioProductMutation.isPending ||
                deletePortfolioProductMutation.isPending
              }
              onRefresh={() => portfolioProductsQuery.refetch()}
              onCreate={handleCreatePortfolioProduct}
              onUpdate={handleUpdatePortfolioProduct}
              onDelete={handleDeletePortfolioProduct}
            />
          ) : null}

          {activePanel === "prices" ? (
            <PricePlansManager
              plans={pricePlanItems}
              isLoading={pricePlansQuery.isLoading || pricePlansQuery.isFetching}
              isMutating={
                createPricePlanMutation.isPending ||
                updatePricePlanMutation.isPending ||
                deletePricePlanMutation.isPending
              }
              onRefresh={() => pricePlansQuery.refetch()}
              onCreate={handleCreatePricePlan}
              onUpdate={handleUpdatePricePlan}
              onDelete={handleDeletePricePlan}
            />
          ) : null}

          {activePanel === "contacts" ? (
            <ContactSubmissionsTable
              contacts={contactItems}
              isLoading={contactsQuery.isLoading || contactsQuery.isFetching}
              onRefresh={() => contactsQuery.refetch()}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
