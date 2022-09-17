from copy import deepcopy

width = 4 # horizontal board length by dots
length = 4  # vertical board length by dots

# A utility function (also called an objective function or payoff function),
# which defines the final numeric value to player p when the game ends in terminal state s.
def utility(board_status) -> int:
    bot_score = 0
    for i in range(len(board_status)):
        for j in range(len(board_status[i])):
            if board_status[i][j] == 4:
                bot_score += 1
            elif board_status[i][j] == -4:
                bot_score -= 1
    return bot_score

# is_terminal to check if a state is an end state
def is_terminal(board_status) -> bool:
    found = False
    
    for i in range(len(board_status)):
        for j in range(len(board_status[i])):
            if board_status[i][j] != 4 and board_status[i][j] != -4:
                found = True
                break
        if found: break

    return not found

# get_all_possible_move accepts a parameter of line_status and returns a list of actions that can be taken
def get_all_possible_move(line_status) -> list:
    all_possible_move = []
    for i in range(len(line_status)):
        for j in range(len(line_status[i])):
            for k in range(len(line_status[i][j])):
                if (line_status[i][j][k]) == 0:
                    all_possible_move.append([i,j,k])
    return all_possible_move

# update_board_status to update the status of the box
# accepts the board_status, line[i][j][k] parameters, and the player's turn.
# returns a boolean value indicating whether a box has been created
def update_board_status(board_status, i, j, k, turn):
    isBoxFormed = False

    if (i == 0): 
        if (j == 0): 
            board_status[j][k] += 1
            if (board_status[j][k] == 4): 
                if (turn): board_status[j][k] = -4
                isBoxFormed = True
        elif (j == length - 1): 
            board_status[j - 1][k] += 1
            if (board_status[j - 1][k] == 4): 
                if (turn): board_status[j - 1][k] = -4
                isBoxFormed = True
        else: 
            board_status[j - 1][k] += 1
            board_status[j][k] += 1
            if (board_status[j - 1][k] == 4 or board_status[j][k] == 4): 
                if (turn and board_status[j - 1][k] == 4): board_status[j - 1][k] = -4
                if (turn and board_status[j][k] == 4): board_status[j][k] = -4
                isBoxFormed = True
    else:
        if (j == 0): 
            board_status[k][j] += 1
            if (board_status[k][j] == 4): 
                if (turn): board_status[k][j] = -4
                isBoxFormed = True
        elif (j == width - 1):
            board_status[k][j - 1] += 1
            if (board_status[k][j - 1] == 4): 
                if (turn): board_status[k][j - 1] = -4
                isBoxFormed = True
        else: 
            board_status[k][j - 1] += 1
            board_status[k][j] += 1
            if (board_status[k][j - 1] == 4 or board_status[k][j] == 4): 
                if (turn and board_status[k][j - 1] == 4): board_status[k][j - 1] = -4
                if (turn and board_status[k][j] == 4): board_status[k][j] = -4
                isBoxFormed = True        
    return isBoxFormed

# minimax algorithm with alpha-beta pruning    
def alpha_beta_search(state) -> list: 
    _, move = max_value(state, -1000, 1000, 4) 
    return move

# maximize state
def max_value(state, alpha, beta, n):
    if is_terminal(state["board_status"]) or n == 0:
        return utility(state["board_status"]), None

    v = -1000
    move = None
    for action in get_all_possible_move(state["line_status"]):
        i, j, k = action[0], action[1], action[2]
        state2 = deepcopy(state)
        state2["line_status"][i][j][k] = 1 
        # update board_status
        isBoxFormed = update_board_status(state2["board_status"], i, j, k, 0)
        
        v2, _ = max_value(state2, alpha, beta, n-1) if isBoxFormed else min_value(state2, alpha, beta, n-1)    

        if v2 > v:
            v, move = v2, action
            alpha = max(alpha, v)
        
        if v >= beta and not isBoxFormed:
            return v, move
    return v, move

# minimize state
def min_value(state, alpha, beta, n):
    if is_terminal(state["board_status"]) or n == 0:
        return utility(state["board_status"]), None
    
    v = 1000
    move = None
    for action in get_all_possible_move(state["line_status"]):
        i, j, k = action[0], action[1], action[2]
        state2 = deepcopy(state)
        state2["line_status"][i][j][k] = 1
        # update board_status
        isBoxFormed = update_board_status(state2["board_status"], i, j, k, 1)

        v2, _ = min_value(state2, alpha, beta, n-1) if isBoxFormed else max_value(state2, alpha, beta, n-1) 

        if v2 < v:
            v, move = v2, action
            beta = min(beta, v)
        if v <= alpha and not isBoxFormed:
            return v, move
    return v, move