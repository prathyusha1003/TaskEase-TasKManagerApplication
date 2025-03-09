# TaskEase - Task Manager Application

## 📌 Overview
TaskEase is a full-stack task management web application that allows users to efficiently manage their tasks. The application provides features such as task creation, categorization, filtering, and search functionality.

## ✅ Key Features
- **Add Tasks:** Easily create and manage tasks effortlessly.
- **Track Work Details:** Monitor progress and maintain task records.
- **Filter & Search Tasks:** Quickly find specific tasks using advanced filters.
- **Mark Tasks as Completed or Pending:** Keep track of task statuses.
- **Secure & Reliable:** Protected with JWT authentication for data security.

With TaskEase, staying productive and organized has never been easier! 🎯

---

## 🛠 Technologies Used & Installation Links

### 🔹 Backend
- **Spring Boot** – Backend Java framework. 
- **Java 17** – Backend programming language. 
### 🔹 Frontend
- **React.js** – Interactive frontend UI. 

### 🔹 Database
- **MySQL Workbench** – Database management. ➡️ 

### 🔹 API Testing
- **Postman** – API testing & debugging. ➡️ 

---

## 🚀 Development Process

### 1️⃣ UI/UX Planning & Architecture
🎨 Before development, the UI/UX design was carefully planned to ensure an intuitive and smooth user experience. The system architecture was structured to define seamless component interactions.

### 2️⃣ Backend Development (Spring Boot & Java 17)
Once the architecture was finalized, backend development began with the definition of key entities:
- **📝 Task** – Represents the user's tasks.
- **👤 User** – Manages authentication and task ownership.

**📌 Controllers & Service Logic:** Controllers and service layers were implemented to handle business logic, process data, and manage requests efficiently.

### 3️⃣ Challenges Faced & Solutions
- **🔐 Password Encryption:** To secure user credentials, AES (Advanced Encryption Standard) was implemented after extensive research on encryption techniques.
- **🔄 Database Relationships:** One-to-Many & Many-to-One mappings in Spring Boot & JPA were implemented, overcoming complexity in entity relationships.

### 4️⃣ API Testing & Frontend Integration
Since the frontend was under development, APIs were tested using Postman to verify all endpoints. Once validated, they were integrated into the React.js frontend for a seamless user experience.

---

## 🚀 How to Set Up & Run TaskEase

### 🛠 Prerequisites
Ensure the following tools and technologies are installed on your system:

#### 🔹 Backend
✅ Java 17 – Required for running Spring Boot.  
✅ Spring Boot – Backend framework for TaskEase.

#### 🔹 Frontend
✅ Node.js – Required for running the React.js frontend.

#### 🔹 Database
✅ MySQL Workbench – Database management tool.

#### 🔹 API Testing (Optional but Recommended)
✅ Postman – For testing APIs before frontend integration.

---

### 📌 Steps to Run TaskEase

#### 1️⃣ Clone the Repository
Use Git to clone the TaskEase project repository:
```sh
 git clone <repository-url>
```
Navigate into the project folder:
```sh
 cd TaskEase
```

#### 🔹 Backend Setup (Spring Boot)
##### 2️⃣ Configure MySQL Database
Open MySQL Workbench and create a database named `taskease`.
Update `application.properties` in the Spring Boot project with your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskease
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```
##### 3️⃣ Run the Spring Boot Application
Navigate to the backend folder:
```sh
 cd backend
```
Run the application using:
```sh
 mvn spring-boot:run
```

#### 🔹 Frontend Setup (React.js)
##### 4️⃣ Install Dependencies
Navigate to the frontend folder:
```sh
 cd frontend
```
Install required dependencies:
```sh
 npm install
```
##### 5️⃣ Start the React.js Application
Run the frontend server:
```sh
 npm start
```
The React app will be available at: `http://localhost:3000`

---

## 🔹 Testing API Endpoints with Postman

#### 1️⃣ Start the Spring Boot Backend
Ensure the backend is running:
```sh
 mvn spring-boot:run
```

#### 2️⃣ Check API Endpoints

## API Endpoints
### Authentication
- `POST /api/user/signup` - User registration
- `GET /api/user/login` - User login

### Task Management
- `GET /api/tasks/fetchAll` - Fetch all tasks
- `POST /api/tasks/add` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `DELETE /api/tasks/{id}` - Delete a task
---

## 🎨 Frontend Development (React.js)
Once the backend was successfully tested using Postman, the focus shifted to frontend development using React.js.

### 🔹 Features Implemented
- **✅ Add Tasks**: Create and manage tasks effortlessly.
- **✅ Edit Tasks**: Modify existing tasks using an intuitive pencil icon.
- **✅ Delete Tasks**: Remove tasks when no longer needed.
- **✅ Filter Tasks**: Keep track of tasks using filtering options for better organization.

### 🔹 Challenges Faced & Solutions
- **⚠️ CORS Issues**: Resolved by configuring appropriate CORS policies in Spring Boot.
- **🎨 Enhancing UI/UX**: Focused on refining UI elements for a better user experience.

---

## 📸 Screenshots of TaskEase Web App Interface
![Signup](https://github.com/user-attachments/assets/e1b91ffb-bcc1-499d-a302-8a8e21541718)
![Login](https://github.com/user-attachments/assets/4f444daa-d623-497f-81a8-4e54ee46e983)
![Dashboard](https://github.com/user-attachments/assets/9a2483df-a963-4a43-9ee4-5c9eb4d1dd40)

TaskEase is a robust and reliable tool that streamlines task management with an intuitive interface and powerful features. 🚀
