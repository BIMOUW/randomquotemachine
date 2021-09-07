import React, { useState, useEffect } from "react";
import "./App.scss";
import COLORS_ARRAY from "./colorsArray";

let quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quotesArray, setQuotesArray] = useState(null);
  const [quote, SetQuote] = useState("Press Generate Random Quote");
  const [author, setAuthor] = useState("Made by BIMOUW");
  const [accentColor, setAccentColor] = useState("#282c34");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parseJSON = await response.json();
    setQuotesArray(parseJSON.quotes);
    console.log(`parseJSON`, parseJSON);
  };

  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, [quoteDBUrl]);

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setAccentColor(COLORS_ARRAY[randomInteger]);
    SetQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: accentColor, color: accentColor }}
      >
        <div id="quote-box">
          <p id="text"> "{quote}" </p>
          <p id="author"> -{author} </p>
          <button
            id="new-quote"
            onClick={() => getRandomQuote()}
            style={{ backgroundColor: accentColor }}
          >
            Generate Random Quote
          </button>
          <a
            id="tweet-quote"
            href={encodeURI(
              `https://twitter.com/intent/tweet?text=${quote} - ${author}`
            )}
            style={{ backgroundColor: accentColor }}
          >
            tweet quote
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
