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
    missCount: 10,
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

    resetStats: function ()
    {   // This method is called to reset the game statistics

        this.letterList = "";
        document.getElementById ("your-guesses").innerHTML = this.letterList;
        this.gameCount = 0;
        document.getElementById ("game-count").innerHTML = this.gameCount;
        this.lostCount = 0;
        document.getElementById ("lost-count").innerHTML = this.lostCount;
        this.missCount = 10;
        document.getElementById ("miss-count").innerHTML = this.missCount;
        this.winCount = 0;
        document.getElementById ("win-count").innerHTML = this.winCount;
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
            buttonID.innerHTML = "HIDE INSTRUCTIONS";
        }
        else
        {   instrID.style.display = "none";
            buttonID.innerHTML = "SHOW INSTRUCTIONS";
        }
    },

    // end button methods

    // begin game play methods
    //
    // The following methods implement the game play

    initializeTheGame: function ()
    {   // resets all of the game pieces and temporary variables used to track the players
        // guesses

        this.theGuess = "";
        this.letterList = "";
        document.getElementById ("your-guesses").innerHTML = "";
        this.missCount = 10;

        // Hide the entire game board and clear any text displayed in each game space

        for (var i = 0; i < this.maxLength; i++)
        {   idName = "L" + i;
    
            var thisLetter = document.getElementById(idName);
            thisLetter.innerHTML = "";
            thisLetter.style.color = "black";
            thisLetter.style.display = "none";
            thisLetter.style.visibility = "visible";
        }

        var missCount = document.getElementById("miss-count");
        var missP = document.getElementById("miss-p");

        missCount.innerHTML = this.missCount;
        missCount.style.color = "black";
        missP.style.color = "black";
        missCount.style.fontWeight = "normal";
        missP.style.fontWeight = "normal";

        // The play button should only be visible if the player
        // missed the last word

        document.getElementById ("play-button").style.display = "none";

//         // lower audio volume for sound effects
// 
//         bloop.volume = 0.75;
//         loser.volume = 0.5;
//         tada.volume = 0.5;
    },

    playGame: function ()
    {   // select a new word display a blank game board

        this.initializeTheGame ();

        // pick a word
        var num = Math.floor(Math.random() * this.wordList.length);
        this.theWord = this.wordList[num];

        document.getElementById("the-word").style.width = ((this.theWord.length * 45) + 17) + "px";

        // Now that all games spaces are re-initialed build the game board for the new
        // word

        for (var i = 0; i < this.theWord.length; i++)
        {   
            // initialize theGuess to all '*'
            if (this.theWord.charAt (i) === "'")
                this.theGuess = this.theGuess + "'";
            else if (this.theWord.charAt (i) === " ")
                this.theGuess = this.theGuess + " ";
            else
                this.theGuess = this.theGuess + "*";

            idName = "L" + i;
    
            var thisLetter = document.getElementById(idName);
            thisLetter.style.display = "flex";

            if (this.theWord.charAt(i) === " ")
                thisLetter.style.visibility = "hidden";

            if (this.theWord.charAt(i) === "'")
                thisLetter.innerHTML = "'";
        }
    },

    youLose: function ()
    {   // If the player didn't guess the word in the allowed number of tries

        ++this.gameCount;
        document.getElementById ("game-count").innerHTML = this.gameCount;

        ++this.lostCount;
        document.getElementById ("lost-count").innerHTML = this.lostCount;

        for (var i = 0; i < this.theGuess.length; i++)
        {   // Show the letters the player missed in red...

            if (this.theGuess.charAt (i) === "*")
            {   var theLetter = document.getElementById ("L" + i);

                theLetter.style.color = "red";
                theLetter.innerHTML = this.theWord.charAt (i);
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

        // The game actually doesn't end when missCount = 0.  There's nothing here that
        // does that.  I could add and remove action listeners depending on whether I
        // want game play to continue, or I could just...

        if (this.missCount == 0) return;

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

            // Add the letter to thelist of letters selected so far

            if (this.letterList.length == 0)
                this.letterList = event.key.toUpperCase ();
            else
                this.letterList = this.letterList + ", " + event.key.toUpperCase ();
            
            document.getElementById ("your-guesses").innerHTML = this.letterList;

            var matchFound = false;

            for (i = 0; i < this.theWord.length; i++)
            {   // Is the letter in the puzzle word?

                if (this.theWord.charAt (i) === event.key.toUpperCase ())
                {   // We have a match.  Display the letter on the puzzle board

                    matchFound = true;

                    var thisLetter = document.getElementById("L" + i);
                    thisLetter.innerHTML = this.theWord.charAt(i);

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

            // and finally

            if (matchFound)
            {   // The player selected a letter in the word.
                //
                // We have a winner if this.theWord === this.theGuess.  Display an alert to tell
                // the user they have won, increment gameCount and winCount and set up the page
                // for another game

                this.ting.play();

                if (this.theWord == this.theGuess)
                {   ++this.gameCount;
                    document.getElementById ("game-count").innerHTML = this.gameCount;

                    ++this.winCount;
                    document.getElementById ("win-count").innerHTML = this.winCount;

                    this.playGame ();

                    this.tada.play();
}
            }
            else
            {   // but if the letter is not in the word, increment missCount.  If missCount is 10,
                // the player lost this round

                this.blop.play();
                --this.missCount;

                var missCount = document.getElementById ("miss-count");
                var missP = document.getElementById ("miss-p");

                document.getElementById("miss-count").innerHTML = this.missCount;

                if (this.missCount < 5)
                {   missCount.style.color = "brown";
                    missP.style.color = "brown";
                }

                if (this.missCount < 3)
                {   missCount.style.color = "red";
                    missP.style.color = "red";
                }

                if (this.missCount == 1)
                {   missCount.style.fontWeight = "bold";
                    missP.style.fontWeight = "bold";
                }

                if (this.missCount == 0)
                    this.youLose();
            }
        }
    }
};

theGame.playGame ();

document.onkeypress = function ()
{  theGame.keyPress(event);
}
