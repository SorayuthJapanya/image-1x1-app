import { DropzoneUploader } from "./DropzoneUploader";

export const UploadForm = () => {
  return (
    <div className="w-full max-w-7xl max-auto flex items-center justify-center bg-gray-100 rounded-2xl shadow-lg px-24 py-16">
      <div className="w-full px-16 py-8 bg-white rounded-2xl">
        <div className="px-8 text-center">
          <h2 className="text-3xl font-bold text-black">Upload</h2>
        </div>
        <DropzoneUploader />
      </div>
    </div>
  );
};
