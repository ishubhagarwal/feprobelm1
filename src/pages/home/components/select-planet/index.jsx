import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Button, Radio } from "antd";
import styles from "./SelectPlanet.module.css";
import { useSelector } from "react-redux";

const SelectPlanet = ({
  destinationKey,
  planets,
  planetHandler,
  vehicles,
  vehicleHandler,
  label,
}) => {
  const falcone = useSelector((state) => state.falcone);

  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const onChangeVehicle = (e) => {
    const vehicle = vehicles.get(e.target.value);
    setSelectedVehicle(e.target.value);
    vehicleHandler(vehicle, destinationKey);
  };

  const onChangePlanet = ({ item, key }) => {
    const planet = {
      name: key,
      distance: item.props.distance,
    };
    setSelectedPlanet(planet);
    setSelectedVehicle(null);
    planetHandler(planet, destinationKey);
  };

  useEffect(() => {
    setSelectedPlanet(null);
    setSelectedVehicle(null);
  }, [falcone.reset]);

  const menu = (
    <Menu
      selectedKeys={[selectedPlanet]}
      onClick={onChangePlanet}
      selectable
      items={planets}
    />
  );

  const getVehiclesOptions = () => {
    const vehiclesOptions = [];
    if (vehicles) {
      for (const [key, vehicle] of vehicles) {
        vehiclesOptions.push(
          <Radio
            value={key}
            key={key}
            disabled={
              !vehicle.total_no ||
              vehicle.max_distance < selectedPlanet.distance
            }
          >
            {vehicle.name} ({vehicle.total_no})
          </Radio>
        );
      }
    }
    return vehiclesOptions;
  };

  return (
    <div className={styles.mainContainer}>
      <label className={styles.labelStyle}>{label}</label>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        className={styles.dropdownStyle}
      >
        <Button className={styles.buttonStyle}>
          <Space>
            {selectedPlanet ? selectedPlanet.name : "Select"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      {selectedPlanet && (
        <Radio.Group onChange={onChangeVehicle} value={selectedVehicle}>
          <Space direction="vertical">{getVehiclesOptions()}</Space>
        </Radio.Group>
      )}
    </div>
  );
};

SelectPlanet.propTypes = {
  destinationKey: PropTypes.string,
  planets: PropTypes.array,
  planetHandler: PropTypes.func,
  vehicles: PropTypes.object,
  vehicleHandler: PropTypes.func,
  label: PropTypes.string,
};

export default SelectPlanet;
