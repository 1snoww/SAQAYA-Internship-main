import { mount } from '@vue/test-utils'
import CartSidebar from '../CartSidebar.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'

describe('CartSidebar.vue', () => {
  it('renders cart title', () => {
    const wrapper = mount(CartSidebar, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        visible: true,
      },
    })
    expect(wrapper.text()).toContain('Your Cart')
  })

  it('emits close event when close button clicked', async () => {
    const wrapper = mount(CartSidebar, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: { visible: true },
    })

    await wrapper.find('button.close-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
