import React from "react";
import { useStore } from "../../reducer/reducer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Search, MoreVertical, Plus, Trash2, Edit, Eye, Circle, Download, Filter, User, Radio} from "lucide-react";

import { AddModal } from "./AddModal";
import { EditModal } from "./EditModal";
import { InfoModal } from "./InfoModal";

export default function Crud() {
  const {
    users,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    setAddModalOpen,
    setEditModalOpen,
    setInfoOpen,
    deleteUser
  } = useStore();

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.url?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const maskCardNumber = (card) => {
    if (!card) return "**** **** **** 000000";
    const cleanCard = card.toString().replace(/\s/g, "");
    const last6 = cleanCard.slice(-6);
    return `**** **** **** ${last6}`;
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex gap-6 mb-10">
          <div className="w-[280px] h-[170px] bg-emerald-500 rounded-2xl p-6 text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] opacity-80 font-medium">Current Balance</span>
              <span className="font-bold italic text-sm tracking-tighter">VISA</span>
            </div>
            <div className="text-2xl font-bold mb-4">$4,570,80</div>
            <div className="text-lg tracking-[0.2em] mb-4 font-mono">5294 2436 4780 2468</div>
            <div className="flex gap-10 text-[10px] opacity-80 uppercase tracking-widest">
              <div>
                <p className="opacity-60 mb-0.5 text-[8px]">Name</p>
                <p className="font-semibold">Itai Bracha</p>
              </div>
              <div>
                <p className="opacity-60 mb-0.5 text-[8px]">Valid Thru</p>
                <p className="font-semibold">12/24</p>
              </div>
              <div>
                <p className="opacity-60 mb-0.5 text-[8px]">CVV</p>
                <p className="font-semibold">344</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="w-[280px] h-[170px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="text-sm font-semibold">Add new Card</span>
          </button>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Transactions</h2>

        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[600px]">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search for...."
                className="pl-10 h-10 border-slate-200 bg-white rounded-lg focus-visible:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" className="h-10 gap-2 text-slate-600 border-slate-200 bg-white font-medium">
              Plug & Pay <Radio size={14} className="text-slate-400" />
            </Button>

            <Button variant="outline" className="h-10 gap-2 text-slate-600 border-slate-200 bg-white font-medium">
              Employee <User size={14} className="text-slate-400" />
            </Button>

            <Select onValueChange={(val) => setStatusFilter(val)} defaultValue="All">
              <SelectTrigger className="w-[140px] h-10 bg-white border-slate-200 font-medium">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="h-10 gap-2 text-slate-600 border-slate-200 bg-white font-medium">
              Type <Filter size={14} className="text-slate-400" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Select defaultValue="sort">
              <SelectTrigger className="w-[130px] h-10 bg-white border-slate-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sort">Sort by</SelectItem>
              </SelectContent>
            </Select>
            <Button size="icon" variant="secondary" className="h-10 w-10 bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors">
              <Download size={18} />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="w-12 px-6"><Checkbox /></TableHead>
                <TableHead className="text-slate-500 font-semibold py-4 uppercase text-[11px] tracking-wider">Name</TableHead>
                <TableHead className="text-slate-500 font-semibold uppercase text-[11px] tracking-wider">Card</TableHead>
                <TableHead className="text-slate-500 font-semibold uppercase text-[11px] tracking-wider">Assigned to</TableHead>
                <TableHead className="text-slate-500 font-semibold uppercase text-[11px] tracking-wider">Last Transaction</TableHead>
                <TableHead className="text-slate-500 font-semibold uppercase text-[11px] tracking-wider">Status</TableHead>
                <TableHead className="text-slate-500 font-semibold uppercase text-[11px] tracking-wider">End date</TableHead>
                <TableHead className="text-slate-500 font-semibold uppercase text-[11px] tracking-wider">Total Used</TableHead>
                <TableHead className="w-12 px-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                  <TableCell className="px-6"><Checkbox /></TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs overflow-hidden">
                        {user.img ? <img src={user.img} alt="" className="w-full h-full object-cover" /> : user.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-800">{user.name}</div>
                        <div className="text-[11px] text-slate-400">{user.url || "https://example.com"}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-600">
                    {maskCardNumber(user.card)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-semibold text-slate-800">{user.assignedTo || "Muhammad"}</div>
                    <div className="text-[11px] text-slate-400">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-semibold text-slate-800">{user.date || user.lastTransaction}</div>
                    <div className="text-[11px] text-slate-400">{user.amount}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${user.status === "Done"
                      ? "text-emerald-500 border-emerald-100 bg-emerald-50/30"
                      : "text-orange-500 border-orange-100 bg-orange-50/30"
                      }`}>
                      <Circle className={`w-1.5 h-1.5 fill-current ${user.status === "Done" ? "animate-pulse" : ""}`} />
                      {user.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500 font-medium">{user.endDate || "Jan 12, 2022"}</TableCell>
                  <TableCell className="text-sm font-extrabold text-slate-900">{user.amount}</TableCell>
                  <TableCell className="px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-800">
                          <MoreVertical size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-slate-100">
                        <DropdownMenuItem onClick={() => setInfoOpen(true, user)} className="gap-3 py-2 cursor-pointer">
                          <Eye size={16} className="text-slate-500" /> <span className="font-medium">Info</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditModalOpen(true, user)} className="gap-3 py-2 cursor-pointer">
                          <Edit size={16} className="text-slate-500" /> <span className="font-medium">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteUser(user.id)} className="gap-3 py-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                          <Trash2 size={16} /> <span className="font-medium">Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center text-slate-400 italic">
              No transactions found matching your criteria.
            </div>
          )}
        </div>
      </div>
      <AddModal />
      <EditModal />
      <InfoModal />
    </div>
  );
}