"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FiCheck, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  useEffect(() => {
      fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    const params: {
        page: number,
        limit: number,
      } = { page, limit };
    try {
      const res = await api.get("/tasks", { params });
      setTasks(res.data.data);
      setTotal(res.data.metadata.total);
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
    }
  };

  const handleAdd = async () => {
    if (inputValue.trim() === "") return;
    try {
      const res = await api.post("/tasks", { title: inputValue });
      setTasks((prev) => [...prev, res.data]);
      setInputValue("");
      toast.success("Tarefa adicionada com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar tarefa.");
      console.error("Erro ao adicionar task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Tarefa excluida com sucesso!");

    } catch (error) {
      toast.error("Erro ao excluir tarefa.");
      console.error("Erro ao excluir task:", error);
    }
  };

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingValue(text);
  };

  const handleSave = async (id: number) => {
    try {
      const res = await api.patch(`/tasks/${id}`, { title: editingValue });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...res.data } : t))
      );
      setEditingId(null);
      setEditingValue("");
      toast.success("Tarefa salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar tarefa.");
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleToggleComplete = async (
    id: number,
    currentCompleted: boolean
  ) => {
    try {
      const res = await api.patch(`/tasks/${id}`, {
        completed: !currentCompleted,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...res.data } : t))
      );
      toast.success("Tarefa completa!");
    } catch (error) {
      toast.error("Erro ao completar tarefa.");
      console.error("Erro ao concluir/desmarcar task:", error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Minha TODO List</h1>

      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Adicionar
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-white p-3 rounded shadow"
          >
            {editingId === task.id ? (
              <>
                <input
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition mr-2"
                />
                <button
                  onClick={() => handleSave(task.id)}
                  className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
                >
                  <FiCheck />
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleToggleComplete(task.id, task.completed)
                    }
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
                  >
                    {task.completed ? <FiX /> : <FiCheck />}
                  </button>
                  <button
                    onClick={() => handleEdit(task.id, task.title)}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition cursor-pointer"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (<div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>)}
    </main>
  );
}
