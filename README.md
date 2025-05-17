# Vibe Check 🎯

A fun and interactive personality quiz that determines your vibe based on the D&D alignment system. Built with Next.js and modern web technologies.

## 🌟 Features

- **Interactive Quiz**: Engaging questions with beautiful UI and smooth animations
- **Personality Analysis**: Determines your vibe based on the Chaotic-Lawful and Good-Evil axes
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Beautiful gradient backgrounds, animations, and interactive elements
- **Results Tracking**: Saves your vibe results for future reference

## 🎨 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Database**: Supabase
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (for database functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vibe-check.git
   cd vibe-check
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Play

1. Click "Start Quiz" on the home page
2. Answer each question honestly
3. Choose the option that best describes your personality
4. Get your vibe result at the end!

## 🎯 Vibe Types

The quiz determines your vibe based on two axes:

### Alignment Axis
- **Chaotic**: Values freedom and flexibility
- **Lawful**: Values order and structure
- **Neutral**: Balances both approaches

### Morality Axis
- **Good**: Prioritizes others' well-being
- **Evil**: Prioritizes personal gain
- **Neutral**: Balances self-interest and others' needs

## 🛠️ Project Structure

```
vibe-check/
├── app/                 # Next.js app directory
│   ├── quiz/           # Quiz page
│   └── results/        # Results page
├── components/         # React components
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/            # Global styles
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the D&D alignment system
- Built with modern web technologies
- Thanks to all contributors and users!

---

Made with ❤️ by [Your Name] 