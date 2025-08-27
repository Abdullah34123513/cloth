# 🛍️ KSA Fashion - E-commerce Website

A complete e-commerce website built for the Saudi Arabian market, featuring traditional and contemporary clothing with modern web technologies.

## 🚀 Features

### 🛒 E-commerce Functionality
- **Product Catalog** - Browse and search through clothing collections
- **Shopping Cart** - Full cart functionality with add/remove/update items
- **Checkout Process** - Multi-step checkout with manual bank transfer payment
- **Order Management** - Complete order tracking and status management
- **User Accounts** - Customer registration, login, and profile management
- **Admin Panel** - Comprehensive admin dashboard for store management

### 🎨 User Interface
- **Responsive Design** - Mobile-first design that works on all devices
- **Search & Filters** - Advanced product filtering by category, price, size, color
- **Product Variants** - Size and color selection for products
- **Image Gallery** - Product image galleries with zoom functionality
- **Interactive UI** - Smooth animations and modern user experience

### 🔧 Technical Features
- **Database** - SQLite with Prisma ORM for efficient data management
- **Authentication** - NextAuth.js for secure user authentication
- **Payment System** - Manual bank transfer with admin verification
- **Real-time Updates** - Socket.io integration for real-time features
- **Type Safety** - Full TypeScript implementation with proper typing

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database ORM with SQLite
- **NextAuth.js** - Authentication solution
- **Socket.io** - Real-time communication

### Development Tools
- **Cross-env** - Cross-platform environment variables
- **Nodemon** - Development server with auto-reload
- **ESLint** - Code linting and formatting
- **tsx** - TypeScript execution

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install Dependencies
```bash
# Clone the repository
git clone https://github.com/Abdullah34123513/cloth.git
cd cloth

# Install dependencies
npm install
```

### Database Setup
```bash
# Push database schema
npm run db:push

# Generate Prisma client
npm run db:generate
```

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./db/custom.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## 🚀 Running the Application

### Development Server

#### For macOS/Linux:
```bash
# Start development server
npm run dev

# The application will be available at http://localhost:3000
```

#### For Windows:
```bash
# Start development server (Windows compatible)
npm run dev:windows

# The application will be available at http://localhost:3000
```

### Production Build

#### For macOS/Linux:
```bash
# Build the application
npm run build

# Start production server
npm start
```

#### For Windows:
```bash
# Build the application (Windows compatible)
npm run build:windows

# Start production server (Windows compatible)
npm run start:windows
```

### Database Commands
```bash
# Push database schema changes
npm run db:push

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Reset database
npm run db:reset
```

## 🎯 Available Scripts

| Script | Description | Platform |
|--------|-------------|----------|
| `npm run dev` | Start development server | macOS/Linux |
| `npm run dev:windows` | Start development server | Windows |
| `npm run build` | Build for production | macOS/Linux |
| `npm run build:windows` | Build for production | Windows |
| `npm run start` | Start production server | macOS/Linux |
| `npm run start:windows` | Start production server | Windows |
| `npm run lint` | Run ESLint | All |
| `npm run db:push` | Push database schema | All |
| `npm run db:generate` | Generate Prisma client | All |
| `npm run db:migrate` | Run migrations | All |
| `npm run db:reset` | Reset database | All |

## 👥 Demo Credentials

### Customer Account
- **Email**: customer@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@example.com
- **Password**: password123

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── about/                     # About Us page
│   ├── account/                   # User account pages
│   ├── admin/                     # Admin panel
│   ├── api/                       # API routes
│   │   └── auth/                   # Authentication API
│   ├── cart/                      # Shopping cart
│   ├── checkout/                  # Checkout process
│   ├── contact/                   # Contact page
│   ├── faq/                       # FAQ page
│   ├── login/                     # Login page
│   ├── orders/                    # Order management
│   ├── product/                   # Product details
│   │   └── [id]/                 # Dynamic product pages
│   ├── shop/                      # Product listing
│   ├── signup/                    # Registration page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                    # React components
│   ├── layout/                    # Layout components
│   │   ├── footer.tsx            # Footer component
│   │   └── navigation.tsx        # Navigation component
│   └── ui/                       # shadcn/ui components
├── hooks/                         # Custom React hooks
├── lib/                          # Utility libraries
│   ├── auth/                     # Authentication configuration
│   ├── db.ts                     # Database connection
│   └── utils.ts                  # Utility functions
└── globals.css                   # Global styles
```

## 🎨 Key Pages

### Homepage (`/`)
- Hero section with call-to-action
- Featured products showcase
- Category browsing
- Newsletter subscription
- Trust badges and features

### Shop (`/shop`)
- Product grid/list view toggle
- Advanced search and filtering
- Category navigation
- Pagination
- Sorting options

### Product Detail (`/product/[id]`)
- Image gallery with thumbnails
- Product variants (size/color)
- Add to cart functionality
- Product information tabs
- Related products
- Customer reviews

### Shopping Cart (`/cart`)
- Cart item management
- Quantity updates
- Promo code support
- Order summary
- Shipping calculation
- Progress to checkout

### Checkout (`/checkout`)
- Multi-step checkout process
- Shipping information form
- Bank transfer payment option
- Order confirmation
- Payment instructions

### User Account (`/account`)
- Profile management
- Order history
- Address management
- Security settings
- Two-factor authentication

### Admin Panel (`/admin`)
- Dashboard with statistics
- Product management (CRUD)
- Order management and tracking
- Payment verification system
- User management
- Analytics and reporting

### Static Pages
- **About Us** - Company story and values
- **Contact** - Contact form and information
- **FAQ** - Frequently asked questions

## 🔧 Key Features

### Search & Filter System
- Full-text product search
- Filter by category, price range, size, color
- Sorting options (price, rating, newest)
- Real-time filter updates

### Shopping Cart
- Add/remove/update items
- Quantity controls
- Promo code integration
- Stock availability checking
- Persistent cart storage

### Checkout Process
- Multi-step form validation
- Guest checkout option
- Shipping address management
- Bank transfer payment
- Order confirmation

### Admin Panel
- Product CRUD operations
- Order status management
- Payment verification
- User management
- Dashboard analytics

### Authentication
- User registration and login
- Role-based access control
- Password recovery
- Session management
- Protected routes

## 🌟 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

Key responsive features:
- Mobile-first navigation with hamburger menu
- Responsive product grids
- Touch-friendly interface elements
- Optimized form layouts for all devices

## 🔒 Security Features

- **Authentication** - Secure login with NextAuth.js
- **Authorization** - Role-based access control
- **Input Validation** - Zod schema validation
- **CSRF Protection** - Built-in Next.js security
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Setup for Production
```env
# Production environment variables
NODE_ENV=production
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the FAQ page in the application
- Contact the development team

---

Built with ❤️ for the Saudi Arabian e-commerce market.
