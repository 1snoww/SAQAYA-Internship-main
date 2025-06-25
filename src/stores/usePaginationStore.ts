import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    currentPage: 1,
    itemsPerPage: 8
  }),
  actions: {
    nextPage(totalPages: number) {
      if (this.currentPage < totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    resetPage() {
      this.currentPage = 1
    }
  }
})
