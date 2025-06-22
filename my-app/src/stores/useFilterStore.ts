import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    selectedCategory: '',
    sortOption: '',
    searchTerm: ''
  }),
  actions: {
    setCategory(category: string) {
      this.selectedCategory = category
    },
    setSort(option: string) {
      this.sortOption = option
    },
    setSearch(term: string) {
      this.searchTerm = term
    },
    resetFilters() {
      this.selectedCategory = ''
      this.sortOption = ''
      this.searchTerm = ''
    }
  }
})
