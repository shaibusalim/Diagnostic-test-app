# Diagnostic Test Results Manager

A full-stack web application built with **Next.js, Prisma ORM, and PostgreSQL** to help medical laboratories efficiently manage diagnostic test results.

---

## Features
✅ **CRUD Operations**: Add, view, edit, and delete test results.  
✅ **User-Friendly UI**: Built with React and Tailwind CSS.  
✅ **Pagination**: Easily navigate through test results.  
✅ **Validation**: Ensures data integrity with Zod.  
✅ **Notifications**: Success and error toasts using react-toastify.  

---

## Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS  
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL  
- **Validation**: Zod  
- **Deployment**: Vercel  

---

## Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/diagnostic-test-results-manager.git
cd diagnostic-test-results-manager
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up the Database
1. Create a **PostgreSQL** database.
2. Update the **.env** file with your database connection URL:

```sh
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```

### 4️⃣ Run Migrations
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Application
```sh
npm run dev
```

### 6️⃣ Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## API Documentation

### **Endpoints**

#### **POST** `/api/tests`
**Description**: Add a new test result.

**Request Body:**
```json
{
  "patientName": "string",
  "testType": "string",
  "result": "string",
  "testDate": "string (ISO format)",
  "notes": "string (optional)"
}
```
**Response:**
```json
{
  "id": 1,
  "patientName": "string",
  "testType": "string",
  "result": "string",
  "testDate": "string",
  "notes": "string"
}
```

---

#### **GET** `/api/tests`
**Description**: Fetch all test results.

**Response:**
```json
[
  {
    "id": 1,
    "patientName": "string",
    "testType": "string",
    "result": "string",
    "testDate": "string",
    "notes": "string"
  }
]
```

---

#### **GET** `/api/tests/:id`
**Description**: Fetch a single test result by ID.

**Response:**
```json
{
  "id": 1,
  "patientName": "string",
  "testType": "string",
  "result": "string",
  "testDate": "string",
  "notes": "string"
}
```

---

#### **PUT** `/api/tests/:id`
**Description**: Update a test result by ID.

**Request Body:**
```json
{
  "patientName": "string",
  "testType": "string",
  "result": "string",
  "testDate": "string (ISO format)",
  "notes": "string (optional)"
}
```
**Response:**
```json
{
  "id": 1,
  "patientName": "string",
  "testType": "string",
  "result": "string",
  "testDate": "string",
  "notes": "string"
}
```

---

#### **DELETE** `/api/tests/:id`
**Description**: Delete a test result by ID.

**Response:**
```json
{
  "message": "Test result deleted successfully"
}
```


## **Live Demo**
Check out the live demo deployed on **Vercel**:  
🔗 **[Live Demo](https://diagnostic-test-app-dq7f-git-main-salim-shaibus-projects.vercel.app)**

---

## **License**
This project is licensed under the **MIT License**.

---

### **🚀 Happy Coding!** 🎉

