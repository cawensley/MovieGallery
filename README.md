 ## How to run the project locally:

1. Download the files to your hard-drive.
2. Install Node.js as the runtime engine (https://nodejs.org/en/).
3. In the console, navigate to the downloaded directory, then run  `npm install' to install the dependent Node modules.
4. Run 'npm update' to update any modules that need it.
5. Run 'npm start' to initialize the website.

## How to view the webpage online:
https://cawensley.github.io/moviegallery/

## Thought process when creating the website

I wanted a colorful background and movie cards that were clickable for more information. Added one button which adds/removes movies from the favorites page, which prevents a movie from being added multiple times, and also indirectly lets the user know in the search page which movies are already in their favorites.  Also added effects when you hover over the cards or navigation menu, to show 'responsiveness'.

## Any trade offs you made?

Used Redux to store user variables instead of useContext/useReducer hooks.

## Anything you might implement with more time (features, fixes, technical debt corrections etc).

Could add a "watchlist" page for movies that you haven't seen yet.  But adding a second button to each movie card might make them feel crowded.
