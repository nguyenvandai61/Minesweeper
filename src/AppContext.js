import React from "react"
export const Levels = {
    "SUPEREASY": {
        nBomb: 1,
        height: 2,
        width: 2
    },
    
    "EASY": {
        nBomb: 3,
        height: 4,
        width: 4
    },
    "MEDIUM": {
        nBomb: 6,
        height: 8,
        width: 8
    },
    "HARD": {
        nBomb: 9,
        height: 10,
        width: 10
    },
}
  
export const AppContext = React.createContext();