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

  depthFirstReachable(startingNode, targetNode) {
    if((!this.adjacencyList.has(startingNode)) || (!this.adjacencyList.has(targetNode))) {
      return false;  // If either the startingNode or targetNode is not in the graph, return false.
    }
    let stack = [startingNode]; //creates stack with startingNode as only element
    let traversedNodes = new Set(); //This is creating a flag on nodes that have been traversed. We want this to be temporary which is why it is not a property on the node iteself. Making it a set is smart since they don't have duplicates
    while (stack.length) { //while stack is not empty
      const currentNode = stack.shift(); //Takes value of first element in stack and removes it from stack. Each time the while loop runs it is created anew
      if (currentNode === targetNode) {
        return true;
      } else {
        traversedNodes.add(currentNode); //Flags node to show it's been traversed
        const adjacencyList = this.adjacencyList.get(currentNode); //Pulls adjacency list of currentNode
        adjacencyList.forEach(function(node) { //finds all nodes connected to currentNode and adds them to stack
          if (!traversedNodes.has(node)) { //This is a check to see if a node has been visited or traversed already. 
            stack.unshift(node); //If NOT it will be added to the stack using unshift (add to beginning)
          }
        });
      }
    }
    return false; //If stack is empty and targetNode has not been found, return false. This is the case when the target node is outside of the graph
  }

  breadthFirstReachable(startingNode, targetNode) {
    if ((!this.adjacencyList.has(startingNode)) || (!this.adjacencyList.has(targetNode))) {
      return false;
    }
    let queue = [startingNode]; //using queue now versus stack
    let traversedNodes = new Set();
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode === targetNode) {
        return true;
      } else {
        traversedNodes.add(currentNode);
        const adjacencyList = this.adjacencyList.get(currentNode);
        adjacencyList.forEach(function(node) {
          if (!traversedNodes.has(node)) {
            queue.push(node); //using push now versus unshift so that the first node in the queue is the first node in the adjacency list
          }
        });
      }
    }
    return false;
  }
}