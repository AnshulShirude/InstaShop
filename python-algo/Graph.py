class Graph:
    def __init__(self):
        self.nodes = set()  # A set of all nodes in the graph
        self.edges = {}     # A dictionary of nodes to their neighbors

    def add_node(self, value):
        self.nodes.add(value)
        self.edges[value] = {}

    def add_edge(self, from_node, to_node, distance):
        self.edges[from_node][to_node] = distance
        self.edges[to_node][from_node] = distance  # Because it's an undirected graph

    def get_shortest_path(self, start, end):
        shortest_paths = {node: (None, float('infinity')) for node in self.nodes}
        visited_nodes = set()
        current_node = start
        shortest_paths[current_node] = (None, 0)
        
        while current_node != end:
            visited_nodes.add(current_node)
            destinations = self.edges[current_node].keys()
            weight_to_current_node = shortest_paths[current_node][1]

            for next_node in destinations:
                weight = self.edges[current_node][next_node] + weight_to_current_node
                if shortest_paths[next_node][1] > weight:
                    shortest_paths[next_node] = (current_node, weight)

            next_destinations = {node: shortest_paths[node] for node in self.nodes if node not in visited_nodes}
            if not next_destinations:
                return "Path not possible"
            current_node = min(next_destinations, key=lambda k: next_destinations[k][1])
        
        # Extract shortest path
        path = []
        while current_node:
            path.append(current_node)
            next_node = shortest_paths[current_node][0]
            current_node = next_node
        return path[::-1]
