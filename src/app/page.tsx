import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <TodoList />
      </main>
    </div>
  );
}
