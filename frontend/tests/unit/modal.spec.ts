import { shallowMount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {
  const wrapper = shallowMount(Modal, {
    propsData: {
      header: 'modal header',
      description: 'modal description',
    },
  });

  it('renders the component with header and description', () => {
    const header = wrapper.find('.modal-header');
    expect(header.text()).toMatch('modal header');
    const description = wrapper.find('.modal-body');
    expect(description.text()).toMatch('modal description');
  });
});
