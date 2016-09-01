# Trust Game for xeejp
React + Redux with Webpack

## Installation
```
$ cd <your xee root>/experiments
$ git clone git@github.com:xeejp/trust-game.git
$ cd trust-game/
$ npm install
$ webpack
```
and insert  this lines into \<your xee root\>/config/experiments.exs
```exs:experiments.exs
experiment "TrustGame",
  file: "experiments/trust-game/script.exs",
  host: "experiments/trust-game/host.js",
  participant: "experiments/trust-game/participant.js"
```
