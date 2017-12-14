/* 
    The quotes... 
*/
quotes = [
    // http://www.theonering.net/torwp/2012/05/08/55715-top-20-quotes-from-the-lord-of-the-rings/
    
    { quote : "There is only one Lord of the Ring, only one who can bend it to his will. And he does not share power.", 
      source: "Gandalf", citation : "Lord of the rings - Fellowship of the ring", year: 2001,
      hasBeenShownYet : false, 
      image: "http://www-images.theonering.org/torwp/wp-content/uploads/2012/05/ttt0342.jpg",
      getMoreQuotesFrom: "http://www.theonering.net/torwp/2012/05/08/55715-top-20-quotes-from-the-lord-of-the-rings/" },

    { quote : "Even the smallest person can change the course of the future.", 
      source: "Galadriel", citation : "Lord of the rings - Fellowship of the ring", year: 2001,
      hasBeenShownYet : false, 
      image: "http://www-images.theonering.org/torwp/wp-content/uploads/2012/05/fotr1360.jpg",
      getMoreQuotesFrom: "http://www.theonering.net/torwp/2012/05/08/55715-top-20-quotes-from-the-lord-of-the-rings/" },
      
    { quote : "We swears, to serve the master of the Precious. We will swear on… on the Precious!", 
      source: "Gollum", citation : "Lord of the rings - Fellowship of the ring", year: 2001,
      hasBeenShownYet : false, 
      image: "http://www-images.theonering.org/torwp/wp-content/uploads/2012/05/rotk0213.jpg",
      getMoreQuotesFrom: "http://www.theonering.net/torwp/2012/05/08/55715-top-20-quotes-from-the-lord-of-the-rings/" },
      
    { quote : "Your time will come. You will face the same Evil, and you will defeat it.", 
      source: "Arwen", citation : "Lord of the rings - Fellowship of the ring", year: 2001,
      hasBeenShownYet : false, 
      image: "http://www-images.theonering.org/torwp/wp-content/uploads/2012/05/fotr0724.jpg",
      getMoreQuotesFrom: "http://www.theonering.net/torwp/2012/05/08/55715-top-20-quotes-from-the-lord-of-the-rings/" },
      
      { quote : "[referring to Captain America's shield] That thing doesn't obey the laws of physics at all!", 
      source: "Spider-Man", citation : "The First Avenger: Civil War", year: 2016,
      hasBeenShownYet : false, 
      getMoreQuotesFrom: "http://www.imdb.com/title/tt3498820/quotes" },      
]

/* colors for random background change */
colors = ["red", "green", "blue", "orange"];


function changeBackgroundColor() 
{
    var activeColor = document.body.style.background;
    var randomColor = colors[Math.floor((Math.random() * colors.length))];
    // we really really want a new color every time
    while (activeColor === randomColor) {
        randomColor = colors[Math.floor((Math.random() * colors.length))];
    }

    document.body.style.background = randomColor;    
}

function resetHasBeenShownYetOnQuotes()
{
    console.log("-------");
    console.log("All quotes have been shown. Resetting.");
    console.log("-------");

    for (var i = 0; i < quotes.length; i++ ) {
        quotes[i].hasBeenShownYet = false;
    }
}

function getIndexesOfQuotesThatHaveNotBeenShownYet() {
    var result = new Array();
    for (var i = 0; i < quotes.length; i++ )
    {
        if ( !quotes[i].hasBeenShownYet ) {
            result.push(i);
        }
    }

    if (result.length == 0) {
        resetHasBeenShownYetOnQuotes();
        return getIndexesOfQuotesThatHaveNotBeenShownYet();
    }

    return result;
}

/*
    getRandomQuote selects a random quote from the quotes array. 
*/
function getRandomQuote() {
    var possibleIndexes = getIndexesOfQuotesThatHaveNotBeenShownYet();

    /* print a status message for debugging */
    //console.log("\"remaining\" random quotes: " + possibleIndexes.length.toString());
    //console.log(possibleIndexes);

    return quotes[
        possibleIndexes[Math.floor((Math.random() * possibleIndexes.length))]
    ];
}

/*
    escapeHtml will replace < and > in the text with &lt; and &gt; so 
    I do not have to worry about them messing up the html.
*/
function escapeHtml(text) {
    return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

/*
    printQuote gets the quote onto the screen
*/
function printQuote() {
    // reset timer
    window.automaticQuoteChange.resetTimer();

    // In case you do not want the random color changes of the background
    // comment the following line out.
    changeBackgroundColor();

    var quote = getRandomQuote();
    // remember.. this quote has been shown!
    quote.hasBeenShownYet = true;
    console.log(quote.quote);

    /*
        The template just contains some place-holders.
        I like it clean and easy to read. "Variables" are marked
        with $...$.

       I'm not exactly sure what 
       "printQuote doesn't add a for a missing citation or a if the year property is missing"
       does mean, but I guess someone wanted to say, that it does not add a span if the 
       property is missing. 
       Well, I can do that... 
    */

    var template = 
        '<p class="quote"> $quote$ </p>' + 
        '<p class="source"> $source$';

    if ( quote.citation !== undefined ) {
        template += 
        '   <span class="citation"> $citation$ </span>';
    }

    if ( quote.year !== undefined ) {
        template += 
        '   <span class="year"> $year$ </span>';
    }

    template +=
        '</p>';

    if ( quote.getMoreQuotesFrom !== undefined ) {
        template += "<a target=\"_blank\" href=\"$getMoreQuotesFrom$\">Get More Quotes here...</a>";
    }

    if ( quote.image !== undefined ) {
        template = 
        '   <img src="$image$" />' + template;
    }


    /* Put the quote contents into the file. 
       Although I am quite sure not to put evil quotes into the file that 
       will destroy the html consistency I better escape < and > so 
       that I can feel safe.
    */
    template = template.replace("$quote$", escapeHtml(quote.quote));
    template = template.replace("$source$", escapeHtml(quote.source));
    template = template.replace("$citation$", escapeHtml(quote.citation || ""));
    template = template.replace("$year$", escapeHtml(quote.year.toString() || ""));
    template = template.replace("$image$", quote.image || "");
    template = template.replace("$getMoreQuotesFrom$", quote.getMoreQuotesFrom || "");

    document.getElementById('quote-box').innerHTML = template;
}

// Everything needed to change the quotes automatically
function AutomaticQuoteChange() {
    var changeQuoteEveryInSeconds = 30;
    var counterState = changeQuoteEveryInSeconds;

    function updateStateDisplay() {
        // Update the display of the remaining seconds
        document.getElementById('next-quote-coming-up-in').innerHTML = 
        "The next quote is coming up in " + counterState.toString() + " seconds...";
    }

    function countdownAndChangeQuote() {
        counterState -= 1;
        
        if (counterState <= 0) {
            counterState = changeQuoteEveryInSeconds;
            printQuote();
        }

        // Update the display of the remaining seconds
        updateStateDisplay();
    }

    setInterval(countdownAndChangeQuote, 1000); 

    return {
        resetTimer : function() {
            counterState = changeQuoteEveryInSeconds;
            updateStateDisplay();
        }
    }
}


window.onload = function() {
    window.automaticQuoteChange = AutomaticQuoteChange(); // 'refresh the quote after 30 seconds'
    window.automaticQuoteChange.resetTimer();
    // I'd like to see my first quote as soon as the page is opened up.
    printQuote();
    // event listener to respond to "Show another quote" button clicks
    // when user clicks anywhere on the button, the "printQuote" function is called
    document.getElementById('loadQuote').addEventListener("click", printQuote, false);
}

