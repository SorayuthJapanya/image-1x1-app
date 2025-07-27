import cv2
import numpy as np
from ultralytics import YOLO

model = YOLO("./src/models/best52.pt")


def crop_to_yolo_square(input_path, output_path, max_size=2000):
    # โหลดภาพ
    img = cv2.imread(input_path)
    h_img, w_img = img.shape[:2]

    # รัน YOLO
    results = model(input_path)
    boxes = results[0].boxes.xyxy.cpu().numpy()

    if len(boxes) == 0:
        print("❌ No objects detected in", input_path)
        return

    # เลือกกล่องที่ใหญ่ที่สุด
    box = max(boxes, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))
    x1, y1, x2, y2 = map(int, box)

    # คำนวณขนาดสี่เหลี่ยมจัตุรัสที่ครอบกล่องไว้
    box_w, box_h = x2 - x1, y2 - y1
    square_size = max(box_w, box_h)
    square_size = min(square_size, max_size)  # จำกัดขนาดไม่ให้เกิน 2000

    # หาตำแหน่ง crop ที่ไม่เกินภาพ
    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
    half = square_size // 2
    left = max(0, cx - half)
    top = max(0, cy - half)
    right = min(w_img, cx + half)
    bottom = min(h_img, cy + half)

    # ปรับให้อยู่ในขอบเขต
    crop = img[top:bottom, left:right]
    cv2.imwrite(output_path, crop)
