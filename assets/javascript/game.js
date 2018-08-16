var theGame =
{   wordList:  ["ARYA",
                "BRAAVOS",
                "CATELYN",
                "CERSEI",
                "DAENERYS",
                "DIREWOLF",
                "DORN",
                "DOTHRAKI",
                "DRAGONS",
                "DRAGON GLASS",
                "EDDARD STARK",
                "GIANTS",
                "HODOR",
                "HOUSE LANNISTER",
                "HOUSE MARTELL",
                "HOUSE MORMONT",
                "HOUSE STARK",
                "HOUSE TYRELL",
                "IRON ISLANDS",
                "JON SNOW",
                "KHAL DROGO",
                "KHALEESI",
                "KING'S LANDING",
                "KNIGHT'S WATCH",
                "LADY",
                "LITTLEFINGER",
                "LORD",
                "SAMWELL TARLEY",
                "SANSA",
                "SIR JORAH",
                "TARGARYEN",
                "THE HOUND",
                "THE MOUNTAIN",
                "THE NORTH",
                "THE RIVERLANDS",
                "THE WALL",
                "THEON GREYJOY",
                "TYRION",
                "TYWIN",
                "UNSULLIED",
                "WESTEROS",
                "WHITE WALKER",
                "WILDFIRE",
                "WILDLING",
                "WINTER IS COMING",
                "WINTERFELL"],
    theWord: "*",
    theGuess: "*",
    letterList: "",
    gameCount: 0,
    lostCount: 0,
    guessRemain: 10,
    winCount: 0,
    maxLength: 16,  // The longest string in wordList is 16 characters long

    // audio

    blop: new Audio("assets/blop.mp3"),     // audio for an incorrect letter guess
    loser: new Audio("assets/loser.mp3"),   // audio for loser
    tada: new Audio("assets/ta-da.mp3"),    // audio for winner
    ting: new Audio("assets/ting.mp3"),     // audio for a correct letter guess
    
    // begin button methods
    //
    // The methods implement the buttons

    displayGuesses (letter)
    {   // update the list of letters the player has guessed

        if (this.letterList.length == 0)
            this.letterList = letter;
        else
            this.letterList = this.letterList + ", " + letter;
            
        document.getElementById ("your-guesses").textContent =
            "You have selected: " + this.letterList;
    },

    displayGuessRemain (num)
    {   // update the number of guesses the player has remaining

        var missP = document.getElementById ("guess-remain");
        missP.textContent =
            "You have " + num + " guesses remaining";

        missP.style.color = "black";
        missP.style.fontWeight = "normal";

        if (this.guessRemain < 5)
            missP.style.color = "brown";

        if (this.guessRemain < 3)
            missP.style.color = "red";

        if (this.guessRemain == 1)
            missP.style.fontWeight = "bold";
    },

    displayGameCount (num)
    {   // update the number of games the player has played

        document.getElementById ("game-count").textContent =
            "You have played " + num + " games";
    },

    displayWinCount (num)
    {   // update the number of times the player has wone
        document.getElementById ("win-count").textContent =
            "You have solved " + num + " words";
    },

    displayLoseCount (num)
    {   // update the number of guesses the player has remaining

        document.getElementById ("lost-count").textContent =
            "You have lost " + num + " times";
    },

    resetStats: function ()
    {   // This method is called to reset the game statistics

        this.letterList = "";
        this.displayGuesses (this.letterList);

        this.gameCount = 0;
        this.displayGameCount (this.gameCount);

        this.lostCount = 0;
        this.displayLoseCount (this.lostCount);

        this.guessRemain = 10;
        this.displayGuessRemain (this.guessRemain);

        this.winCount = 0;
        this.displayWinCount (this.winCount);
    },

    getHint: function ()
    {   // This method is called to reset the game statistics

        var x = Math.floor (Math.random () * this.theWord.length);
        alert ("Try:\n\n " + this.theWord.charAt (x).toUpperCase());
    },

    hideInstructions: function ()
    {   // This method will alter the 'display' property of the game instructions to either
        // hide or show them, depending on the current value of the display property.  It also
        // toggles the text of the button between "HIDE INSTRUCTIONS" and "SHOW INSTRUCTIONS"
        // to the appropriate text for new value of display.

        var instrID = document.getElementById("instructions");
        var buttonID = document.getElementById("hide-button");
            
        if (instrID.style.display == "none")
        {   // The instructions are hidden.
            // *    change the display property to make the instructions visible
            // *    change the button text to "HIDE INSTRUCTIONS"

            instrID.style.display = "block";
            buttonID.textContent = "HIDE INSTRUCTIONS";
        }
        else
        {   instrID.style.display = "none";
            buttonID.textContent = "SHOW INSTRUCTIONS";
        }
    },

    // end button methods

    // begin game play methods
    //
    // The following methods implement the game play

    playGame: function ()
    {   // select a new word display a blank game board

        // lower audio volume for sound effects

        this.blop.volume = 0.25;
        this.loser.volume = 0.25;
        this.tada.volume = 0.25;

        // hide the play button until its needed

        document.getElementById ("play-button").style.display = "none";

        // Clear the list of guessed letters and reset the remaining tries
        this.letterList = "";
        this.displayGuesses(this.letterList);
        this.guessRemain = 10;
        this.displayGuessRemain(this.guessRemain);

        // clear the entire game board...hide all the letter boxes and
        // clear thier content

        for (var i = 0; i < this.maxLength; i++)
        {   thisLetter = document.getElementById ("L" + i);

            thisLetter.textContent = "";
            thisLetter.style.color = "black";
            thisLetter.style.display = "none";
            thisLetter.style.visibility = "visible";
        }

        // pick a word
        var num = Math.floor(Math.random() * this.wordList.length);
        this.theWord = this.wordList[num];

        // Now that all games spaces are re-initialed build the game board for the new
        // word

        this.theGuess = "";

        for (var i = 0; i < this.theWord.length; i++)
        {   
            // initialize theGuess to all '*'

            if (this.theWord.charAt (i) === "'")
                this.theGuess = this.theGuess + "'";
            else if (this.theWord.charAt (i) === " ")
                this.theGuess = this.theGuess + " ";
            else
                this.theGuess = this.theGuess + "*";

            // and display the letter boxes that coorespond to letters in the selected word

            idName = "L" + i;
    
            var thisLetter = document.getElementById(idName);
            thisLetter.style.display = "inline";
            thisLetter.textContent = "";
            thisLetter.style.color = "black";
            thisLetter.style.visibility = "visible";

            if (this.theWord.charAt(i) === " ")
                thisLetter.style.visibility = "hidden";

            if (this.theWord.charAt(i) === "'")
                thisLetter.textContent = "'";
        }
    },

    youLose: function ()
    {   // If the player didn't guess the word in the allowed number of tries

        ++this.gameCount;
        this.displayGameCount (this.gameCount);

        ++this.lostCount;
        this.displayLoseCount (this.lostCount);

        for (var i = 0; i < this.theGuess.length; i++)
        {   // Show the letters the player missed in red...

            if (this.theGuess.charAt (i) === "*")
            {   var theLetter = document.getElementById ("L" + i);

                theLetter.style.color = "red";
                theLetter.textContent = this.theWord.charAt (i);
            }
        }

        // To display the letters the player didn't guess, the game has to
        // pause here (I can't automatically call startGame() to start the
        // next round).  So I need a way for the player to start the next
        // round.  The play button should only be visible when the player 
        // didn't guess the word.

        document.getElementById ("play-button").style.display = "inline";

        this.loser.play();
    },

    keyPress: function (event)
    {   // What happens when a key is pressed?

        // The game actually doesn't end when guessRemain = 0.  There's nothing here that
        // does that.  I could add and remove action listeners depending on whether I
        // want game play to continue, or I could just...

        if (this.guessRemain == 0) return;

        // So the game isn't over...

        var validKeys = "abcdefghijklmnopqrstuvwxyz";
        var keyFound = false;

        for (i = 0; i < validKeys.length; i++)
        {   if (validKeys.charAt (i) === event.key.toLowerCase ())
                keyFound = true;
        }

        if (!keyFound)  
        {   alert ("Select any letter...");

        }
        else
        {   // The key pressed is a letter, so...

            this.displayGuesses (event.key.toUpperCase());

            // and check if the letter selected is in the word

            var matchFound = false;

            for (i = 0; i < this.theWord.length; i++)
            {   // Is the letter in the puzzle word?

                if (this.theWord.charAt (i) === event.key.toUpperCase ())
                {   // We have a match.  Display the letter on the puzzle board

                    matchFound = true;

                    var thisLetter = document.getElementById("L" + i);
                    thisLetter.textContent = this.theWord.charAt(i);

                    var newGuess = "";

                    for (j = 0; j < this.theWord.length; j++)
                    {   if (j == i)
                            newGuess = newGuess + this.theWord.charAt (j);
                        else
                            newGuess = newGuess + this.theGuess.charAt (j);
                    }

                    this.theGuess = newGuess;
                }
            }

            // and finally...

            if (matchFound)
            {   // event.key matches a letter in the word.  Test if there are any
                // unguessed letters in the word (this.theWord === this.theGuess).
                //
                // If we have a winner, updtae the stats and start another round
                // for another game

                if (this.theWord == this.theGuess)
                {   ++this.gameCount;
                    this.displayGameCount (this.gameCount);

                    ++this.winCount;
                    this.displayWinCount (this.winCount);

                    this.playGame ();

                    this.tada.play();
                }
                else
                    this.ting.play();
            }
            else
            {   // but if the letter is not in the word, dencrement guessRemain.  If guessRemain is 10,
                // the player lost this round

                --this.guessRemain;

                if (this.guessRemain == 0)
                    this.youLose();
                else
                {    this.blop.play();

                    this.displayGuessRemain (this.guessRemain);
                }
            }
        }
    }
};

theGame.playGame ();

document.onkeypress = function ()
{  theGame.keyPress(event);
}
