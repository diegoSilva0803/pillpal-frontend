import "./User.scss";
// import MedForm from "../../components/MedForm/MedForm";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MedFormTable from "../../components/MedFormTable/MedFormTable";

// axios.default.baseURL = "http://localhost:8080";

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
    id: "",
  });

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // console.log("FormData updated:", formData);
  }, [formData]);

  //   const handleOnChange = (e) => {
  //     const { value, name } = e.target;
  //     setFormData((prev) => {
  //       return {
  //         ...prev,
  //         [name]: value,
  //       };
  //     });
  //   };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "endDate" ? value || "" : value, // Handle empty endDate
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { medName, freq, startDate, endDate = "" } = formData;
    const data = await axios.post(
      "http://localhost:8080/medication/create",
      //   formData
      { medName, freq, startDate, endDate }
    );
    getData();
    setNewSection(false);
    // setMedicationSavedAlertSection(true);
    // console.log(data);
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
      setFormDataEdit({ ...editItem });
    } else {
      // Handle case where medication is not found (e.g., alert message)
    }
    setEditMedForm(true);
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
    <div className="user-container">
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
              <th>Time left</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
      {/* Conditionally render medication list and edit buttons */}
      {dataList.length > 0 && (
        dataList.map((el) => {
          return (
            <tr>
              <td>{el.medName}</td>
              <td>{el.startDate}</td>
              <td>{el.endDate}</td>
              <td>{el.freq}</td>
              <td></td>
              <td>
                <button className="btn btn-edit" onClick={() => handleEdit(el.id)}>Edit</button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(el.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })
      )}
      {/* Alternative message if no medication is found */}
      {dataList.length === 0 && <p className="no-med">No Medication</p>}
    </tbody>
        </table>
      </div>
    </div>
  );
}
