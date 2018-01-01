# account-browser

- Developed on Node v9.3.0 but should work on any recent version of Node
- To run - `npm install && npm start` or use `yarn` if preferred
- try `0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae` as a starting address

I focused on wiring up nagivation for addresses and blocks, using Redux to 
store application state. `/src/app/index.js` is a good starting spot for 
reading code.

Known issues - Network errors can lead to the display of stale data.

Potential improvements:
- Tests
- Typechecking via Flow or similar
- Central etherscan api interface
- Better smart container / simple component division
- Responsive layout
- User error messaging

