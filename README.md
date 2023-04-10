# The `score-board` library

## How to start

When in the directory with the source code install dependencies using `yarn` or `npm`.
```
yarn
```
or
```
npm install
```

## Testing

Run the tests:
```
yarn test
```

## Description

I took shortcuts here and there. 

For instance, file structure could be improved.
However, for such simple code I decided to put everything in one directory.
Same reason for keeping all the types in one file.

The logic for handling the game collection manipulation is based on immutability, yet it could be optimized.
Data structures are also stupid-simple. Frankly, I didn't give them much thought.
Having the logic covered with tests, all may be optimized and refactored.

Source code may contain some formatting issues, as I didn't use any `eslint` or `prettier`.

All the configs for TypeScript and Vitest are default.

I didn't provide any bundler, as in my opinion, in this case, it wasn't necessary.
