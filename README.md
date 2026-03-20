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

┌─────────────────────────────────────────────────────────────┐
│                    DSA VISUALIZER WORKFLOW                   │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │ User selects │
    │  algorithm   │
    └──────┬───────┘
           v
    ┌─────────────────────────────────┐
    │ AlgorithmVisualizer loads with   │
    │ default input                    │
    └────────────────┬─────────────────┘
           v
    ┌─────────────────────────────────┐
    │ User edits input (array/string)  │
    └────────────────┬─────────────────┘
           v
    ┌─────────────────────────────────┐
    │ useSimulation calls simulate()   │
    └────────────────┬─────────────────┘
           v
    ┌─────────────────────────────────┐
    │     Steps array generated       │
    └────────────────┬─────────────────┘
           v
    ┌────────────────────────────────────────────────────┐
    │                 User interacts                      │
    │  ┌──────────┐  ┌─────────┐  ┌─────────┐  ┌──────┐  │
    │  │Prev/Next │  │Play/Pause│  │ Scrubber│  │Speed │  │
    │  │ buttons  │  │         │  │ slider  │  │control│  │
    │  └────┬─────┘  └────┬────┘  └────┬────┘  └──┬───┘  │
    └───────┼─────────────┼─────────────┼──────────┼──────┘
            └─────────────┼─────────────┼──────────┘
                         v              v
            ┌─────────────────────────────────────┐
            │    Current step index updates       │
            └─────────────────┬───────────────────┘
                              v
            ┌─────────────────────────────────────┐
            │ Code panel highlights current line   │
            └─────────────────┬───────────────────┘
                              v
            ┌─────────────────────────────────────┐
            │ Visualizer receives step.variables   │
            └─────────────────┬───────────────────┘
                              v
            ┌─────────────────────────────────────┐
            │ Canvas/display updates to reflect    │
            │ algorithm state                      │
            └─────────────────┬───────────────────┘
                              v
            ┌─────────────────────────────────────┐
            │        Autoplay active?              │
            └─────────┬───────────┬───────────────┘
                      │Yes        │No
                      v           v
        ┌─────────────────┐    ┌─────────────────┐
        │Loop to next step│    │Wait for user    │
        └────────┬────────┘    │action           │
                 │             └────────┬────────┘
                 └──────────────────────┘
                           │
                           v
              (back to step index update)

Deploy to Vercel / Netlify with build command `npm run build` and publish directory `dist`.

## License

MIT

