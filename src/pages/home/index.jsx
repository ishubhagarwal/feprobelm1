import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import string from "../../utils/strings";
import SelectPlanet from "./components/select-planet";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  fetchPlantes,
  fetchVehicles,
  findFalcone,
} from "../../services/falcone";
import { useSelector, useDispatch } from "react-redux";
import {
  setFalconePlanets,
  setFalconeVehicles,
  setFalcone,
  setTimeTaken,
  clearResult,
} from "../../store/slices/falcone";
import {
  formatPlanets,
  formatVehicles,
  formatSelectedDestinations,
  getDestinationsInitialState,
} from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const falcone = useSelector((state) => state.falcone);
  const [availablePlanets, setAvailablePlanets] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState(null);
  const [destinations, setDestinations] = useState(
    getDestinationsInitialState()
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAndSetPlanets = () => {
    fetchPlantes().then((response) => {
      const formattedPlanetsData = formatPlanets(response.data);
      setAvailablePlanets(formattedPlanetsData);
      dispatch(setFalconePlanets(response.data));
    });
  };

  const fetchAndSetVehicles = () => {
    fetchVehicles().then((response) => {
      const formattedVehiclesData = formatVehicles(response.data);
      setAvailableVehicles(formattedVehiclesData);
      dispatch(setFalconeVehicles(response.data));
    });
  };

  useEffect(() => {
    fetchAndSetPlanets();
    fetchAndSetVehicles();
  }, []);

  const planetHandler = (planet, destinationKey) => {
    const destinationsState = { ...destinations };
    destinationsState[destinationKey].planet = planet;
    destinationsState[destinationKey].vehicle = null;
    setDestinations(destinationsState);
  };

  const vehicleHandler = (vehicle, destinationKey) => {
    const destinationsState = { ...destinations };
    destinationsState[destinationKey].vehicle = vehicle;
    setDestinations(destinationsState);
  };

  const updateAvailablePlanets = () => {
    const currentAvailablePlanets = [];
    if (falcone.planets && falcone.planets.length) {
      for (let i = 0; i < falcone.planets.length; i++) {
        const planetItem = falcone.planets[i];
        let found = false;
        for (let destination in destinations) {
          if (
            destinations[destination].planet &&
            planetItem.name === destinations[destination].planet.name
          ) {
            found = true;
          }
        }
        if (!found) {
          currentAvailablePlanets.push({
            key: planetItem.name,
            label: planetItem.name,
            distance: planetItem.distance,
          });
        }
      }
    }
    setAvailablePlanets(currentAvailablePlanets);
  };

  const updateAvailableVehicles = () => {
    const currentAvailableVehicles = new Map();
    if (falcone.vehicles && falcone.vehicles.length) {
      for (let i = 0; i < falcone.vehicles.length; i++) {
        const vehicleItem = { ...falcone.vehicles[i] };
        for (let destination in destinations) {
          if (
            destinations[destination].vehicle &&
            vehicleItem.name === destinations[destination].vehicle.name
          ) {
            vehicleItem.total_no--;
          }
        }
        currentAvailableVehicles.set(vehicleItem.name, vehicleItem);
      }
    }
    setAvailableVehicles(currentAvailableVehicles);
  };

  const updateTimeTaken = () => {
    let timeTaken = 0;
    for (const key in destinations) {
      const destination = destinations[key];
      if (!destination.planet || !destination.vehicle) continue;
      timeTaken += destination.planet.distance / destination.vehicle.speed;
    }
    dispatch(setTimeTaken(timeTaken));
  };

  useEffect(() => {
    updateAvailablePlanets();
    updateAvailableVehicles();
    updateTimeTaken();
  }, [destinations]);

  const isButtonDisabled = () => {
    const { planets, vehicles } = formatSelectedDestinations(destinations);
    if (planets.length < 4 || vehicles.length < 4) {
      return true;
    }
    return false;
  };

  const findFalconeHandler = async (e) => {
    e.preventDefault();
    const { planets, vehicles } = formatSelectedDestinations(destinations);
    const response = await findFalcone(planets, vehicles);
    if (response.success) {
      dispatch(setFalcone(response.data));
    }
    navigate("/result");
  };

  useEffect(() => {
    setDestinations(getDestinationsInitialState());
    dispatch(clearResult());
  }, [falcone.reset]);

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.titleStyle}>{string.SELECT_PLANET_TEXT}</h2>
      <div className={styles.formContainer}>
        <SelectPlanet
          destinationKey="destinationOne"
          planetHandler={planetHandler}
          planets={availablePlanets}
          vehicleHandler={vehicleHandler}
          vehicles={availableVehicles}
          label={string.DESTINATION_ONE_LABEL}
        />
        <SelectPlanet
          destinationKey="destinationTwo"
          planetHandler={planetHandler}
          planets={availablePlanets}
          vehicleHandler={vehicleHandler}
          vehicles={availableVehicles}
          label={string.DESTINATION_TWO_LABEL}
        />
        <SelectPlanet
          destinationKey="destinationThree"
          planetHandler={planetHandler}
          planets={availablePlanets}
          vehicleHandler={vehicleHandler}
          vehicles={availableVehicles}
          label={string.DESTINATION_THREE_LABEL}
        />
        <SelectPlanet
          destinationKey="destinationFour"
          planetHandler={planetHandler}
          planets={availablePlanets}
          vehicleHandler={vehicleHandler}
          vehicles={availableVehicles}
          label={string.DESTINATION_FOUR_LABEL}
        />
      </div>
      <h2 className={styles.timeStyle}>
        {string.TIME_TAKEN_TEXT} {falcone.timeTaken}
      </h2>
      <div className={styles.buttonStyle}>
        <Button
          icon={<SearchOutlined />}
          disabled={isButtonDisabled()}
          onClick={(e) => findFalconeHandler(e)}
        >
          {string.FIND_FALCONE_BUTTON_TEXT}
        </Button>
      </div>
    </div>
  );
};

export default Home;
