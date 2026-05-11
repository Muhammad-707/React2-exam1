import React, { useState } from "react";
import { useStore } from "../../reducer/reducer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { Uploader } from "./Uploader"; // Importiruem

export const AddModal = () => {
    const { isAddModalOpen, setAddModalOpen, addUser } = useStore();
    const [form, setForm] = useState({
        name: "",
        url: "",
        email: "",
        card: "",
        date: "",
        amount: "",
        status: "Pending",
        img: ""
    });

    const handleSave = () => {
        addUser({ ...form, id: Date.now() });
        setAddModalOpen(false);
        setForm({ name: "", url: "", email: "", card: "", date: "", amount: "", status: "Pending", img: "" });
    };

    return (
        <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
            <DialogContent className="sm:max-w-[500px] p-8 rounded-[32px] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="mb-6"><h2 className="text-[26px] font-bold text-slate-800">Add new</h2></div>
                <div className="space-y-4">
                    <Uploader
                        image={form.img}
                        onChange={(url) => setForm({ ...form, img: url })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Name</label>
                            <input className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm"
                                placeholder="Figma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">URL</label>
                            <input className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm"
                                placeholder="https://..." value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">E-mail</label>
                        <input className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm"
                            placeholder="example@mail.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Visa Number</label>
                            <input className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm"
                                placeholder="4780 2468" value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} />
                        </div>
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Date</label>
                            <input className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm"
                                placeholder="Jan 2, 2022" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Price</label>
                            <input className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm font-bold"
                                placeholder="$0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                        </div>
                        <div className="relative group">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Status</label>
                            <div className="relative">
                                <select className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                                    value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                    <option value="Done">Done</option>
                                    <option value="Pending">Pending</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button onClick={handleSave} className="flex-1 py-4 bg-blue-500 text-white rounded-2xl font-bold text-sm uppercase hover:bg-blue-600 transition-all">Save</button>
                    <button onClick={() => setAddModalOpen(false)} className="flex-1 py-4 border-[1.5px] border-blue-500 text-blue-500 rounded-2xl font-bold text-sm uppercase hover:bg-blue-50 transition-all">Cancel</button>
                </div>
            </DialogContent>
        </Dialog>
    );
};