import React, { useEffect, useRef } from 'react';
// pg289/290
//
import { useSelector, useDispatch } from "react-redux"
import { currentStrokeSelector } from "./selectors"

// missing import ... from pg291?
//
import { beginStroke, updateStroke, endStroke } from "./actions"

import logo from './logo.svg';
import './App.css';
import { clearCanvas, drawStroke, setCanvasSize } from './canvasUtils'; // pg294

// missing from book text
//
const WIDTH = 1024
const HEIGHT = 768

function App() {
  // step1, pg282
  //
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // pg290
  //
  const currentStroke = useSelector(currentStrokeSelector)
  const isDrawing = !!currentStroke.points.length

  const dispatch = useDispatch()

  const startDrawing = ({ // pg291
    nativeEvent   // NB: nativeEvent is being destructured from React.MouseEvent<HTMLCanvasElement>
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke(offsetX, offsetY))
  }

  const endDrawing = () => { // pg292
    if (isDrawing) {
      dispatch(endStroke())
    }
  }

  const draw = ({ // pg291
    nativeEvent
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    dispatch(updateStroke(offsetX, offsetY))
  }

  const getCanvasWithContext = (canvas = canvasRef.current) => { // pg293
    return { canvas, context: canvas?.getContext("2d") }
  }

  useEffect(() => { // pg293
    const { context } = getCanvasWithContext()
    if (!context) {
      return
    }
    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    )
  }, [currentStroke])

  // This useEffect was missing from the book text
  //
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!canvas || !context) {
      return
    }

    setCanvasSize(canvas, WIDTH, HEIGHT)

    context.lineJoin = "round"
    context.lineCap = "round"
    context.lineWidth = 5
    context.strokeStyle = "black"

    clearCanvas(canvas)
  }, [])

  return (
    // The update to embbed the canvas inside the div is missing from the book text
    //
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  )
}

export default App;
