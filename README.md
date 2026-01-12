<div align="center">

# 📄 Orbit | Collaborative Document Editing Platform

![Stars](https://img.shields.io/github/stars/Devsethi3/Orbit?style=for-the-badge&logo=github&color=yellow)
![Forks](https://img.shields.io/github/forks/Devsethi3/Orbit?style=for-the-badge&logo=github&color=blue)
![Language](https://img.shields.io/badge/TypeScript-language-green?style=for-the-badge)

</div>

<div align="center">

### Landing Page

![Landing Page](/public/landing-page.png)

### Dashboard

![Dashboard](/public/placeholder-poster.png)

### Document Editor

![Document Editor](/public/document.png)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contribution](#-contribution)
- [License](#-license)

---

## 📖 Overview

**Orbit** is a collaborative document editing platform built with **Next.js**, **TypeScript**, and **Convex** for backend services. It leverages **Liveblocks** for real-time collaboration and **Tiptap** for a rich text editor, providing a modern, interactive document management system.

### Purpose

Orbit enables users to:

- Create, edit, and manage documents in real-time
- Collaborate with team members simultaneously
- Share documents with controlled access
- Maintain version history and track changes

### Target Audience

- Remote teams needing live collaboration on documents
- Content creators and writers
- Project managers seeking shared document workspaces

---

## 🎯 Features

- **Real-time collaboration:** Multiple users can edit the same document simultaneously.
- **Rich text editor:** Built with Tiptap for modern formatting options.
- **Authentication:** Secure login and registration with Clerk.
- **Document management:** Create, update, delete, and share documents.
- **Responsive UI:** Optimized for desktop and mobile devices.
- **Modern design:** Tailwind CSS styling with smooth animations via GSAP.

---

## 🛠️ Technology Stack

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-333?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-333?style=for-the-badge)
![React](https://img.shields.io/badge/React-333?style=for-the-badge)
![Convex](https://img.shields.io/badge/Convex-333?style=for-the-badge)
![Liveblocks](https://img.shields.io/badge/Liveblocks-333?style=for-the-badge)
![Tiptap](https://img.shields.io/badge/Tiptap-333?style=for-the-badge)
![Clerk](https://img.shields.io/badge/Clerk-333?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-333?style=for-the-badge)
![GSAP](https://img.shields.io/badge/GSAP-333?style=for-the-badge)
![Embla Carousel](https://img.shields.io/badge/Embla%20Carousel-333?style=for-the-badge)
![Radix UI](https://img.shields.io/badge/Radix%20UI-333?style=for-the-badge)
![date-fns](https://img.shields.io/badge/date-fns-333?style=for-the-badge)

</div>

---

## 📁 Project Structure

```text
Orbit/
├── convex/
│   └── Backend logic and schema definitions for Convex database
├── src/app/documents/
│   └── Document-related components and pages (rich text editor, listings)
├── src/app/api/
│   └── API routes for document publishing, Liveblocks auth, etc.
├── src/app/(auth)/
│   └── Authentication pages and logic (sign-in, sign-up)
└── public/
    └── Static assets (images, icons)
```

**Key Directories:**

| Directory            | Purpose                                                            |
| -------------------- | ------------------------------------------------------------------ |
| `convex/`            | Backend logic, database schema, authentication, document functions |
| `src/app/documents/` | Document editor, listings, collaboration components                |
| `src/app/api/`       | API routes for document publishing and Liveblocks integration      |
| `src/app/(auth)/`    | Sign-in/sign-up flows using Clerk                                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Git installed

### Installation

```bash
# Clone the repository
git clone https://github.com/Devsethi3/Orbit.git

# Navigate into the project
cd Orbit

# Switch to main branch
git checkout main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## ⚡ Usage

- Register or log in using the authentication page
- Create a new document from the dashboard
- Use the rich text editor to write and format content
- Invite team members to collaborate in real-time
- Save and manage documents directly from your workspace

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a pull request

Please ensure code is well-documented and follows project conventions.

---

## 📄 License

This project is open-source and available under the **MIT License**.
See the [LICENSE](LICENSE) file for more information.

---

<div align="center">

**Built and maintained by [Devsethi3](https://github.com/Devsethi3)**

</div>
