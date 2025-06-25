import { mount } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { useCartStore } from '../../stores/cartStore'

// Create mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: { template: '<div>Product Details</div>' },
    },
  ],
})

// Sample product
const sampleProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test product description.',
  category: 'Test Category',
  image: 'https://via.placeholder.com/150',
  rating: 4.5,
}

describe('ProductCard.vue', () => {
  beforeAll(async () => {
    router.push('/')
    await router.isReady()
  })

  it('renders product title and price', () => {
    const wrapper = mount(ProductCard, {
      props: sampleProduct,
      global: {
        plugins: [createTestingPinia(), router],
      },
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('$29.99')
  })

  it('calls addToCart when "Add to Cart" button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: sampleProduct,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
          router,
        ],
      },
    })

    const cartStore = useCartStore()
    const button = wrapper.find('button')
    await button.trigger('click')

    expect(cartStore.addToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: 'Test Product',
        price: 29.99,
        image: 'https://via.placeholder.com/150',
        rating: 4.5,
      }),
    )
  })
})
