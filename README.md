# 🌿 Image 1x1 Crop App with YOLOv12

An automatic image cropping API for building datasets of Thai native yam leaves (มันพื้นบ้าน).  
The system detects leaf objects using YOLOv12 and crops them into a square 1:1 ratio—ready for machine learning classification.

---

## 📌 Project Summary (TH)

**แอปสำหรับตัดภาพใบมันพื้นบ้านอัตโนมัติในอัตราส่วน 1:1**  
ระบบนี้ถูกออกแบบมาเพื่อช่วยเตรียมภาพสำหรับทำ Dataset ของโปรเจกต์ _Local Yam Leaf Classification_  
โดยสามารถอัปโหลดภาพหลายใบผ่าน API → ตรวจจับใบไม้ด้วย YOLOv12 → ครอบภาพเป็นอัตราส่วน 1:1 → ส่งกลับเป็น ZIP ไฟล์

---

## 🚀 Features

- ✅ Upload multiple images via API
- 🍃 Detect leaf objects using **YOLOv12**
- 🟩 Crop objects to **1:1 square format**
- 🗂️ Return results as downloadable **ZIP file**
- ⚡ Optimized for ML dataset preparation

---

## 🛠️ Tech Stack

### 📦 Backend

- **FastAPI**
- **Ultralytics / YOLOv12**
- **PyTorch**
- **OpenCV**
- **Pillow**

### 💻 Frontend

- **React (TypeScript)**
- **TailwindCSS**

---

## 📡 Local Development

```http
git clone https://github.com/your-username/image-1x1-app.git
cd image-1x1-app
python -m venv venv
pip install -r requirements.tx
python server.py
```
