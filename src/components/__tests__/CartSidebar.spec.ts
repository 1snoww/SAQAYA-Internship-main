import { mount } from '@vue/test-utils'
import CartSidebar from '../CartSidebar.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'
import { useCartStore, type CartItem } from '../../stores/cartStore'

/** Factory that mounts CartSidebar with an optional pre-filled cart */
function mountSidebar(items: CartItem[] = []) {
  const pinia = createTestingPinia({
    stubActions: false,
    initialState: {
      cart: { items },
    },
  })

  const wrapper = mount(CartSidebar, {
    global: {
      plugins: [pinia],
      stubs: { RouterLink: true }, // silence router-link warnings
    },
    props: { visible: true },
  })

  return { wrapper, pinia }
}

describe('CartSidebar.vue', () => {
  it('renders title', () => {
    const { wrapper } = mountSidebar()
    expect(wrapper.text()).toContain('Your Cart')
  })

  it('lists items and calls remove action', async () => {
    const demoItem: CartItem = {
      id: 1,
      title: 'Demo',
      price: 10,
      image: '',
      rating: 4,
      quantity: 1,
    }

    const { wrapper } = mountSidebar([demoItem])
    expect(wrapper.text()).toContain('Demo')

    await wrapper.find('button.remove-btn').trigger('click')

    const cart = useCartStore()
    expect(cart.removeFromCart).toHaveBeenCalledWith(1)
  })

  it('emits close on × click', async () => {
    const { wrapper } = mountSidebar()
    await wrapper.find('button.close-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
