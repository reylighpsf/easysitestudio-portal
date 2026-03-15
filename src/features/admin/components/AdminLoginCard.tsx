import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, UserRound } from "lucide-react";

type AdminLoginCardProps = {
  adminIdDraft: string;
  passwordDraft: string;
  errorMessage?: string | null;
  isLoading?: boolean;
  onAdminIdDraftChange: (value: string) => void;
  onPasswordDraftChange: (value: string) => void;
  onLogin: () => void;
};

const AdminLoginCard = ({
  adminIdDraft,
  passwordDraft,
  errorMessage,
  isLoading = false,
  onAdminIdDraftChange,
  onPasswordDraftChange,
  onLogin,
}: AdminLoginCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-md border-border/60 bg-card/95 shadow-xl backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Login</CardTitle>
        <CardDescription>Masuk menggunakan ID admin dan password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-id-input">Admin ID</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="admin-id-input"
              value={adminIdDraft}
              onChange={(event) => onAdminIdDraftChange(event.target.value)}
              placeholder="Masukkan admin id"
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password-input">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="admin-password-input"
              type="password"
              value={passwordDraft}
              onChange={(event) => onPasswordDraftChange(event.target.value)}
              placeholder="Masukkan password"
              className="pl-9"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onLogin();
                }
              }}
            />
          </div>
        </div>
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        <Button type="button" className="w-full" onClick={onLogin} disabled={isLoading}>
          {isLoading ? "Memverifikasi..." : "Masuk Dashboard"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminLoginCard;
