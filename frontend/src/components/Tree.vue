<template>
  <div class="wrapper">
    <svg class="graph" id="tree" width="500" height="500" :viewBox="viewBox()">
      <g transform="translate(10,20)">
        <g class="links"/>
        <g class="nodes"/>
      </g>
    </svg>
    <div class="caption">Nerf Hierarchy</div>
    <Modal
      v-if="showModal"
      :header="header"
      :description="description"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import Modal from '@/components/Modal.vue';
import { Hierarchy } from '@/types';

@Component({ components: { Modal } })
export default class Tree extends Vue {
  @Prop() readonly treeData!: Hierarchy[];

  header = '';

  description = '';

  showModal = false;

  currentElement: HTMLElement|null = null;

  setHeader(value: string) {
    this.header = value;
  }

  setCurrentElement(element: HTMLElement | null): void{
    this.currentElement = element;
  }

  viewBox = () => '0 0 500 300';

  setDescription(value: string) {
    this.description = value;
  }

  setModal(value: boolean) {
    this.showModal = value;
  }

  closeModal(): void {
    this.showModal = false;
    if (this.currentElement !== null) {
      this.currentElement.style.stroke = '';
      this.currentElement.style.strokeWidth = '';
    }
    this.setCurrentElement(null);
  }

  click = (ev: {target: HTMLElement}, node: d3.HierarchyNode<Hierarchy>): void => {
    this.setHeader(node.data.name);
    this.setDescription(node.data.description);
    const { target } = ev;

    const parent = target.parentElement;
    if (parent !== null) {
      this.setCurrentElement(parent);
      parent.style.stroke = 'red';
      parent.style.strokeWidth = '2px';
    }

    this.setModal(true);
  }

  mounted(): void {
    const source: Hierarchy[] = this.treeData;
    const root = d3.hierarchy(source[0]);

    const treeLayout = d3.tree();
    treeLayout.size([500, 300]);
    treeLayout(root);
    const tree = d3.select('#tree g.nodes');

    const treeNodes = tree
      .selectAll('g.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .classed('node', true)
      .on('click', this.click);

    treeNodes.append('circle')
      // @ts-expect-error Wrong d3 type
      .attr('cx', (d) => d.x)
      // @ts-expect-error Wrong d3 type
      .attr('cy', (d) => d.y)
      .attr('r', () => 28);

    treeNodes.append('text')
      .attr('class', 'label')
      // @ts-expect-error Wrong d3 type
      .attr('dx', (d) => (d.data.name.length > 1 ? d.x - 11 : d.x - 5))
      // @ts-expect-error Wrong d3 type
      .attr('dy', (d) => d.y + 6)
      .text((d) => d.data.name)
      .style('fill', '#fff');

    d3.select('#tree g.links')
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      // @ts-expect-error Wrong d3 type
      .attr('x1', (d) => d.source.x)
      // @ts-expect-error Wrong d3 type
      .attr('y1', (d) => d.source.y)
      // @ts-expect-error Wrong d3 type
      .attr('x2', (d) => d.target.x)
      // @ts-expect-error Wrong d3 type
      .attr('y2', (d) => d.target.y);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
g.nodes {
  fill: #696969
}

g.links {
  stroke: #696969;
}
</style>
