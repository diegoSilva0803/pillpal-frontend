import "./User.scss";
// import MedForm from "../../components/MedForm/MedForm";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// axios.default.baseURL = "http://localhost:8080";

export default function User() {
  const [newSection, setNewSection] = useState(false);
  const [formData, setFormData] = useState({
    medName: "",
    startDate: "",
    endDate: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = await axios.post("/medication/create", formData);
    console.log(data);

    // Optionally, update dataList state with the new data after successful save
    setDataList([...dataList, formData]);
    // Clear the form after saving
  
  };

  const handleClearForm = () => {
    // Clear the form input fields
    setFormData({
      medName: "",
      startDate: "",
      endDate: "",
      freq: "",
    });
  };

  // const getData = async() => {
  //   const data = await axios.get("/" );
  //   console.log(data);
  //   setDataList(data.data)
  // }

  return (
    <div className="user-container">
      <button className="btn btn-add" onClick={() => setNewSection(true)}>
        Add New
      </button>

      {newSection && (
        <div className="addContainer">
          <form onSubmit={handleSave}>
            <div className="close-btn" onClick={() => setNewSection(false)}>
              <IoIosClose />
            </div>
            <label htmlFor="med-name">Medication name: </label>
            <input
              type="text"
              id="med-name"
              name="medName"
              placeholder="medication"
              onChange={handleOnChange}
            />
            <label htmlFor="freq">Number of times per day: </label>
            {/* take negative numbers out */}
            <input
              type="number"
              id="freq"
              name="frenq"
              placeholder="number of times"
            />

            <label htmlFor="startDate">Start Date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleOnChange}
            />

            <label htmlFor="endDate">End Date: </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleOnChange}
            />
            <div className="form-btn">
              <Link to="/medication/create">
                <button className="btn">Save</button>
              </Link>
              {/* Fix this */}
              <button
              className="btn"
                onClick={() => {
                  handleClearForm();
                  setNewSection(false); // Close the form after clearing
                }}
              >
                Add New
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Frequency</th>
              <th>Time left</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((el) => {
              return (
                <tr>
                  <td>{el.medName}</td>
                  <td>{el.startDate}</td>
                  <td>{el.endDate}</td>
                  <td>{el.freq}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
