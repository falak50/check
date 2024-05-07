"use client"
import React from 'react';

// Defining Types
type Todo = {
    id: number;
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
};

// Composing Types
type TodoListProps = {
    todos: Todo[];
};

export default function page() {
    const sampleTodos: Todo[] = [
        { id: 1, title: "Learn TypeScript", description: "Study TypeScript documentation", priority: "high", completed: false },
        { id: 2, title: "Build a React app", description: "Create a new project and start coding", priority: "medium", completed: false },
        { id: 3, title: "Deploy the app", description: "Prepare the app for deployment", priority: "low", completed: true }
    ];
    return (
        <div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Sample Todos</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Priority</th>
                        <th className="border px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleTodos.map(todo => (
                        <tr key={todo.id} className="border">
                            <td className="border px-4 py-2">{todo.title}</td>
                            <td className="border px-4 py-2">{todo.description}</td>
                            <td className="border px-4 py-2">{todo.priority}</td>
                            <td className="border px-4 py-2">{todo.completed ? "Completed" : "Active"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
