# What Are You Doing With Your Life?

Inspired by [Kurzgesagt](https://www.youtube.com/c/inanutshell)'s video ["What Are You Doing With Your Life?"](https://www.youtube.com/watch?v=JXeJANDKwDc), this little app tells you, how many days, weeks and years you _statistically_ have left to live on this planet.

By telling the app how many days per year you see the other persons, it can also tell you, how many days you _statistically_ have left with them.

## Data Source

The app uses life expectancy data provided by [Our World in Data](https://ourworldindata.org/life-expectancy) from 2019.

Keep this in mind if you're looking at this app in the far future.

## About the Code

This is my first visualisation project and my first project using TypeScript in Vue.js.

This code isn't perfect. Especially how the life calendar is rendered is pretty terrible and doesn't perform well on low-spec machines.

If you have any insights on how to render thousands of little bullets in a more performant way, please let me know!

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
