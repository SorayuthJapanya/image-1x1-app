import zipfile
import os


def create_zip(folder_path: str, zip_path: str):
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            zipf.write(file_path, arcname=filename)
