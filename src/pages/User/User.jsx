import "./User.scss";
// import MedForm from "../../components/MedForm/MedForm";
import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import MedFormTable from "../../components/MedFormTable/MedFormTable";
import backgroundImg from "../../images/pill-bg.jpg";


export default function User() {
  const [newSection, setNewSection] = useState(false);
  const [formData, setFormData] = useState({
    medName: "",
    freq: 0,
    startDate: "",
    endDate: "",
    dosageTimes: [],
  });

  const [editMedForm, setEditMedForm] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState({
    medName: "",
    freq: 0,
    startDate: "",
    endDate: "",
    dosageTimes: [],
    id: "",
  });

  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const calculateRemainingHours = (dosageTimeHours) => {
    // Get the current date and time
    const now = new Date();

    // Create a new Date object for the dosage time
    const dosageTime = new Date();
    dosageTime.setHours(dosageTimeHours, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    // Calculate the difference in milliseconds between current time and dosage time
    const timeDifference = dosageTime.getTime() - now.getTime();

    // Check if the dosage time has already passed for today
    if (timeDifference < 0) {
      // If it has passed, calculate the remaining hours for tomorrow
      dosageTime.setDate(dosageTime.getDate() + 1); // Set the date to tomorrow
      const tomorrowDifference = dosageTime.getTime() - now.getTime();
      return Math.floor(tomorrowDifference / (1000 * 60 * 60)); // Convert milliseconds to hours and round down
    } else {
      // If it hasn't passed, calculate the remaining hours for today
      return Math.floor(timeDifference / (1000 * 60 * 60));
    }
  };

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // console.log("FormData updated:", formData);
    // console.log(formData);
  }, [formData]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: name === "endDate" ? value || "" : value, // Handle empty endDate
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { medName, freq, startDate, endDate, dosageTimes = "" } = formData;
    const data = await axios.post(
      "http://localhost:8080/medication/create",
      //   formData
      { medName, freq, startDate, endDate, dosageTimes }
    );
    getData();
    setNewSection(false);
    // setMedicationSavedAlertSection(true);
    console.log(data);
  };

  const getData = async () => {
    const response = await axios.get("http://localhost:8080/medication/create");
    setDataList(response.data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/medication/delete/${id}`
      );
      //   console.log(response)
      setDataList(dataList.filter((item) => item.id !== id));
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting medication:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleEdit = async (id) => {
    const editItem = dataList.find((item) => item.id === id);
    if (editItem) {
      setFormDataEdit({ ...formDataEdit, ...editItem });
    } else {
      // Handle case where medication is not found (e.g., alert message)
    }
    setEditMedForm(true);
  };

  const handleEditClick = (id) => {
    handleEdit(id);
    // Call onClickReset here if needed (optional)
    onClickReset(); // This line is optional, depending on your needs.
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const { medName, freq, startDate, endDate, id } = formDataEdit;

    // PUT request for updating medication
    try {
      const response = await axios.put(
        `http://localhost:8080/medication/update/${id}`,
        { medName, freq, startDate, endDate }
      );
      getData(); // Fetch updated data after successful edit
      setEditMedForm(false);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating medication:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="user-container"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundPosition: "center",
      }}
    >
      <button className="btn btn-add" onClick={() => setNewSection(true)}>
        Add New
      </button>

      {newSection && (
        <MedFormTable
          handleSave={handleSave}
          handleOnChange={handleOnChange}
          handleClose={() => setNewSection(false)}
          formData={formData}
        />
      )}

      {editMedForm && (
        <MedFormTable
          handleSave={handleEditSave}
          handleOnChange={(e) => {
            setFormDataEdit({
              ...formDataEdit,
              [e.target.name]: e.target.value,
            });
          }} // Update onChange for edit form
          handleClose={() => setEditMedForm(false)}
          formData={formDataEdit} // Pass edit form data
        />
      )}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Frequency</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 &&
              dataList.map((el) => {
                return (
                  <tr>
                    <td className="tableData">{el.medName}</td>
                    <td className="tableData">{el.startDate}</td>
                    <td className="tableData">{el.endDate}</td>
                    <td className="tableData">{el.freq}</td>
                    
                    

                    <td className="tableData">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditClick(el.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            {dataList.length === 0 && <p className="no-med">No Medication</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
