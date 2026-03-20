# DSA Visualizer

Interactive step‑by‑step visualizations for data structures and algorithms.  
Built with React, Vite, and Tailwind CSS.

## Features

- Dynamic algorithm simulations with live code highlighting
- Resizable panels, dark/light theme, and responsive design
- Modular architecture – easy to add new algorithms

## Tech Stack

React, Vite, Tailwind CSS, React Router, react‑resizable‑panels, react‑zoom‑pan‑pinch


## Available Algorithms

| Category          | Algorithms                                   |
|-------------------|----------------------------------------------|
| Sorting           | Quick Sort, Merge Sort                       |
| Dynamic Prog.     | Perfect Squares, Longest Increasing Subsequence |
| Linked List       | Cycle Detection II, Palindrome Linked List    |
| Recursion         | Subsequences, Permutations, Subsets           |
| Other             | Dutch National Flag                           |

More algorithms are being added regularly.


##Project Structure

src/
├── algorithms/         # Algorithm simulation engines
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components for each algorithm
├── utils/              # Helper functions
├── App.jsx             # Main routing
├── main.jsx            # Entry point
└── index.css           # Global styles


Deploy to Vercel / Netlify with build command `npm run build` and publish directory `dist`.

## License

MIT
This README is clean, covers essentials, and is easy to scan.
