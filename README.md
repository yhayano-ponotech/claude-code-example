# Todo App with Subtasks

A modern, beautiful Todo application built with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui components. Features hierarchical task management with subtasks and smooth animations.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC)

## ✨ Features

- **📝 Task Management**
  - Create, update, and delete todos
  - Mark tasks as complete/incomplete
  - Hierarchical subtask system
  - Automatic parent task completion when all subtasks are done
  - Progress tracking (X/Y subtasks completed)

- **🎨 Beautiful UI/UX**
  - Smooth animations (fade-in, slide-in, bounce effects)
  - Gradient title with animation
  - Hover effects and micro-interactions
  - Dark mode support
  - Responsive design
  - Loading states with animated icons

- **⚡ Performance**
  - Built with Next.js 15 and Turbopack
  - Optimistic UI updates
  - React 19 with latest features
  - Client-side state management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ponotech/claude-code-example.git
cd claude-code-example
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── todo-list.tsx      # Main todo component
│   └── ui/                # Reusable UI components
│       ├── button.tsx     # Button with variants
│       ├── checkbox.tsx   # Checkbox component
│       └── input.tsx      # Input component
├── lib/
│   └── utils.ts          # Utility functions
└── types/
    └── todo.ts           # TypeScript interfaces
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) 
- **UI Components**: Custom components built with [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Turbopack](https://turbo.build/pack)

## 📋 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎯 Usage

1. **Add a Todo**: Type in the input field and press Enter or click the Add button
2. **Add Subtasks**: Click the list icon (➕) on any todo to add subtasks
3. **Complete Tasks**: Click the checkbox to mark tasks as complete
4. **Delete Tasks**: Click the trash icon to delete tasks or subtasks
5. **View Progress**: See subtask progress below each parent task

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)