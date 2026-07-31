---
components:
  - m3/autocomplete/autocomplete
  - m3/select/option
  - m3/text-field/outlined-text-field
---

# Autocomplete

```typescript
import '@vollowx/seele/m3/autocomplete/autocomplete.js';
import '@vollowx/seele/m3/select/option.js';
import '@vollowx/seele/m3/text-field/outlined-text-field.js';
```

<!-- @show -->

```html
<md-autocomplete id="autocomplete" mode="both" quick style="width: 300px">
  <md-outlined-text-field
    slot="input"
    label="Le Movies"
    placeholder="What d'you wanna watch?"
  ></md-outlined-text-field>
</md-autocomplete>
```

```typescript
movies.forEach(movie => {
  const option = document.createElement("md-option");
  option.textContent = movie;
  autocomplete.appendChild(option);
})
```

<!-- @uncomment
<script>
// From https://www.imdb.com/list/ls055592025/
const movies = [
  "The Godfather",
  "The Shawshank Redemption",
  "Schindler's List",
  "Raging Bull",
  "Casablanca",
  "Citizen Kane",
  "Gone with the Wind",
  "The Wizard of Oz",
  "One Flew Over the Cuckoo's Nest",
  "Lawrence of Arabia",
  "Vertigo",
  "Psycho",
  "The Godfather Part II",
  "On the Waterfront",
  "Sunset Boulevard",
  "Forrest Gump",
  "The Sound of Music",
  "12 Angry Men",
  "West Side Story",
  "Star Wars: Episode IV - A New Hope",
  "2001: A Space Odyssey",
  "E.T. the Extra-Terrestrial",
  "The Silence of the Lambs",
  "Chinatown",
  "The Bridge on the River Kwai",
  "Singin' in the Rain",
  "It's a Wonderful Life",
  "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
  "Some Like It Hot",
  "Ben-Hur",
  "Apocalypse Now",
  "Amadeus",
  "The Lord of the Rings: The Return of the King",
  "Gladiator",
  "Titanic",
  "From Here to Eternity",
  "Saving Private Ryan",
  "Unforgiven",
  "Raiders of the Lost Ark",
  "Rocky",
  "A Streetcar Named Desire",
  "The Philadelphia Story",
  "To Kill a Mockingbird",
  "An American in Paris",
  "The Best Years of Our Lives",
  "My Fair Lady",
  "A Clockwork Orange",
  "Doctor Zhivago",
  "The Searchers",
  "Jaws",
  "Patton",
  "Butch Cassidy and the Sundance Kid",
  "The Treasure of the Sierra Madre",
  "The Good, the Bad and the Ugly",
  "The Apartment",
  "Platoon",
  "High Noon",
  "Braveheart",
  "Dances with Wolves",
  "Jurassic Park",
  "The Exorcist",
  "The Pianist",
  "GoodFellas",
  "The Deer Hunter",
  "All Quiet on the Western Front",
  "Bonnie and Clyde",
  "The French Connection",
  "City Lights",
  "It Happened One Night",
  "A Place in the Sun",
  "Midnight Cowboy",
  "Mr. Smith Goes to Washington",
  "Rain Man",
  "Annie Hall",
  "Fargo",
  "Giant",
  "Shane",
  "The Grapes of Wrath",
  "The Green Mile",
  "Close Encounters of the Third Kind",
  "Nashville",
  "Network",
  "The Graduate",
  "American Graffiti",
  "Pulp Fiction",
  "Terms of Endearment",
  "Good Will Hunting",
  "The African Queen",
  "Stagecoach",
  "Mutiny on the Bounty",
  "The Great Dictator",
  "Double Indemnity",
  "The Maltese Falcon",
  "Wuthering Heights",
  "Taxi Driver",
  "Rear Window",
  "The Third Man",
  "Rebel Without a Cause",
  "North by Northwest",
  "Yankee Doodle Dandy",
];

movies.forEach(movie => {
  const option = document.createElement("md-option");
  option.textContent = movie;
  autocomplete.appendChild(option);
})
</script>
-->

## `M3Autocomplete`

- Inherits [`Autocomplete`](../04-Base/10-Autocomplete.md)
