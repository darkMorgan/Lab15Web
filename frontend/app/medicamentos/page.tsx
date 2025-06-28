"use client";

import { useEffect, useState } from "react";

type TipoMedic = {
    id: number;
    nombre: string;
};

type Medicamento = {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    idTipoMedic: number;
    TipoMedic: TipoMedic;
};

export default function MedicamentosPage() {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [tipos, setTipos] = useState<TipoMedic[]>([]);

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
        idTipoMedic: "",
    });

    const [editId, setEditId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
        idTipoMedic: "",
    });

    const fetchMedicamentos = () => {
        fetch("http://localhost:3001/api/medicamentos")
            .then((res) => res.json())
            .then((data) => setMedicamentos(data));
    };

    useEffect(() => {
        fetchMedicamentos();

        fetch("http://localhost:3001/api/tipos")
            .then((res) => res.json())
            .then((data) => setTipos(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch("http://localhost:3001/api/medicamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: form.nombre,
                precio: parseFloat(form.precio),
                stock: parseInt(form.stock),
                idTipoMedic: parseInt(form.idTipoMedic),
            }),
        })
            .then((res) => res.json())
            .then(() => {
                fetchMedicamentos();
                setForm({
                    nombre: "",
                    precio: "",
                    stock: "",
                    idTipoMedic: "",
                });
            });
    };

    const startEdit = (med: Medicamento) => {
        setEditId(med.id);
        setEditForm({
            nombre: med.nombre,
            precio: med.precio.toString(),
            stock: med.stock.toString(),
            idTipoMedic: med.idTipoMedic.toString(),
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditForm({
            nombre: "",
            precio: "",
            stock: "",
            idTipoMedic: "",
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(`http://localhost:3001/api/medicamentos/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: editForm.nombre,
                precio: parseFloat(editForm.precio),
                stock: parseInt(editForm.stock),
                idTipoMedic: parseInt(editForm.idTipoMedic),
            }),
        })
            .then((res) => res.json())
            .then(() => {
                fetchMedicamentos();
                cancelEdit();
            });
    };

    const handleDelete = (id: number) => {
        if (!confirm("¿Seguro que deseas eliminar este medicamento?")) return;

        fetch(`http://localhost:3001/api/medicamentos/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                fetchMedicamentos();
            });
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center"
            style={{
                backgroundImage:
                    "url('https://wallpapers.com/images/hd/health-pictures-u8ovdjl3g5glla44.jpg')",
            }}
        >
            <div className="backdrop-brightness-50 w-full min-h-screen p-8 flex flex-col items-center overflow-auto">
                <div className="bg-white/90 rounded-lg p-8 w-full max-w-4xl shadow-lg">
                    <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
                        Gestión de Medicamentos
                    </h1>

                    {/* Formulario de registro */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                    >
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Ingrese el nombre del medicamento"
                            value={form.nombre}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 p-3 rounded w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            name="precio"
                            placeholder="Ingrese el precio"
                            value={form.precio}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 p-3 rounded w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            name="stock"
                            placeholder="Ingrese el stock disponible"
                            value={form.stock}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 p-3 rounded w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <select
                            name="idTipoMedic"
                            value={form.idTipoMedic}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 p-3 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccione Tipo de Medicamento</option>
                            {tipos.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.nombre}
                                </option>
                            ))}
                        </select>


                        <button
                            type="submit"
                            className="md:col-span-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded"
                        >
                            Registrar Medicamento
                        </button>
                    </form>

                    {/* Formulario de edición */}
                    {editId && (
                        <form
                            onSubmit={handleUpdate}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-blue-50 p-4 rounded"
                        >
                            <h2 className="md:col-span-2 text-xl font-bold text-blue-800">
                                Editar Medicamento
                            </h2>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Ingrese el nombre del medicamento"
                                value={editForm.nombre}
                                onChange={handleEditChange}
                                className="bg-gray-50 border border-gray-300 p-3 rounded w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="number"
                                name="precio"
                                placeholder="Ingrese el precio"
                                value={editForm.precio}
                                onChange={handleEditChange}
                                className="bg-gray-50 border border-gray-300 p-3 rounded w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Ingrese el stock disponible"
                                value={editForm.stock}
                                onChange={handleEditChange}
                                className="bg-gray-50 border border-gray-300 p-3 rounded w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <select
                                name="idTipoMedic"
                                value={editForm.idTipoMedic}
                                onChange={handleEditChange}
                                className="bg-gray-50 border border-gray-300 p-3 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="">Seleccione Tipo de Medicamento</option>
                                {tipos.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.nombre}
                                    </option>
                                ))}
                            </select>


                            <div className="flex gap-4 md:col-span-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Tabla */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-blue-700 text-white">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Nombre</th>
                                    <th className="px-4 py-2">Precio</th>
                                    <th className="px-4 py-2">Stock</th>
                                    <th className="px-4 py-2">Tipo</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicamentos.map((med) => (
                                    <tr key={med.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{med.id}</td>
                                        <td className="px-4 py-2">{med.nombre}</td>
                                        <td className="px-4 py-2">S/. {med.precio}</td>
                                        <td className="px-4 py-2">{med.stock}</td>
                                        <td className="px-4 py-2">{med.TipoMedic?.nombre}</td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                onClick={() => startEdit(med)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(med.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
