import { mount } from '@vue/test-utils';
import Tree from '@/components/Tree.vue';

describe('Tree.vue', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const options = {
    propsData: {
      treeData: [{
        name: 'C',
        description: 'description',
        children: [{ name: 'A', description: 'bla' }],
      }],
    },
  };

  it('renders the component and the correct label under the tree', () => {
    const wrapper = mount(Tree, options);
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.text()).toMatch('Nerf Hierarchy');
  });

  it('renders correct number of nodes', () => {
    const wrapper = mount(Tree, { ...options, attachTo: document.body });

    const nodes = wrapper.findAll('.node');
    expect(nodes).toHaveLength(2);
  });

  it('renders the correct name for the root circle', async () => {
    const wrapper = mount(Tree, { ...options, attachTo: document.body });

    const node = wrapper.findAll('.node').at(0);
    expect(node.text()).toMatch('C');
  });

  it('renders the correct name for the leaf circle', async () => {
    const wrapper = mount(Tree, { ...options, attachTo: document.body });

    const node = wrapper.findAll('.node').at(1);
    expect(node.text()).toMatch('A');
  });
});
