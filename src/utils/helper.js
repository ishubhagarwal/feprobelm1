export const formatPlanets = (planets) => {
  const result = [];
  if (planets && planets.length) {
    for (let i = 0; i < planets.length; i++) {
      const planet = planets[i];
      result.push({
        key: planet.name,
        label: planet.name,
        distance: planet.distance,
      });
    }
  }
  return result;
};

export const formatVehicles = (vehicles) => {
  const result = new Map();
  if (vehicles && vehicles.length) {
    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];
      result.set(vehicle.name, vehicle);
    }
  }
  return result;
};

export const formatSelectedDestinations = (destinations) => {
  const planets = [];
  const vehicles = [];
  for (const key in destinations) {
    const destination = destinations[key];
    if (destination.planet) {
      planets.push(destination.planet.name);
    }
    if (destination.vehicle) {
      vehicles.push(destination.vehicle.name);
    }
  }
  return { planets, vehicles };
};

export const getDestinationsInitialState = () => {
  return {
    destinationOne: {
      planet: null,
      vehicle: null,
    },
    destinationTwo: {
      planet: null,
      vehicle: null,
    },
    destinationThree: {
      planet: null,
      vehicle: null,
    },
    destinationFour: {
      planet: null,
      vehicle: null,
    },
  };
};
