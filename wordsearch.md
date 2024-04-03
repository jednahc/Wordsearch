User story:

As a player,
I want to be able to play a word search game,
So that I can find hidden words within a grid of letters.

Acceptance Criteria:
I can see a grid of 
letters displayed on the screen.
There is a list of words displayed beside the grid, representing the words I need to find.
I can click and drag to select letters in the grid to form words.
When I successfully find a word, it is highlighted in the grid and removed from the list of words to find.
A timer is displayed to indicate how much time I have left to find all the words.
If I find all the words before the timer runs out, I receive a notification of my victory.
If the timer runs out before I find all the words, I receive a notification that the game is over.
I can restart the game to play again

Letter grid:
Display a grid of letters where the player can search for words.
Each letter cell should be clickable or selectable.

Words to be found:
Show a list or area of words to be found
Highlight found words in the grid to provide visual feedback to the player.
Strike out found words in the list

Score:
Keep track of the player's score based on the number of words found.
Display the score to the player, either in real-time or at the end of the game.

Timer:
Include a timer to limit the duration of the game.
Display the remaining time to the player.

Reset button:
Provide a button to reset the game if the player wants to start over.
Reset the letter grid, found words list, and score.

Difficulty levels:
Offer different difficulty levels (easy, medium, hard) with varying grid sizes and word lengths.
Adjust the number of words and their positions based on the selected difficulty level.

Game over screen/message:
Show a game over screen when the game ends (either due to time running out or the player finding all words).
Display the final score, words found, and an option to play again.


MVC:
When the player interacts with the UI, such as clicking on a letter in the grid, the Controller receives the input and updates the Model accordingly.
The Model processes the input, checks for valid word selections, and updates the game state.
Once the Model is updated, the Controller instructs the View to render the updated game state on the screen, ensuring that the player sees the latest word grid, found words, and game progress.


