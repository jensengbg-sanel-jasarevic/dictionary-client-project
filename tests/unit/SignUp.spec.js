import { shallowMount } from '@vue/test-utils'
import SignUp from '@/views/SignUp.vue'

describe('SignUp.vue', () => {
  it('Check if Signup button is disbled based on terms', () => {
    const wrapper = shallowMount(SignUp);
    wrapper.setData({ terms: false })
    const signUpButton = wrapper.find('.primaryButton')
    expect(signUpButton.attributes('disabled')).toBeTruthy;
  })

  it('Check if Signup button is activated based on terms', () => {
    const wrapper = shallowMount(SignUp);
    const signUpButton = wrapper.find('.primaryButton');
    signUpButton.trigger('click');
    expect(signUpButton.attributes('disabled')).toBeFalsy;
  })
  it('Check if handleSubmit is called on clicking SignUp button', () => {
    const handleSubmit = jest.spyOn(SignUp.methods, 'handleSubmit');
    expect(handleSubmit).toHaveBeenCalled;
  })
  it('Check if acceptTerms sets terms to true', () => {
    const wrapper = shallowMount(SignUp);
    wrapper.vm.acceptTerms();
    expect(wrapper.vm.$data.terms).toBe(true);
  })
  it('Check if declineTerms sets terms to false', () => {
    const wrapper = shallowMount(SignUp);
    wrapper.vm.declineTerms();
    expect(wrapper.vm.$data.terms).toBe(false);
  })
})
