import os
import torch
import ultralytics
from ultralytics import YOLO

print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"Ultralytics version: {ultralytics.__version__}")

# โหลดโมเดล
model_path = './src/models/best32.pt'
model = YOLO(model_path)
print("✅ YOLOv12 setup successful!")

# เช็คว่าไฟล์ภาพมีจริงไหม
image_path = "./src/test/DSC_3693.JPG"
if not os.path.exists(image_path):
    print("❌ Image does not exist:", image_path)
else:
    results = model(image_path)
    results[0].show()
