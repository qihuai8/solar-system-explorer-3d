import React, { useState, Suspense } from 'react';
import { SolarSystemScene } from './components/SolarSystemScene';
import { SolarSystemState } from './types';
import { PLANETS } from './constants';
import { Html, Loader } from '@react-three/drei';

const App: React.FC = () => {
  const [state, setState] = useState<SolarSystemState>({
    timeSpeed: 1.0,
    showOrbits: true,
    selectedPlanet: null,
  });

  const handlePlanetSelect = (name: string) => {
    setState((prev) => ({ ...prev, selectedPlanet: name }));
  };

  const selectedPlanetData = state.selectedPlanet 
    ? PLANETS.find(p => p.name === state.selectedPlanet) 
    : null;

  return (
    <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* 3D Canvas Layer with Suspense for Textures */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
            <div className="flex items-center justify-center w-full h-full bg-black text-blue-400 font-mono animate-pulse">
                LOADING SOLAR SYSTEM ASSETS...
            </div>
        }>
            <SolarSystemScene 
            {...state} 
            onPlanetSelect={handlePlanetSelect} 
            />
        </Suspense>
      </div>
      
      {/* Drei Loader Overlay (Optional, gives a progress bar) */}
      <Loader />

      {/* UI Overlay Layer - Header */}
      <div className="absolute top-0 left-0 p-6 z-10 w-full pointer-events-none">
        <div className="flex justify-between items-start">
          <div>
             <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-md">
              SOLAR SYSTEM
            </h1>
            <p className="text-gray-400 text-sm mt-1">Interactive 3D Model</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg pointer-events-auto">
             <span className="text-xs text-blue-300 font-mono">SCROLL TO ZOOM • DRAG TO ROTATE</span>
          </div>
        </div>
      </div>

      {/* UI Overlay Layer - Info Panel */}
      {selectedPlanetData && (
        <div className="absolute top-24 left-6 w-80 bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-xl z-20 pointer-events-auto transition-all animate-in slide-in-from-left-4 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-white">{selectedPlanetData.name}</h2>
            <button 
              onClick={() => setState(s => ({ ...s, selectedPlanet: null }))}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-4" />
            
            <p className="text-gray-200 leading-relaxed text-sm">
              {selectedPlanetData.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Distance</span>
                <span className="block text-white font-mono">{selectedPlanetData.distance} AU (Rel)</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Moons</span>
                <span className="block text-white font-mono">{selectedPlanetData.moons.length}</span>
              </div>
            </div>
            
            {selectedPlanetData.moons.length > 0 && (
                <div className="mt-2">
                    <span className="text-xs text-gray-500 uppercase">Major Satellites:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPlanetData.moons.map(m => (
                            <span key={m.name} className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded-full border border-blue-500/30">
                                {m.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </div>
      )}

      {/* UI Overlay Layer - Controls Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-20 pointer-events-auto flex gap-8 items-center">
        
        {/* Speed Control */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs uppercase tracking-wider text-gray-400">
            <span>Time Speed</span>
            <span className="text-blue-400 font-mono">{state.timeSpeed.toFixed(1)}x</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="0.1"
            value={state.timeSpeed}
            onChange={(e) => setState(s => ({ ...s, timeSpeed: parseFloat(e.target.value) }))}
            className="w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
          />
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-white/20"></div>

        {/* Toggles */}
        <label className="flex items-center cursor-pointer gap-3 group">
            <div className="relative">
                <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={state.showOrbits}
                    onChange={(e) => setState(s => ({ ...s, showOrbits: e.target.checked }))}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Show Orbits</span>
        </label>

      </div>
    </div>
  );
};

export default App;