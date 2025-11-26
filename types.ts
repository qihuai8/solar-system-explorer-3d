export interface MoonData {
  name: string;
  radius: number;
  distance: number; // Distance from parent planet
  speed: number;
  color: string;
  textureUrl?: string;
}

export interface PlanetData {
  name: string;
  radius: number;
  distance: number; // Distance from Sun
  speed: number; // Orbital speed
  color: string;
  rotationSpeed: number; // Self rotation
  hasRings?: boolean;
  ringColor?: string;
  moons: MoonData[];
  description: string;
  orbitInclination: number; // Degrees relative to ecliptic
  orbitAscendingNode: number; // Degrees, rotation around vertical axis (Longitude of Ascending Node)
  textureUrl: string;
}

export interface SolarSystemState {
  timeSpeed: number;
  showOrbits: boolean;
  selectedPlanet: string | null;
}