# rock-papper-scissors

The Odin Project asks me to revisit this example and add UI. OK, let's do it.

# Live Preview
https://vpchar.github.io/rock-papper-scissors/

I'll add, for more complexity, my own requirements.

# Goal

To create RSC game with:
* Responsive UI -- to practice html/css
* Audio FX (from the JavaScript30 example) -- to use something we learned in prev.step
* Settings -- to change the way it works & save state
* Tests -- old style console.log

More on the features, since I am acting like the "client" right now:
* UI
..* Responsive = looks well in different browsers/form factors
..* No images -- we'll use only CSS to do the UI
..* No backward compatibility -- not required to work on older or text browsers etc.

* Audio
..* Sounds on click/tap user choice
..* Different sound on win/lose

* Settings
..* Ability to change the button names (Rock,Paper...)
..* Reset to Defaults button

* Tests
..* Just do it as you do it usially ;-) We will practice TDD later

# To Do:
*(bug) Settings -> Save/Defaults should it clear the current board? Or not? Changing rules in between moves...
*(warning) Why it looks clumzy in Safari? 

