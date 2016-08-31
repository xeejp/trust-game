# Dictator Game for xeejp
React + Redux with Webpack

## Installation
```
$ cd <your xee root>/experiments
$ git clone git@github.com:xeejp/dictator-game.git
$ cd dictator-game/
$ npm install
$ webpack
```
and insert  this lines into \<your xee root\>/config/experiments.exs
```exs:experiments.exs
experiment "DictatorGame",
  file: "experiments/dictator-game/script.exs",
  host: "experiments/dictator-game/host.js",
  participant: "experiments/dictator-game/participant.js"
```
