"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/ui/image-uploader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function NewProductForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem('access_token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = getToken();
    if (!token) {
      toast.error('You must be logged in to create a product.');
      router.push('/login');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (description) formData.append("description", description);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch('/api/main/v1/products', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          toast.error('Session expired. Please log in again.');
          router.push('/login');
          return;
        }
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const product = await res.json();
      toast.success("Product created successfully");
      router.push(`/admin/products/${product.id}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-10 md:py-12 max-w-2xl">
      <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            className="w-full min-h-32 rounded-lg border border-border bg-background p-3"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Product Images</Label>
          <ImageUploader
            value={files}
            onChange={setFiles}
            maxFiles={10}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="filled" size="medium" disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </Button>
          <Button type="button" variant="outlined" size="medium" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
}
