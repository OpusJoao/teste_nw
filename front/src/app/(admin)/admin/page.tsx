"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export default function AdminPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [userIdFilter, setUserIdFilter] = useState<number | "">("");
  const [statusFilter, setStatusFilter] = useState("");

  async function fetchTasks() {
    try {
      const params: {
        page: number,
        limit: number,
        userId?: number,
        completed?: boolean
      } = { page, limit };
      if (userIdFilter !== "") {
        params.userId = userIdFilter;
      }

      if (statusFilter !== "") {
        params.completed = statusFilter == 'completed';
      }

      const res = await api.get("/tasks/admin", { params });
      setTasks(res.data.data);
      setTotal(res.data.metadata.total);
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [page, userIdFilter, statusFilter]);

  

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administração de Tarefas</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="number"
          placeholder="Filtrar por ID do usuário"
          value={userIdFilter}
          onChange={(e) =>
            setUserIdFilter(e.target.value ? Number(e.target.value) : "")
          }
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">Todos os status</option>
          <option value="completed">Concluídas</option>
          <option value="pending">Pendentes</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Título</th>
              <th className="p-3">Usuário</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{task.id}</td>
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.userId}</td>
                <td className="p-3">
                  {task.completed ? (
                    <span className="text-green-600 font-medium">
                      Concluída
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-medium">
                      Pendente
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  Nenhuma tarefa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}
