from fastapi import APIRouter, UploadFile, File
from src.services.cropper import crop_to_yolo_square
from src.services.zipper import create_zip
import tempfile
import shutil
import os
from fastapi.responses import FileResponse

router = APIRouter()


@router.post("/uploads/")
async def uploaded_images(files: list[UploadFile] = File(...)):
    temp_input = tempfile.mkdtemp()
    temp_output = tempfile.mkdtemp()

    for file in files:
        contents = await file.read()
        input_path = os.path.join(temp_input, file.filename)
        with open(input_path, "wb") as f:
            f.write(contents)

        # Format to 1:1
        output_path = os.path.join(temp_output, file.filename)
        crop_to_yolo_square(input_path, output_path)

    zip_path = os.path.join(tempfile.gettempdir(), "Precessed_images.zip")
    create_zip(temp_output, zip_path)

    shutil.rmtree(temp_input)
    shutil.rmtree(temp_output)

    return FileResponse(zip_path, media_type='application/zip', filename="result.zip")


@router.get("/test")
async def test():
    return {"message": "Hello World"}
