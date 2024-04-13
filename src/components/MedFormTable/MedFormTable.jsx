import "./MedFormTable.scss";
import "../../pages/User/User.scss";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { Preview } from "@mui/icons-material";

export default function MedFormTable({
  handleSave,
  handleOnChange,
  handleClose,
  formData,
  setFormData,
}) {
  const [numTimes, setNumTimes] = useState([]);
  const [numTimeInputFields, setNumTimeInputFields] = useState([]);
  //   console.log(numTimeInputFields);
  //   console.log(numTimeInputFields[0]);

  const onChangeTimes = (event) => {
    try {
      const myArr = [];
      for (let x = 0; x < event.target.value || 0; x++) {
        myArr.push(x);
      }
      if (event.target.value > 0 && event.target.value < 11) {
        setNumTimes(myArr || []);
      }
      handleOnChange(event);
    } catch (error) {
      alert("DOSAGE CANNOT BE MORE THAN 10!");
    }
  };

  useEffect(() => {
    const handleOnChangeInputTime = (e) => {
    //   console.log(e.target.id);
      const dosageTime = {
        id: e.target.id,
        value: e.target.value,
      };
      if (numTimeInputFields.length < formData.dosageTimes.length) {
        while (numTimeInputFields.length < formData.dosageTimes.length) {
          formData.dosageTimes.pop();
        }
      }
      const doesDosageExist = formData.dosageTimes.findIndex(
        (dose) => dose.id === dosageTime.id
      );
    //   console.log("doesdosageexist", doesDosageExist);
      if (doesDosageExist !== -1) {
        formData.dosageTimes[doesDosageExist] = dosageTime;
      } else {
        formData.dosageTimes.push(dosageTime);
      }
      console.log(e.target.value);
      // setFormData({...formData, })
      // console.log(e);
      handleOnChange(e);
    //   console.log(e.target.value);
    };
    setNumTimeInputFields(
      numTimes.map((dosageTime, index) => {
        return (
          <div key={index}>
            <input
              type="time"
              id={dosageTime}
              required
              onChange={(e) => {
                handleOnChangeInputTime(e);
                // handleOnChange(e);
              }}
            />
          </div>
        );
      })
    );
  }, [formData.dosageTimes, handleOnChange, numTimes]);

  return (
    <div className="addContainer">
      <form id="medForm" onSubmit={handleSave}>
        <div className="close-btn" onClick={handleClose}>
          <IoIosClose />
        </div>
        <label htmlFor="med-name">Medication name: </label>
        <input
          type="text"
          id="med-name"
          name="medName"
          placeholder="medication"
          onChange={handleOnChange}
          required
          defaultValue={formData.medName}
        />
        <label htmlFor="freq">Number of times per day: </label>
        <input
          type="number"
          min="0"
          max="10"
          minLength={0}
          maxLength={6}
          id="freq"
          name="freq"
          placeholder="number of times"
          onChange={onChangeTimes}
          required
          defaultValue={formData.freq}
        />

        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          onChange={handleOnChange}
          required
          defaultValue={formData.startDate}
        />

        <label htmlFor="endDate">End Date (Optional): </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          onChange={handleOnChange}
          defaultValue={formData.endDate}
        />

        {formData.freq > 0 && (
          <div>
            <label>Dosage Start Time: </label>

            {numTimeInputFields}
          </div>
        )}

        <div className="form-btn">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
