import { mount } from '@vue/test-utils'
import FooterComponent from '../FooterComponent.vue'
import { describe, it, expect } from 'vitest'

describe('FooterComponent.vue', () => {
  it('renders copyright', () => {
    const wrapper = mount(FooterComponent)
    expect(wrapper.text().toLowerCase()).toContain('©')
  })
})
