import { useState, useCallback } from "react";
import axios from "axios";
import { CloudUpload, Loader2, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { PreviewImage } from "./PreviewImage";

const BASE_URL = import.meta.env.VITE_SERVER_URL

export const DropzoneUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    setMessage("");
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
    },
    multiple: true,
    noClick: true, // Disable default click so we control it with our custom Browse button
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(
        `${BASE_URL}/api/uploads/`,
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_images.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage("✅ Uploaded and downloaded successfully!");
    } catch (error) {
      setMessage("❌ Upload failed. Please try again.");
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setFiles([]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (uploading) {
    return (
      <div className="flex items-center justify-center py-4 text-gray-500">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="my-8">
      <div
        className={`px-12 py-6 border-2 border-dotted border-primary/50 rounded bg-primary/5 cursor-pointer ${
          isDragActive ? "bg-primary/10" : ""
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <div
          className="flex flex-col items-center justify-center gap-4"
          onClick={open}
        >
          <CloudUpload className="text-primary size-14" />
          <p className="text-gray-700">
            Drag & Drop or{" "}
            <span className="text-primary underline">Browse</span> your images
          </p>
          <p className="text-sm text-gray-500">Only JPEG files supported</p>
        </div>
      </div>

      <div className="mt-10">
        <PreviewImage images={files} onRemove={handleRemoveImage} />
      </div>

      {files.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">{files.length} file(s) selected</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition cursor-pointer duration-200"
          >
            <div className="flex items-center gap-2 justify-center">
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud size={18} />
                  Upload & Download ZIP
                </>
              )}
            </div>
          </button>
        </div>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-600">
          {message}
        </p>
      )}
    </div>
  );
};
