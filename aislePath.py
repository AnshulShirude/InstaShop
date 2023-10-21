from Graph import Graph

store_graph = Graph()

# Add categories as nodes
for category in ['Fruits', 'Vegetables', 'Dairy', 'Toys/Games', 'Clothing']:
    store_graph.add_node(category)

# Add paths between categories with distances (for illustration purposes)
store_graph.add_edge('Fruits', 'Vegetables', 10)
store_graph.add_edge('Vegetables', 'Dairy', 15)
store_graph.add_edge('Dairy', 'Toys/Games', 20)
store_graph.add_edge('Toys/Games', 'Clothing', 5)

# Get shortest path
print(store_graph.get_shortest_path('Fruits', 'Clothing'))  
# ['Fruits', 'Vegetables', 'Dairy', 'Toys/Games', 'Clothing']
