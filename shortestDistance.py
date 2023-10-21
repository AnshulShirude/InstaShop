def shortest_path(matrix, nodes_to_cover):
    m, n = len(matrix), len(matrix[0])
    start = (m-1, n-1)
    end = (m-1, 0)
    visited = [[False for _ in range(n)] for _ in range(m)]
    directions = [(0,1),(1,0),(0,-1),(-1,0)]
    
    def is_valid(x, y):
        return 0 <= x < m and 0 <= y < n

    best_path_len = [float('inf')]
    best_path_nodes = []
    
    def backtrack(x, y, covered, path_len, current_path):
        if (x, y) == end and covered == set(nodes_to_cover):
            if path_len < best_path_len[0]:
                best_path_len[0] = path_len
                best_path_nodes[:] = current_path[:]
            return
        if path_len >= best_path_len[0]:  # Prune paths that are already too long
            return
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if is_valid(nx, ny) and not visited[nx][ny]:
                visited[nx][ny] = True
                current_path.append((nx, ny))
                if (nx, ny) in nodes_to_cover:
                    backtrack(nx, ny, covered | {(nx, ny)}, path_len+1, current_path)
                else:
                    backtrack(nx, ny, covered, path_len+1, current_path)
                current_path.pop()
                visited[nx][ny] = False

    visited[start[0]][start[1]] = True
    backtrack(start[0], start[1], set(), 0, [start])
    
    if best_path_len[0] != float('inf'):
        return best_path_len[0], best_path_nodes
    else:
        return None, []

# # Example
# matrix = [[0]*4 for _ in range(3)]
# nodes_to_cover = [(0, 0), (0, 2), (2, 1)]
# distance, path = shortest_path(matrix, nodes_to_cover)
# print(distance)
# print(path)

# #Example
# matrix = [[0]*4 for _ in range(4)]
# matrix[0] = [1,2,3,4]
# matrix[1] = [4,5,6,7]
# matrix[2] = [8,9,10,11]
# matrix[3] = [12,13,14,15]
# print(matrix[0][2])
# nodes_to_cover = [(0, 0), (0, 2), (2, 1)]
# print(shortest_path(matrix, nodes_to_cover))

# Example 3
matrix = [[0]*4 for _ in range(4)]
matrix[0] = [1,2,3,4]
matrix[1] = [4,5,6,7]
matrix[2] = [8,9,10,11]
matrix[3] = [12,13,14,15]
nodes_to_cover = [(0, 0), (3, 0), (0, 1), (0,2),(2,1)]
print(shortest_path(matrix, nodes_to_cover))

