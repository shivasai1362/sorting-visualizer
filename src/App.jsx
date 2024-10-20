import React from 'react'
import SortVisualizer from './SortVisualizer'

function App() {
  return (
    <div >
      <h1 className='my-1 mx-3 font-bold text-4xl text-slate-800 tracking-wider  w-fit p-3 rounded-xl bg-indigo-50
        shadow-neutral-200 shadow-sm
      '>Sorting Visulizer</h1>
      <SortVisualizer />
    </div>
  )
}

export default App