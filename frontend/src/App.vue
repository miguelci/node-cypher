<template>
  <div id="app">
    <h3 v-if="!treeData.length">No data to show, please migrate the data first.</h3>
    <Tree
      v-if="treeData.length"
      :tree-data="treeData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';
import Tree from '@/components/Tree.vue';
import { Hierarchy } from './types';

@Component({
  components: {
    Tree,
  },
})
export default class App extends Vue {
  url = 'http://localhost:3000/tree';

  treeData: Hierarchy[] = [];

  setTreeData(newValue: [Hierarchy]) {
    this.treeData = newValue;
  }

  mounted(): void {
    axios.get(this.url).then((result: AxiosResponse<Hierarchy|string>) => {
      if (typeof result.data === 'string') {
        return;
      }
      this.setTreeData([result.data]);
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
