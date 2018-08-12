var wordList = ["ARYA", "BRAAZOS", "CATELYN", "CERSEI", "DAENERYS", "DIREWOLF", "DORN", "DOTHRAKI", "DRAGONS", "EDDARD", "GIANTS", "GREYJOY", "IRON ISLANDS", "JORAH", "KHAL DROGO", "KHALEESI", "KING'S LANDING", "KNIGHT'S WATCH", "LADY", "LANISTER", "LITTLEFINGER", "LORD", "MARTELL", "MORMONT", "RIVERLANDS", "STARK", "TARGARYEN", "THE HOUND", "THE MOUNTAIN", "THE NORTH", "THE WALL", "TULLY", "TYRION", "TYWIN", "UNSULLIED", "WESTEROS", "WHITE WALKER", "WINTER IS COMING", "WINTERFELL"];
var num = Math.floor(Math.random() * wordList.length);
document.write ("There are " + wordList.length + " words in the game.  " + wordList[num] + " is number " + num + " and it has " + wordList[num].length + " characters<br>");

document.getElementById("the-word").style.width = (wordList[num].length * 45 +5) + "px";
for (var i = 0; i < wordList[num].length; i++)
{   idName = "L" + i;
    
    var thisLetter = document.getElementById(idName);
    thisLetter.innerHTML = wordList[num].charAt(i);
    thisLetter.style.display = "flex";
    if (wordList[num].charAt(i) === " ")
        thisLetter.style.visibility = "hidden";
    
}
