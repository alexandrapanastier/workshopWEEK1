import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddWilder = ({setWildersData}) => {
  const [wilderName, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/api/wilder", {
        name: wilderName,
        city: city,
      });
      if (result.data && result.data.name && result.data.city) {
        setWildersData((prevWilders) => [...prevWilders, result.data]);
        setName("");
        setCity("");
      } else {
        console.log("Error: Invalid response from server");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Wilder</h3>
      <label>Name </label>
      <input
        value={wilderName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label>City </label>
      <input
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

AddWilder.propTypes = {
  setWildersData: PropTypes.func.isRequired,
};

export default AddWilder;
