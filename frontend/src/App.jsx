import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ColorTest() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-h2 font-heading">🎨 Color Test</h1>

      <p className="text-primary">text-primary</p>
      <p className="text-primary-dark">text-primary-dark</p>
      <p className="text-primary-medium">text-primary-medium</p>
      <p className="text-primary-light">text-primary-light</p>
      <p className="text-primary-extraLight">text-primary-extraLight</p>

      <p className="text-secondary-redPink">text-secondary-redPink</p>
      <p className="text-secondary-lightPink">text-secondary-lightPink</p>

      <p className="text-semantic-green">text-semantic-green</p>
      <p className="text-semantic-blue">text-semantic-blue</p>
      <p className="text-semantic-orange">text-semantic-orange</p>

      <div className="w-full h-16 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end text-white flex items-center justify-center rounded">
        Gradient Background
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-bg-light p-10">
      <ColorTest />
    </div>
  );
}

export default App
