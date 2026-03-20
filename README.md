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


## Project Structure


- **algorithms/**: Each algorithm has a dedicated folder with its simulation logic (e.g., `quickSort/simulate.js`).
- **components/**: Houses visualizers (`ArrayVisualizer`, `LinkedListVisualizer`, etc.) and layout elements (`Header`, `Sidebar`, `AlgorithmVisualizer`).
- **hooks/**: Contains reusable hooks like `useSimulation` for managing algorithm steps and autoplay.
- **pages/**: One file per algorithm route, each rendering the generic `AlgorithmVisualizer` with the corresponding algorithm object.
- **utils/**: Shared utilities (e.g., `linkedList.js` for node creation and cycle manipulation).


Deploy to Vercel / Netlify with build command `npm run build` and publish directory `dist`.

## License

MIT
This README is clean, covers essentials, and is easy to scan.
