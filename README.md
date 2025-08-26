# سوق عمان - Oman Classified Ads Website

A responsive, bilingual (Arabic/English) classified ads marketplace for Oman, inspired by OpenSooq and Haraj simplicity. Built with React, Vite, and Tailwind CSS.

## 🌟 Features

### Core Functionality

- **Bilingual Support**: Full Arabic (RTL) and English (LTR) support with seamless language switching
- **Responsive Design**: Mobile-first approach with beautiful UI across all devices
- **Ad Management**: Create, view, and manage classified ads with rich media support
- **Search & Filter**: Advanced search with category, location, and price filtering
- **Analytics**: Track ad views and user interactions (demo implementation)
- **User Authentication**: Mock authentication system with WhatsApp verification UI

### Business Rules

- **Ad Limits**: Maximum 3 active ads per user (enforced in UI)
- **Featured Ads**: Sponsored/featured ad system with priority placement
- **Contact Options**: Direct phone calls and WhatsApp integration
- **Sharing**: Web Share API with clipboard fallback

### Technical Features

- **Modern Stack**: React 18, Vite, Tailwind CSS 4.x
- **Animations**: Smooth Framer Motion animations throughout
- **State Management**: React Context for lightweight state management
- **Routing**: React Router with lazy-loaded pages
- **Performance**: Code splitting, lazy loading, and optimized images

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sooq-emane
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ads/           # Ad-related components
│   ├── common/        # Reusable UI components
│   ├── forms/         # Form components
│   ├── layout/        # Layout components
│   ├── maps/          # Map components
│   ├── search/        # Search and filter components
│   └── plans/         # Subscription plan components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── router/            # Routing configuration
├── state/             # React Context providers
├── styles/            # Global styles and Tailwind config
├── utils/             # Utility functions
├── i18n/              # Internationalization files
└── assets/            # Static assets
```

## 🎨 Design System

### Colors

- **Primary**: #0A7E8C (Teal Blue)
- **Secondary**: #FFB703 (Soft Orange)
- **Background**: #F8F9FA (Light Gray)
- **Text**: #212529 (Dark Gray)

### Typography

- **Arabic**: Tajawal (Primary)
- **English**: Poppins (Fallback)
- **Scale**: Body 16px, H1 32px, H2 28px, H3 24px

### Components

- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Consistent shadow and border radius (8px)
- **Forms**: Clean inputs with validation states
- **Badges**: Status indicators and category labels

## 🌍 Internationalization

The app supports full RTL/LTR switching with:

- **Arabic (RTL)**: Default language with proper text direction
- **English (LTR)**: Secondary language with left-to-right layout
- **Dynamic Content**: All text, dates, and numbers adapt to selected language
- **Currency**: Omani Rial (OMR) formatting with proper localization

## 📱 Pages & Routes

- **Home** (`/`): Hero section, categories, featured/recent ads
- **Categories** (`/categories`): Browse all categories
- **Listings** (`/listings`): Search results with filters
- **Ad Details** (`/ad/:id`): Individual ad view with contact options
- **Create Ad** (`/create`): Two-step ad creation wizard
- **Authentication** (`/login`, `/register`): Mock auth with WhatsApp verification
- **Subscription** (`/subscribe`): Premium plan comparison

## 🔧 Configuration

### Environment Variables

Create a `.env` file for any API keys or configuration:

```env
VITE_APP_TITLE=سوق عمان
VITE_APP_DESCRIPTION=Oman Classified Ads Marketplace
```

### Tailwind Configuration

Custom colors, fonts, and spacing are configured in `tailwind.config.js`.

## 📊 Analytics (Demo)

The app includes a demo analytics system that tracks:

- Ad views (when ads enter viewport)
- Phone call clicks
- WhatsApp message clicks
- Share button clicks

Data is stored in localStorage for demonstration purposes.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Vercel will auto-detect the Vite configuration
3. Deploy with zero configuration

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure redirects for SPA routing

### Manual Deployment

1. Build: `npm run build`
2. Upload `dist` folder to your web server
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by OpenSooq and Haraj simplicity
- Built for the Omani market with local considerations
- Uses modern web technologies for optimal performance

## 📞 Support

For support or questions:

- Email: info@sooqoman.com
- Phone: +968 1234 5678

---

**سوق عمان** - منصة الإعلانات المبوبة الأولى في عمان 🏴‍☠️
