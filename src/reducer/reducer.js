import { create } from "zustand";

export const useStore = create((set) => ({
    users: [
        { id: 1, name: "Figma", url: "https://www.figma.com/", card: "Visa 12342468", assignedTo: "Itai Bracha", email: "itaiBracha31@gmail.com", lastTransaction: "Jan 2, 2022", amount: "$783.22", status: "Done", endDate: "Jan 12, 2022" },
        { id: 2, name: "Adobe XD", url: "https://www.adobe.com/", card: "Visa 12342468", assignedTo: "Itai Bracha", email: "itaiBracha31@gmail.com", lastTransaction: "Jan 2, 2022", amount: "$783.22", status: "Done", endDate: "Jan 12, 2022" },
        { id: 3, name: "Mailchimp", url: "https://www.mailchimp.com/", card: "Visa 12342468", assignedTo: "Itai Bracha", email: "itaiBracha31@gmail.com", lastTransaction: "Jan 2, 2022", amount: "$783.22", status: "Done", endDate: "Jan 12, 2022" },
        { id: 4, name: "WIX", url: "https://www.wix.com/", card: "Visa 12342468", assignedTo: "Itai Bracha", email: "itaiBracha31@gmail.com", lastTransaction: "Jan 2, 2022", amount: "$783.22", status: "Pending", endDate: "Jan 12, 2022" },
        { id: 5, name: "Youtube", url: "https://www.youtube.com/", card: "Visa 12342468", assignedTo: "Itai Bracha", email: "itaiBracha31@gmail.com", lastTransaction: "Jan 2, 2022", amount: "$783.22", status: "Pending", endDate: "Jan 12, 2022" },
    ],

    isAddModalOpen: false,
    isEditModalOpen: false,
    isInfoOpen: false,
    selectedUser: null,

    searchQuery: "",
    statusFilter: "All",

    setSearchQuery: (val) => set({ searchQuery: val }),
    setStatusFilter: (val) => set({ statusFilter: val }),

    setAddModalOpen: (open) => set({ isAddModalOpen: open }),
    setEditModalOpen: (open, user = null) => set({ isEditModalOpen: open, selectedUser: user }),
    setInfoOpen: (open, user = null) => set({ isInfoOpen: open, selectedUser: user }),

    addUser: (user) => set((state) => ({
        users: [...state.users, { ...user, id: Date.now(), card: "Visa **** 0000", lastTransaction: "Today" }]
    })),
    deleteUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
    updateUser: (updated) => set((state) => ({
        users: state.users.map((u) => (u.id === updated.id ? updated : u))
    })),
}));