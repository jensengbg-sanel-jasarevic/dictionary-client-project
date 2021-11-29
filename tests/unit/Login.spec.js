import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
 
  it('Check if handleSubmit is called on clicking Login button', () => {
    const handleSubmit = jest.spyOn(Login.methods, 'handleSubmit');
    expect(handleSubmit).toHaveBeenCalled;
  })
})
