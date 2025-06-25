import { mount } from '@vue/test-utils'
import SortDropdown from '../SortDropdown.vue'
import { describe, it, expect } from 'vitest'

describe('SortDropdown.vue', () => {
  it('emits sort event on selection change', async () => {
    const wrapper = mount(SortDropdown)
    const select = wrapper.find('select')
    await select.setValue('price-asc')
    expect(wrapper.emitted('sort')).toBeTruthy()
  })
})
