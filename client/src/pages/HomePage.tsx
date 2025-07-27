import { UploadForm } from "../components/UploadForm"

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-white">Format Image to Scale 1:1</h1>
          <div className="mt-8">
            <UploadForm />
          </div>
      </div>
    </div>
  )
}
