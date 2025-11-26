import { PlanetData } from './types';

// Texture URLs sourced from Wikimedia Commons (Solar System Scope textures under CC BY 4.0 or Public Domain)
// These are standard 2K rectangular projection maps suitable for 3D spheres.

export const PLANETS: PlanetData[] = [
  {
    name: 'Mercury',
    radius: 0.8,
    distance: 15,
    speed: 1.5,
    color: '#A5A5A5',
    rotationSpeed: 0.01,
    moons: [],
    description: 'The smallest planet in our solar system and closest to the Sun.',
    orbitInclination: 7.0,
    orbitAscendingNode: 48,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solarsystemscope_texture_2k_mercury.jpg/2048px-Solarsystemscope_texture_2k_mercury.jpg',
  },
  {
    name: 'Venus',
    radius: 1.5,
    distance: 22,
    speed: 1.2,
    color: '#E3BB76',
    rotationSpeed: 0.005,
    moons: [],
    description: 'Second planet from the Sun. It has a thick, toxic atmosphere.',
    orbitInclination: 3.4,
    orbitAscendingNode: 76,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Solarsystemscope_texture_2k_venus_atmosphere.jpg/2048px-Solarsystemscope_texture_2k_venus_atmosphere.jpg',
  },
  {
    name: 'Earth',
    radius: 1.6,
    distance: 30,
    speed: 1.0,
    color: '#22A6B3',
    rotationSpeed: 0.02,
    moons: [
      { 
        name: 'Moon', 
        radius: 0.4, 
        distance: 3, 
        speed: 2, 
        color: '#DDDDDD',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Solarsystemscope_texture_2k_moon.jpg/2048px-Solarsystemscope_texture_2k_moon.jpg'
      }
    ],
    description: 'Our home planet, the only known place in the universe to harbor life.',
    orbitInclination: 0,
    orbitAscendingNode: 0,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solarsystemscope_texture_2k_earth_daymap.jpg/2048px-Solarsystemscope_texture_2k_earth_daymap.jpg',
  },
  {
    name: 'Mars',
    radius: 1.2,
    distance: 40,
    speed: 0.8,
    color: '#EB4D4B',
    rotationSpeed: 0.018,
    moons: [
      { name: 'Phobos', radius: 0.2, distance: 2, speed: 3, color: '#999999' },
      { name: 'Deimos', radius: 0.15, distance: 2.8, speed: 2.5, color: '#888888' }
    ],
    description: 'The Red Planet, known for its dusty, cold desert world.',
    orbitInclination: 1.85,
    orbitAscendingNode: 49,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Solarsystemscope_texture_2k_mars.jpg/2048px-Solarsystemscope_texture_2k_mars.jpg',
  },
  {
    name: 'Jupiter',
    radius: 4.5,
    distance: 60,
    speed: 0.4,
    color: '#F9CA24',
    rotationSpeed: 0.05,
    moons: [
      { name: 'Io', radius: 0.5, distance: 6, speed: 1.5, color: '#F8C291' },
      { name: 'Europa', radius: 0.45, distance: 7, speed: 1.2, color: '#DFF9FB' },
      { name: 'Ganymede', radius: 0.6, distance: 8.5, speed: 1.0, color: '#95A5A6' },
      { name: 'Callisto', radius: 0.55, distance: 10, speed: 0.8, color: '#7F8C8D' }
    ],
    description: 'The largest planet in the solar system, a gas giant.',
    orbitInclination: 1.3,
    orbitAscendingNode: 100,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Solarsystemscope_texture_2k_jupiter.jpg/2048px-Solarsystemscope_texture_2k_jupiter.jpg',
  },
  {
    name: 'Saturn',
    radius: 3.8,
    distance: 85,
    speed: 0.3,
    color: '#F0932B',
    rotationSpeed: 0.045,
    hasRings: true,
    ringColor: '#F6E58D',
    moons: [
      { name: 'Titan', radius: 0.7, distance: 7, speed: 0.9, color: '#F1C40F' }
    ],
    description: 'Adorned with a dazzling, complex system of icy rings.',
    orbitInclination: 2.5,
    orbitAscendingNode: 113,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Solarsystemscope_texture_2k_saturn.jpg/2048px-Solarsystemscope_texture_2k_saturn.jpg',
  },
  {
    name: 'Uranus',
    radius: 2.8,
    distance: 105,
    speed: 0.2,
    color: '#7ED6DF',
    rotationSpeed: 0.03,
    moons: [
      { name: 'Titania', radius: 0.4, distance: 5, speed: 1, color: '#E056FD' }
    ],
    description: 'An ice giant with a unique tilt, rotating on its side.',
    orbitInclination: 0.77,
    orbitAscendingNode: 74,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Solarsystemscope_texture_2k_uranus.jpg/2048px-Solarsystemscope_texture_2k_uranus.jpg',
  },
  {
    name: 'Neptune',
    radius: 2.7,
    distance: 125,
    speed: 0.15,
    color: '#686DE0',
    rotationSpeed: 0.032,
    moons: [
      { name: 'Triton', radius: 0.5, distance: 5, speed: 1.2, color: '#D6A2E8' }
    ],
    description: 'The most distant major planet, dark, cold, and whipped by supersonic winds.',
    orbitInclination: 1.77,
    orbitAscendingNode: 131,
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Solarsystemscope_texture_2k_neptune.jpg/2048px-Solarsystemscope_texture_2k_neptune.jpg',
  }
];

export const OORT_CLOUD_RADIUS = 250;
export const OORT_CLOUD_COUNT = 3000;
export const SUN_TEXTURE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Solarsystemscope_texture_2k_sun.jpg/2048px-Solarsystemscope_texture_2k_sun.jpg';