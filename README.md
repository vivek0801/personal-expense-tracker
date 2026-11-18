# Personal Expense Tracker (React)

## Run
1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite (usually http://localhost:5173).

## Features
Add and delete income/expense transactions, category and type filters, automatic totals, responsive UI, and browser persistence with Local Storage.

## Interview flow
User fills the form -> React controlled inputs update `form` state -> submit handler validates input -> transaction is added to `transactions` state -> React re-renders -> `useEffect` saves the updated array to Local Storage. `useMemo` calculates totals from the transaction array.

## Important limitation
This is a frontend-only demo. Data is stored in the current browser, not in a shared server/database. Clearing browser storage removes it.
