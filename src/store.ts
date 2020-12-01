// pg277
//
import { rootReducer } from "./rootReducer"
import { composeWithDevTools, devToolsEnhancer } from "redux-devtools-extension"
import { applyMiddleware, createStore } from "redux"

// pg279
//
import { logger } from "redux-logger"

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
)

// store.dispatch({ type: "TEST_ACTION" })
