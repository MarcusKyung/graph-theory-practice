// const mySet = new Set(); // Create an empty Set

// Add elements to the Set
// mySet.add("data1");
// mySet.add("data2");
// mySet.add("data3");

// You can also create a Set with initial values using an iterable (e.g., an array)

// const anotherSet = new Set(["data1", "data2", "data3"]);


//Graph is set up like this:

// Graph {
//   adjacencyList: Map {
//     'Jasmine': {},
//     'Ada': {},
//   }


export default class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(name) {
    this.adjacencyList.set(name, new Set());
  }

  //.get is a built in property of Map. This is more effective than looping through an object and is a good reason to use a map. 
  hasNode(name) {
    if (this.adjacencyList.get(name)) {
      return true;
    }
    return false;
  }

  createEdge(node1, node2) {
    let set1 = this.adjacencyList.get(node1);
    let set2 = this.adjacencyList.get(node2);
    set1.add(node2);
    set2.add(node1);
  }

  //Could write above as by chaining methods:
  // createEdge(node1, node2) {
  //   this.adjacencyList.get(node1).add(node2);
  //   this.adjacencyList.get(node2).add(node1);
  // }

  hasEdge(node1, node2) {
    if (this.adjacencyList.get(node1).has(node2)) {
      return true
    }
    return false;
  }

  //Need to remove froh both adjacency lists because this is an undirected graph. 
  removeEdge(node1, node2) {
    this.adjacencyList.get(node1).delete(node2);
    this.adjacencyList.get(node2).delete(node1);
  }

  removeNode(name) {
    if (this.adjacencyList.has(name)) {
      this.adjacencyList.get(name).forEach((edge) => {
        this.adjacencyList.get(edge).delete(name);
      });
      this.adjacencyList.delete(name);
    }
  }
}