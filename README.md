# sha-bot

## What it is?
A discord bot that'll help users play the game of wordle. I'm still working on error handling but so far it works pretty well if you give the right commands. 


## How it works?
There are 3 parts of the project-


### Word Folder
I downloaded a database of 10,000+ english words from [MIT edu](https://www.mit.edu/~ecprice/wordlist.10000) and split it into 5 JSON files, based on the number of letters in each word. The [split.py](https://github.com/tanishabelkar/sha-bot/blob/master/words/split.py) file takes care of this, incase you thought I did it by myself.


### Wordle Module
The wordle.js file has all the necessary functions for playing the game. There is a game object which has 3 properties- 
1. **Target** : the word that has to be guessed.
2. **Attempts** : the maximum attempts allowed to guess the target word.
3. **Map** : a Map object that maps every letter in the target word to its index.

The `createGame()` function initializes the game object by selecting a random word from the list of words and sets it as target.

The `checkEntry()` function returns a boolean value that determines whether the guessed word is valid or not.

The `move()` function compares the guessed word to the target word with the help of hash maps and returns an empty array if the words are the same, otherwise it returns an array representing the encoding of guessed word. It has 3 values-
1. **-1** : the letter is not present in the target word
2. **0** : the letter is present in the target word but the position differs.
3. **1** : the letter is present in the target word at the same position.

### bot.js
This file is where it all comes in action. On running this file, the bot goes online and on generation of a message event, it checks whether it was to initiate a game of wordle. If the words that follow are valid, it sends a message representing an encoding of the guessed word. 


I'm still learning intermediate JavaScript and trying to wrap my head around async and Promises, so the code might not be the most optimized one, but I am kinda happy to have made all of it by myself. Suggestions are definitely welcomed. :) 
