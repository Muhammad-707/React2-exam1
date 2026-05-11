import React from "react";
import { useStore } from "../../reducer/reducer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreditCard, Calendar, User, DollarSign, Globe, Mail } from "lucide-react";

export const InfoModal = () => {
    const { isInfoOpen, setInfoOpen, selectedUser } = useStore();

    if (!selectedUser) return null;

    return (
        <Dialog open={isInfoOpen} onOpenChange={(val) => setInfoOpen(val)}>
            <DialogContent className="sm:max-w-[420px] p-6 rounded-[32px] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="mb-6 text-center">
                    <h2 className="text-[24px] font-bold text-[#1e293b]">Details</h2>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-50 shadow-md overflow-hidden bg-slate-100 flex items-center justify-center mb-2">
                        {selectedUser.img ? (
                            <img src={selectedUser.img} alt={selectedUser.name} className="w-full h-full object-cover" />
                        ) : (
                            <User size={24} className="text-slate-300" />
                        )}
                    </div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Profile Photo</span>
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Service Information</label>
                        <div className="w-full p-3 bg-white border-[1.5px] border-slate-200 rounded-2xl flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <Globe size={14} className="text-blue-500" /> {selectedUser.name}
                            </span>
                            <span className="text-xs text-slate-400 ml-6 truncate">{selectedUser.url}</span>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Card Number</label>
                        <div className="w-full p-3 bg-slate-50 border-[1.5px] border-slate-200 rounded-2xl flex items-center gap-2">
                            <CreditCard size={16} className="text-slate-400" />
                            <span className="text-xs font-mono font-bold tracking-wider text-slate-700">
                                {selectedUser.card}
                            </span>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Assigned To</label>
                        <div className="w-full p-3 bg-white border-[1.5px] border-slate-200 rounded-2xl flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <User size={14} className="text-blue-500" /> {selectedUser.assignedTo || "Muhammad"}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-2 ml-6 truncate">
                                <Mail size={12} /> {selectedUser.email}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Date</label>
                            <div className="w-full p-3 bg-white border-[1.5px] border-slate-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-slate-700">
                                <Calendar size={14} className="text-slate-400" />
                                {selectedUser.date || selectedUser.lastTransaction}
                            </div>
                        </div>
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">Amount</label>
                            <div className="w-full p-3 bg-white border-[1.5px] border-slate-200 rounded-2xl flex items-center gap-1 text-xs font-bold text-slate-900">
                                <DollarSign size={14} className="text-emerald-500" />
                                {selectedUser.amount}
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => setInfoOpen(false)} className="w-full mt-6 py-3 bg-[#3b82f6] text-white rounded-2xl font-bold uppercase transition-all">Close</button>
            </DialogContent>
        </Dialog>
    );
};