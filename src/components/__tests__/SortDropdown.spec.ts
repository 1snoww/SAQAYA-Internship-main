import { mount } from '@vue/test-utils'
import SortDropdown from '../SortDropdown.vue'
import { describe, it, expect } from 'vitest'

describe.each(['price-asc', 'price-desc', 'rating-asc', 'rating-desc'])(
  'SortDropdown emits %s',
  (key) => {
    it(`emits "${key}" on change`, async () => {
      const wrapper = mount(SortDropdown)
      await wrapper.find('select').setValue(key)
      const events = wrapper.emitted('sort')
      expect(events).toHaveLength(1)
      expect(events![0]).toEqual([key])
    })
  }
)
