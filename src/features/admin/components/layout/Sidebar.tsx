import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

type AdminProfileSidebar = {
  name?: string;
  loginId?: string;
  role?: string;
};

export type AdminSidebarItem<TPanel extends string = string> = {
  key: TPanel;
  label: string;
  icon: LucideIcon;
};

type AdminSidebarProps<TPanel extends string = string> = {
  items: AdminSidebarItem<TPanel>[];
  activePanel: TPanel;
  onSelectPanel: (panel: TPanel) => void;
  profile?: AdminProfileSidebar | null;
  onLogout: () => void;
};

const sidebarLayoutClass = {
  root: "hidden w-72 shrink-0 lg:block",
  card: "sticky top-6 overflow-hidden border-slate-200 shadow-sm",
  header: "space-y-2 border-b border-slate-200 bg-slate-50/80",
  body: "space-y-2 pt-5",
  profileCard: "space-y-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2",
};

const AdminSidebar = <TPanel extends string>({
  items,
  activePanel,
  onSelectPanel,
  profile,
  onLogout,
}: AdminSidebarProps<TPanel>) => {
  return (
    <aside className={sidebarLayoutClass.root}>
      <Card className={sidebarLayoutClass.card}>
        <CardHeader className={sidebarLayoutClass.header}>
          <Badge variant="secondary" className="w-fit border border-slate-200 bg-white">
            Admin Panel
          </Badge>
          <CardTitle>SiteStudio</CardTitle>
          <CardDescription>Kelola product portfolio, paket harga, dan performa lead website.</CardDescription>
        </CardHeader>
        <CardContent className={sidebarLayoutClass.body}>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.key;

            return (
              <Button
                key={item.key}
                type="button"
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                  isActive ? "bg-slate-900 text-slate-100 hover:bg-slate-900 hover:text-slate-100" : "",
                )}
                onClick={() => onSelectPanel(item.key)}
              >
                <Icon className="size-4" />
                {item.label}
              </Button>
            );
          })}

          <Separator className="my-3 bg-slate-200" />

          <div className={sidebarLayoutClass.profileCard}>
            <p className="text-sm font-semibold">{profile?.name ?? "-"}</p>
            <p className="text-xs text-muted-foreground">
              {profile?.loginId ?? "-"} ({profile?.role ?? "ADMIN"})
            </p>
          </div>

          <Button type="button" variant="outline" className="w-full justify-start gap-2" onClick={onLogout}>
            <LogOut className="size-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};

export default AdminSidebar;
