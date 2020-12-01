
import { RootState } from "./types"

// pg289: "it is a good idea to separate the data retrieval logic from the rendering logic"
//  -> this is why we use selectors
//
export const currentStrokeSelector = (state: RootState) => state.currentStroke
