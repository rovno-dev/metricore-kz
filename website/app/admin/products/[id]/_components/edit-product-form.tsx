"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product } from "@/utils/interfaces";
import { getProduct } from "@/lib/api/products";

export function EditProductForm({ id }: { id: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const getToken = () => localStorage.getItem('access_token');

  useEffect(() => {
    getProduct(id).then((data) => {
      if (data) {
        setProduct(data);
        setName(data.name);
        setPrice(data.price.toString());
        setDescription(data.description || "");
      }
      setLoadingData(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = getToken();
    if (!token) {
      toast.error('You must be logged in to edit products.');
      router.push('/login');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (description) formData.append("description", description);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      const res = await fetch(`/api/main/v1/products/${id}`, {
        method: "PATCH",
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
        throw new Error(await res.text());
      }
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Container className="py-10 md:py-12 max-w-2xl">
        <p className="text-(--on-bg-medium)">Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-12 max-w-2xl">
      <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6">
        Edit Product
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
          <Label htmlFor="images">Product Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="filled" size="medium" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
          <Button type="button" variant="outlined" size="medium" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
}
