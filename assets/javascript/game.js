var theGame =
{   wordList:  ["ARYA",
                "BRAAZOS",
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
                "HOUSE LANISTER",
                "HOUSE MARTELL",
                "HOUSE MORMONT",
                "HOUSE STARK",
                "IRON ISLANDS",
                "JON SNOW",
                "KHAL DROGO",
                "KHALEESI",
                "KING'S LANDING",
                "KNIGHT'S WATCH",
                "LADY",
                "LITTLEFINGER",
                "LORD",
                "SAM TULLY",
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
    missCount: 0,
    winCount: 0,
    maxLength: 16,  // The longest string in wordList is 16 characters long

    resetStats: function ()
    {   // This method is called to reset the game statistics

        this.theWord = "*";
        this.theGuess = "*";
        this.letterList = "*";
        this.gameCount = 0;
        this.missCount = 0;
        this.winCount = 0;
    },

    toggleInstructionsVisibility: function ()
    {   // This method will alter the 'display' property of the game instructions to either
        // hide or show them, depending on the current value of the display property.  It also
        // toggles the text of the button between "HIDE INSTRUCTIONS" and "SHOW INSTRUCTIONS"
        // to the appropriate text for new value of display.
            
        var instrID = document.getElementById("instructions");
        var buttonID = document.getElementById("button");
            
        if (instrID.style.display == "none")
        {   // The instructions are hidden.
            // *    change the display property to make the instructions visible
            // *    change the button text to "HIDE INSTRUCTIONS"

            instrID.style.display = "flex";
            buttonID.innerHTML = "HIDE INSTRUCTIONS";
        }
        else
        {   instrID.style.display = "none";
            buttonID.innerHTML = "SHOW INSTRUCTIONS";
        }
    },

    initializeTheGame: function ()
    {   // resets all of the game pieces and temporary variables used to track the players
        // guesses

        this.theGuess = "";
        this.letterList = "";
        document.getElementById ("your-guesses").innerHTML = "";
        this.missCount = 0;

        // Hide the entire game board and clear any text displayed in each game space

        for (var i = 0; i < this.maxLength; i++)
        {   idName = "L" + i;
    
            var thisLetter = document.getElementById(idName);
            thisLetter.innerHTML = "";
            thisLetter.style.display = "none";
            thisLetter.style.visibility = "visible";
        }
    },

    selectWord: function ()
    {   // select a new word display a blank game board

        this.initializeTheGame ();

        // pick a word
        var num = Math.floor(Math.random() * this.wordList.length);
        this.theWord = this.wordList[num];

        document.getElementById("the-word").style.width = (this.theWord.length * 45 +7) + "px";

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

    keyPress: function (event)
    {   // What happens when a key is pressed?
    
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
                            
                        console.log ("newGuess: " + newGuess);
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

                if (this.theWord == this.theGuess)
                {   ++this.gameCount;
                    document.getElementById ("game-count").innerHTML = this.gameCount;

                    ++this.winCount;
                    document.getElementById ("win-count").innerHTML = this.winCount;

                    this.selectWord ();

                    alert ("Hooray!  You got that one.");
                }
            }
            else
            {   // but if the letter is not in the word, increment missCount.  If missCount is 10,
                // the player lost this round

                ++this.missCount;

                if (this.missCount == 10)
                {   ++this.gameCount;
                    document.getElementById ("game-count").innerHTML = this.gameCount;

                    ++this.lostCount;
                    document.getElementById ("lost-count").innerHTML = this.lostCount;

                    this.selectWord ();

                    alert ("Oh no!  Better luck with this one.");
                }
            }
        }
    }
};

theGame.selectWord ();

document.onkeypress = function ()
{  theGame.keyPress(event);
}
