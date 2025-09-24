# Talentful Attendance - Client

Modern attendance management system with React Router v7, TypeScript, and Tailwind CSS.

## ✨ Features

**Admin**

- Employee management (CRUD)
- Attendance monitoring
- Role management
- Dashboard analytics

**Employee**

- Check-in/Check-out
- Attendance history
- Profile management
- Real-time notifications

## 🛠️ Tech Stack

- React Router v7 + TypeScript
- Tailwind CSS
- Firebase Realtime Database
- Uploadcare (Image uploads)
- Vite
- React Toastify

## 🚀 Quick Start

```bash
cd client
npm install
npm run dev
```

## 📁 Structure

```
app/
├── components/ui/     # UI components
├── routes/           # Pages (admin/, employee/, auth/)
├── lib/api.ts        # API client
├── config/firebase.ts # Firebase config
└── context.ts        # React context
```

## 🔧 Configuration

**Firebase** (`app/config/firebase.ts`)

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  databaseURL: "your-database-url",
  // ... other config
};
```

**API** (`app/lib/api.ts`)

```typescript
const API_BASE_URL = "http://localhost:3000";
```

**Uploadcare** (`app/config/uploadcare.ts`)

```typescript
export const UPLOADCARE_PUBLIC_KEY = "your-public-key";
```

## 📡 API Methods

```typescript
import { apiClient } from "~/lib/api";

// Auth
await apiClient.login({ email, password });

// Employees
await apiClient.getAllEmployees();
await apiClient.createEmployee(data);
await apiClient.updateEmployeeProfile(id, data);

// Attendance
await apiClient.checkIn();
await apiClient.getAttendanceHistory();
```

## 🎨 Components

```tsx
// Button
<Button onClick={handleClick}>Click Me</Button>

// Card
<Card><div className="p-6">Content</div></Card>

// Status Badge
<StatusBadge status="ADMIN" />

// Image Upload
<ImageUpload onUpload={handleImageUpload} />
```

## 🔐 Routes

```
/                    # Landing
/auth/login         # Login
/admin              # Admin dashboard
/admin/attendance   # Attendance management
/employee           # Employee dashboard
/employee/profile   # Profile management
```

## 🖼️ Image Upload

Uses Uploadcare for profile pictures:

```typescript
import { uploadFile } from "~/lib/uploadcare";

const handleImageUpload = async (file: File) => {
  const imageUrl = await uploadFile(file);
  // Use imageUrl in profile update
};
```

## 🐳 Docker

```bash
docker build -t talentful-client .
docker run -p 5173:5173 talentful-client
```

## 📦 Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run preview  # Preview build
```

---

**Built with ❤️ using React Router v7**
