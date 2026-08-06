"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { CloseSmallIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SortableImageProps {
  id: string;
  url: string;
  index: number;
  onRemove: () => void;
}

function SortableImage({ id, url, index, onRemove }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative group aspect-square rounded-lg overflow-hidden border border-border cursor-grab active:cursor-grabbing",
        isDragging && "ring-2 ring-primary"
      )}
    >
      <Image
        src={url}
        alt="Product image"
        fill
        className="object-cover"
      />
      {/* Order number badge */}
      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center select-none pointer-events-none">
        {index + 1}
      </div>
      <Button
        variant="text"
        size="icon-small"
        className="absolute top-2 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <CloseSmallIcon className="size-4" />
      </Button>
    </div>
  );
}

interface ImageUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  maxFiles = 10,
  className,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...value, ...acceptedFiles].slice(0, maxFiles);
      onChange(newFiles);

      // Generate preview URLs
      const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
      setPreviews(newPreviews);
    },
    [value, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: maxFiles - value.length,
    multiple: true,
  });

  const removeImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
    setPreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = parseInt(active.id as string);
      const newIndex = parseInt(over?.id as string);
      const newFiles = arrayMove(value, oldIndex, newIndex);
      onChange(newFiles);
      const newPreviews = arrayMove(previews, oldIndex, newIndex);
      setPreviews(newPreviews);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? "Drop the images here ..."
            : "Drag & drop images here, or click to select"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {maxFiles - value.length} slots remaining
        </p>
      </div>

      {value.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value.map((_, i) => i.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {value.map((file, index) => (
                <SortableImage
                  key={index}
                  id={index.toString()}
                  url={previews[index] || URL.createObjectURL(file)}
                  index={index}
                  onRemove={() => removeImage(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
