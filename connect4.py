class Connect4:
    def __init__(self):
        self.ROWS = 6
        self.COLS = 7
        self.board = [[' ' for _ in range(self.COLS)] for _ in range(self.ROWS)]
        self.current_player = '🔴'
        self.winner = None

    def print_board(self):
        # Print column numbers
        print('\n' + ' '.join([f' {i+1} ' for i in range(self.COLS)]))
        print('─' * (self.COLS * 3 + 1))
        
        # Print board content
        for row in self.board:
            print('│' + '│'.join([f' {cell} ' for cell in row]) + '│')
            print('─' * (self.COLS * 3 + 1))

    def is_valid_move(self, col):
        return 0 <= col < self.COLS and self.board[0][col] == ' '

    def drop_piece(self, col):
        if not self.is_valid_move(col):
            return False
            
        # Find the lowest empty row
        for row in range(self.ROWS-1, -1, -1):
            if self.board[row][col] == ' ':
                self.board[row][col] = self.current_player
                return True
        return False

    def check_winner(self, row, col):
        directions = [
            [(0, 1)],  # Horizontal
            [(1, 0)],  # Vertical
            [(1, 1)],  # Diagonal ↘
            [(1, -1)]  # Diagonal ↙
        ]
        
        piece = self.board[row][col]
        
        for dir in directions:
            count = 1
            dx, dy = dir[0]
            
            # Check in both directions
            for factor in [1, -1]:
                new_row = row + dx * factor
                new_col = col + dy * factor
                
                while (0 <= new_row < self.ROWS and 
                       0 <= new_col < self.COLS and 
                       self.board[new_row][new_col] == piece):
                    count += 1
                    new_row += dx * factor
                    new_col += dy * factor
                    
            if count >= 4:
                return True
        return False

    def play(self):
        print("\nConnect 4 Game!")
        print("Players: 🔴 and 🔵")
        
        while not self.winner:
            self.print_board()
            print(f"\nPlayer {self.current_player}'s turn")
            
            try:
                col = int(input("Enter column number (1-7): ")) - 1
                
                if self.drop_piece(col):
                    # Check for winner
                    for row in range(self.ROWS):
                        if self.board[row][col] != ' ':
                            if self.check_winner(row, col):
                                self.winner = self.current_player
                                break
                    
                    # Switch players
                    self.current_player = '🔵' if self.current_player == '🔴' else '🔴'
                else:
                    print("\nInvalid move! Try again.")
            
            except ValueError:
                print("\nPlease enter a valid number between 1 and 7.")
            
            # Check for draw
            if all(self.board[0][col] != ' ' for col in range(self.COLS)) and not self.winner:
                self.print_board()
                print("\nGame Over! It's a draw!")
                return
        
        # Game won
        self.print_board()
        print(f"\nGame Over! Player {self.winner} wins! 🎉")


if __name__ == "__main__":
    game = Connect4()
    game.play()