import { mount } from '@vue/test-utils'
import HeaderComponent from '../HeaderComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'
import { beforeAll, describe, it, expect, vi } from 'vitest'

/* -------------------------------------------------- *
 *  Test-bed router: minimal paths the header uses
 * -------------------------------------------------- */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/products', component: { template: '<div>Products</div>' } },
    { path: '/contact', component: { template: '<div>Contact</div>' } },
  ],
})

/* -------------------------------------- *
 *  Helper to mount with/without stubbing
 * -------------------------------------- */
function mountHeader({ stubLinks = true } = {}) {
  return mount(HeaderComponent, {
    global: {
      plugins: [createTestingPinia(), router],
      stubs: stubLinks ? { RouterLink: true } : {},
    },
  })
}

describe('HeaderComponent.vue', () => {
  beforeAll(async () => {
    router.push('/')
    await router.isReady()
  })

  it('renders core elements', () => {
    const wrapper = mountHeader()
    expect(wrapper.text()).toMatch(/SAQAYA Shop/i)
    expect(wrapper.find('[data-test="cart-icon"]').exists()).toBe(true)
    expect(wrapper.find('.hamburger').exists()).toBe(true)
  })

  it('toggles dark-mode label on click', async () => {
    const wrapper = mountHeader()
    const toggle = wrapper.find('.dark-toggle-btn')

    expect(toggle.text()).toMatch(/Dark Mode/)
    await toggle.trigger('click')
    expect(toggle.text()).toMatch(/Light Mode/)
  })

  it('opens cart sidebar when cart icon clicked', async () => {
    const wrapper = mountHeader()
    await wrapper.find('[data-test="cart-icon"]').trigger('click')
    expect(wrapper.findComponent({ name: 'CartSidebar' }).props('visible')).toBe(true)
  })

  it('navigates to products when link clicked', async () => {
    /* mount WITHOUT stubbing RouterLink so the real <a> renders */
    const wrapper = mountHeader({ stubLinks: false })

    /* spy on router.push */
    const pushSpy = vi.spyOn(router, 'push')

    // find the <router-link> whose to prop is "/products"
    const link = wrapper.findComponent(RouterLink)
    await link.trigger('click')

    expect(pushSpy).toHaveBeenCalledWith('/products')
  })
})
