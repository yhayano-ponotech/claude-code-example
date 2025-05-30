"use client"

import { useState } from "react"
import { Trash2, Plus, Sparkles, ChevronDown, ChevronRight, ListPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Todo, SubTask } from "@/types/todo"

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [expandedTodos, setExpandedTodos] = useState<Set<string>>(new Set())
  const [subtaskInputs, setSubtaskInputs] = useState<{ [key: string]: string }>({})
  const [showSubtaskInput, setShowSubtaskInput] = useState<Set<string>>(new Set())

  const addTodo = () => {
    if (inputValue.trim() === "") return

    setIsAdding(true)
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      createdAt: new Date(),
      subtasks: []
    }

    setTimeout(() => {
      setTodos([...todos, newTodo])
      setInputValue("")
      setIsAdding(false)
    }, 300)
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed
          return {
            ...todo,
            completed: newCompleted,
            subtasks: newCompleted ? todo.subtasks.map(st => ({ ...st, completed: true })) : todo.subtasks
          }
        }
        return todo
      })
    )
  }

  const deleteTodo = (id: string) => {
    setDeletingId(id)
    setTimeout(() => {
      setTodos(todos.filter((todo) => todo.id !== id))
      setDeletingId(null)
    }, 300)
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedTodos)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedTodos(newExpanded)
  }

  const addSubtask = (todoId: string) => {
    const subtaskText = subtaskInputs[todoId]?.trim()
    if (!subtaskText) return

    const newSubtask: SubTask = {
      id: Date.now().toString(),
      text: subtaskText,
      completed: false
    }

    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, subtasks: [...todo.subtasks, newSubtask] }
          : todo
      )
    )

    setSubtaskInputs({ ...subtaskInputs, [todoId]: "" })
    const newShowSubtask = new Set(showSubtaskInput)
    newShowSubtask.delete(todoId)
    setShowSubtaskInput(newShowSubtask)
  }

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          const updatedSubtasks = todo.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
          const allSubtasksCompleted = updatedSubtasks.every(st => st.completed)
          return {
            ...todo,
            subtasks: updatedSubtasks,
            completed: updatedSubtasks.length > 0 ? allSubtasksCompleted : todo.completed
          }
        }
        return todo
      })
    )
  }

  const deleteSubtask = (todoId: string, subtaskId: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, subtasks: todo.subtasks.filter((st) => st.id !== subtaskId) }
          : todo
      )
    )
  }

  const toggleSubtaskInput = (todoId: string) => {
    const newShowSubtask = new Set(showSubtaskInput)
    if (newShowSubtask.has(todoId)) {
      newShowSubtask.delete(todoId)
    } else {
      newShowSubtask.add(todoId)
      if (!expandedTodos.has(todoId)) {
        toggleExpanded(todoId)
      }
    }
    setShowSubtaskInput(newShowSubtask)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const handleSubtaskKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if (e.key === "Enter") {
      addSubtask(todoId)
    }
  }

  const getTaskProgress = (todo: Todo) => {
    if (todo.subtasks.length === 0) return null
    const completed = todo.subtasks.filter(st => st.completed).length
    return { completed, total: todo.subtasks.length }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6 animate-fadeIn">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-slideIn">
          ✨ Todo App
        </h1>
        <p className="text-muted-foreground animate-slideIn" style={{ animationDelay: "0.1s" }}>
          Keep track of your tasks with style and elegance
        </p>
      </div>

      <div className="flex gap-2 animate-slideIn" style={{ animationDelay: "0.2s" }}>
        <Input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 transition-all focus:scale-[1.02] focus:shadow-lg"
          disabled={isAdding}
        />
        <Button 
          onClick={addTodo}
          className="group transition-all hover:scale-105 hover:shadow-lg"
          disabled={isAdding}
        >
          {isAdding ? (
            <Sparkles className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1 group-hover:rotate-180 transition-transform duration-300" />
              Add
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-center py-12 animate-pulse">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No tasks yet. Add one above!
            </p>
          </div>
        ) : (
          todos.map((todo, index) => (
            <div
              key={todo.id}
              className={cn(
                "border rounded-lg transition-all duration-300",
                "hover:shadow-md hover:border-primary/50",
                "animate-slideIn",
                deletingId === todo.id && "opacity-0 scale-95 translate-x-full"
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div 
                className={cn(
                  "flex items-center gap-3 p-4 transition-all duration-300",
                  todo.completed && "bg-accent/30"
                )}
              >
                {todo.subtasks.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => toggleExpanded(todo.id)}
                  >
                    {expandedTodos.has(todo.id) ? (
                      <ChevronDown className="h-4 w-4 transition-transform" />
                    ) : (
                      <ChevronRight className="h-4 w-4 transition-transform" />
                    )}
                  </Button>
                )}
                <Checkbox
                  id={todo.id}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="transition-all duration-300 data-[state=checked]:scale-110"
                />
                <div className="flex-1">
                  <label
                    htmlFor={todo.id}
                    className={cn(
                      "cursor-pointer transition-all duration-300",
                      todo.completed && "line-through text-muted-foreground opacity-60"
                    )}
                  >
                    {todo.text}
                  </label>
                  {todo.subtasks.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {(() => {
                        const progress = getTaskProgress(todo)
                        return progress && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium">{progress.completed}/{progress.total}</span>
                            <span>subtasks completed</span>
                          </span>
                        )
                      })()}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSubtaskInput(todo.id)}
                  className="hover:scale-110 transition-all duration-200"
                  title="Add subtask"
                >
                  <ListPlus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive hover:text-destructive hover:scale-110 hover:rotate-12 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {(expandedTodos.has(todo.id) || showSubtaskInput.has(todo.id)) && (
                <div className="px-4 pb-4 space-y-2 animate-fadeIn">
                  {showSubtaskInput.has(todo.id) && (
                    <div className="flex gap-2 pl-9">
                      <Input
                        type="text"
                        placeholder="Add a subtask..."
                        value={subtaskInputs[todo.id] || ""}
                        onChange={(e) => setSubtaskInputs({ ...subtaskInputs, [todo.id]: e.target.value })}
                        onKeyPress={(e) => handleSubtaskKeyPress(e, todo.id)}
                        className="flex-1 h-8 text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => addSubtask(todo.id)}
                        className="h-8"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                  
                  {todo.subtasks.map((subtask, subIndex) => (
                    <div
                      key={subtask.id}
                      className={cn(
                        "group flex items-center gap-3 pl-9 pr-4 py-2 rounded transition-all duration-300",
                        "hover:bg-accent/20 animate-slideIn"
                      )}
                      style={{ animationDelay: `${subIndex * 0.05}s` }}
                    >
                      <Checkbox
                        id={`${todo.id}-${subtask.id}`}
                        checked={subtask.completed}
                        onCheckedChange={() => toggleSubtask(todo.id, subtask.id)}
                        className="h-3 w-3"
                      />
                      <label
                        htmlFor={`${todo.id}-${subtask.id}`}
                        className={cn(
                          "flex-1 text-sm cursor-pointer transition-all duration-300",
                          subtask.completed && "line-through text-muted-foreground opacity-60"
                        )}
                      >
                        {subtask.text}
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSubtask(todo.id, subtask.id)}
                        className="h-6 w-6 opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="text-sm text-muted-foreground text-center animate-fadeIn">
          <span className="inline-flex items-center gap-2">
            <span className="text-primary font-semibold animate-bounce">
              {todos.filter((todo) => !todo.completed).length}
            </span>
            of
            <span className="font-semibold">{todos.length}</span>
            tasks remaining
            {todos.some(t => t.subtasks.length > 0) && (
              <>
                {" • "}
                <span className="text-primary font-semibold">
                  {todos.reduce((acc, todo) => acc + todo.subtasks.filter(st => !st.completed).length, 0)}
                </span>
                subtasks pending
              </>
            )}
          </span>
        </div>
      )}
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}