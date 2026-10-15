# Lumora (Thoughtfully Chosen, Beautifully Yours)

**Lumora** is a modern e-commerce web application built as part of the BE-XPERT Frontend Capstone Project. It provides a clean shopping experience where users can explore products, browse categories, manage their shopping cart, and access their accounts.

🌐 **Live Demo:** [Visit Lumora](https://lumora-topaz-theta.vercel.app/)

## ✨ Features

- **Product Browsing:** Explore the product catalog and view individual product details.
- **Categories:** Browse products by category.
- **Shopping Cart:** Add items, update quantities, remove products, and view subtotals.
- **User Authentication:** Register, sign in, and manage your profile.
- **Checkout Flow:** Access the checkout experience and its related pages.
- **Admin Dashboard:** Access store management sections for products, categories, and users.
- **Responsive Design:** Use the application on desktop and mobile screens.
- **Light and Dark Themes:** Switch between appearance modes.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Theme Management:** next-themes
- **API:** [EscuelaJS Fake Store API](https://api.escuelajs.co/api/v1)
- **Deployment:** Vercel

## 🚀 Getting Started

Follow these steps to run Lumora locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- npm installed
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/haleluyad/lumora.git
   ```

2. Navigate to the project directory:

   ```bash
   cd lumora
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add:

   ```env
   NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
├── app/           # Pages and routes
│   ├── admin/     # Admin dashboard and management pages
│   ├── cart/      # Shopping cart
│   ├── categories/# Product categories
│   ├── checkout/  # Checkout flow
│   ├── login/     # Sign-in page
│   ├── products/  # Product listing and details
│   ├── profile/   # User profile
│   └── register/  # Registration page
├── components/    # Reusable UI and layout components
├── context/       # Authentication and cart state
└── lib/           # API and application utilities
```

## 🎨 Design

Lumora uses a calm, nature-inspired visual identity with warm neutral backgrounds, forest-green accents, and a clean layout designed to make product discovery feel simple and enjoyable.

## 📚 Acknowledgments

- [BE-XPERT](https://be-xpert-store.vercel.app/) — Capstone project reference
- [EscuelaJS](https://api.escuelajs.co/api/v1) — Product and category API
- [Next.js](https://nextjs.org/) — React framework
- [Vercel](https://vercel.com/) — Deployment platform

---

Built with care as part of the BE-XPERT Frontend Capstone Project.
