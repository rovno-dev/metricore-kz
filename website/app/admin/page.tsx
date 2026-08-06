import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminDashboard() {
  return (
    <Container className="py-10 md:py-12">
      <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-display-4 mb-2">Products</h2>
          <p className="text-body-4 text-(--on-bg-medium) mb-4">
            Manage your product catalog.
          </p>
          <Link href="/admin/products">
            <Button variant="filled" size="medium">Manage Products</Button>
          </Link>
        </Card>
        <Card className="p-6">
          <h2 className="text-display-4 mb-2">Orders</h2>
          <p className="text-body-4 text-(--on-bg-medium) mb-4">
            View and manage customer orders.
          </p>
          <Button variant="outlined" size="medium" disabled>Coming soon</Button>
        </Card>
        <Card className="p-6">
          <h2 className="text-display-4 mb-2">Users</h2>
          <p className="text-body-4 text-(--on-bg-medium) mb-4">
            Manage user accounts and permissions.
          </p>
          <Button variant="outlined" size="medium" disabled>Coming soon</Button>
        </Card>
      </div>
    </Container>
  );
}
