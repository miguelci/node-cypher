import axios from 'axios';

export type NodeData = {
  name: string;
  description: string;
  parentId?: string;
  parent: string
};

const httpGet = async (url: string): Promise<NodeData[]> => {
  const response = await axios.get(url);
  const { data } = response.data;

  return data;
};

export default httpGet;
