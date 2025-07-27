import { X } from "lucide-react";

interface PreviewImageProps {
  images: File[];
  onRemove: (index: number) => void;
}

export const PreviewImage = ({ images, onRemove }: PreviewImageProps) => {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2">
      {images.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);

        return (
          <div
            key={index}
            className="relative border rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
          >
            <img
              src={imageUrl}
              alt={`preview-${index}`}
              className="w-full h-48 object-cover"
            />

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
