import { mount } from '@vue/test-utils'
import HeaderComponent from '../HeaderComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, it, expect, beforeAll } from 'vitest'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
    { path: '/products', name: 'Products', component: { template: '<div>Products</div>' } },
    { path: '/contact', name: 'Contact', component: { template: '<div>Contact</div>' } },
  ],
})

describe('HeaderComponent.vue', () => {
  beforeAll(async () => {
    router.push('/')
    await router.isReady()
  })

  it('renders core header UI elements', () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [createTestingPinia(), router],
        stubs: {
          RouterLink: true, // prevents unresolved <router-link>
        },
      },
    })

    expect(wrapper.text()).toContain('SAQAYA Shop')
    expect(wrapper.text()).toContain('Dark Mode')
    expect(wrapper.find('button').exists()).toBe(true) // hamburger menu
    expect(wrapper.find('[data-test="cart-icon"]').exists()).toBe(true) // safer cart check
  })
})
