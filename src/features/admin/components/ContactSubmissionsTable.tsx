import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ContactSubmission } from "@/api/admin-api";

type ContactSubmissionsTableProps = {
  contacts: ContactSubmission[];
  isLoading?: boolean;
  onRefresh: () => void;
};

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("id-ID");
}

const ContactSubmissionsTable = ({
  contacts,
  isLoading = false,
  onRefresh,
}: ContactSubmissionsTableProps) => {
  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div>
          <CardTitle>Data Kontak Masuk</CardTitle>
          <CardDescription>Lead dari form kontak website ditampilkan terbaru ke lama.</CardDescription>
        </div>
        <Button type="button" variant="outline" onClick={onRefresh} disabled={isLoading}>
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/70">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pesan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    {isLoading ? "Memuat data..." : "Belum ada data kontak masuk."}
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell className="max-w-[420px] whitespace-pre-wrap">{item.message}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSubmissionsTable;
