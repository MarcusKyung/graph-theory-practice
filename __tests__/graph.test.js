import Graph from '../src/graph.js';

describe('Graph', () => {

  let graph = new Graph();

  afterEach(() => {
    graph = new Graph();
  });

  test('should correctly instantiate a graph', () => {
    expect(graph.adjacencyList.size).toEqual(0);
  });
  
  //test is checking the size of the set with the key "Jasmine"
  test('should add a new node', () => {
    graph.addNode("Jasmine");
    expect(graph.adjacencyList.get("Jasmine").size).toEqual(0);
  });

  test('shoudl return false if the node does not exist in the adjacency list', () => {
    expect(graph.hasNode("Ada")).toEqual(false);
  })

  test('check to see if node exists in graph', () => {
    graph.addNode("Jasmine");
    expect(graph.hasNode("Jasmine")).toEqual(true);
  });

  //Want two expects because this is an undirected graph. Each node is in the other's adjacency list.
  //.has is a prototype for Set. We use it to determine if the set has the node we are looking for
  //Efficiency here is at worst O(2N) aka O(N) but mostly will be sub linear
  test('add an edge between two nodes', () => {
    graph.addNode("Jasmine");
    graph.addNode("Ada");
    graph.createEdge("Jasmine, Ada");
    expect(graph.adjacencyList.get("Jasmine").has("ada")).toEqual(true);
    expect(graph.adjacencyList.get("Ada").has("Jasmine")).toEqual(true);
  });

  test('check to see if edge exists in graph', () => {
    graph.addNode("Jasmine");
    graph.addNode("Ada");
    expect(graph.hasEdge("Jasmine", "Ada")).toEqual(false);
  })

  test('add an edge between two nodes', () => {
    graph.addNode("Jasmine");
    graph.addNode("Ada");
    graph.createEdge("Jasmine", "Ada");
    expect(graph.hasEdge("Ada", "Jasmine")).toEqual(true);
  });

  //Test for removing edge
  test('remove an edge between two nodes', () => {
    graph.addNode("Jasmine");
    graph.addNode("Ada");
    graph.createEdge("Jasmine", "Ada");
    graph.removeEdge("Jasmine", "Ada");
    expect(graph.hasEdge("Ada", "Jasmine")).toEqual(false);
  });

  //test for removing a node. This means that we need to remove the node from the adjacency list and all of its adjacent nodes.
  test('should delete a node and all of its adjacent nodes', () => {
    graph.addNode("Ada");
    graph.addNode("Jasmine");
    graph.addNode("Lydia");
    graph.createEdge("Ada", "Jasmine");
    graph.createEdge("Ada", "Lydia");
    graph.removeNode("Ada");
    expect(graph.hasNode("Ada")).toEqual(false);
    expect(graph.hasEdge("Jasmine", "Ada")).toEqual(false);
    expect(graph.hasEdge("Lydia", "Ada")).toEqual(false);
});

})