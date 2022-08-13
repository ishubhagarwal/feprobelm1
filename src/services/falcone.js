import API from "../lib/fetch";

export const fetchPlantes = async () => {
  const response = await API({
    method: "GET",
    route: "/planets",
  });
  return response;
};

export const fetchVehicles = async () => {
  const response = await API({
    method: "GET",
    route: "/vehicles",
  });
  return response;
};

export const fetchToken = async () => {
  const response = await API({
    method: "POST",
    route: "/token",
  });
  return response;
};

export const findFalcone = async (planets, vehicles) => {
  const tokenResponse = await fetchToken();
  if (tokenResponse && tokenResponse.data && tokenResponse.data.token) {
    const response = await API({
      method: "POST",
      route: "/find",
      data: {
        planet_names: planets,
        vehicle_names: vehicles,
        token: tokenResponse.data.token
      },
    });
    return response;
  }
  return null;
};
