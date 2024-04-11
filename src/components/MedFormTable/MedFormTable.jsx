import "./MedFormTable.scss";
import "../../pages/User/User.scss";
import { IoIosClose } from "react-icons/io";

const timeOptions = [];
for (let hour = 0; hour < 24; hour++) {
  const hourStr = hour.toString().padStart(2, "0");
  timeOptions.push({
    value: `${hourStr}:00`,
    label: `${hourStr}:00 ${hour < 12 ? "AM" : "PM"}`,
  });
}

export default function MedFormTable({
  handleSave,
  handleOnChange,
  handleClose,
  formData,
}) {
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
          value={formData.medName}
        />
        <label htmlFor="freq">Number of times per day: </label>
        <input
          type="number"
          min="0"
          id="freq"
          name="freq"
          placeholder="number of times"
          onChange={handleOnChange}
          required
          value={formData.freq}
        />

        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          onChange={handleOnChange}
          required
          value={formData.startDate}
        />

        <label htmlFor="endDate">End Date (Optional): </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          onChange={handleOnChange}
          value={formData.endDate}
        />

        {formData.freq > 0 && (
          <div>
            <label>Dosage Start Time: </label>
            {Array(formData.freq)
              .fill(null)
              .map((dosageTime, index) => (
                <div key={index}>
                  <select
                    className=""
                    name={`dosageTimes[${index}]`}
                    value={formData.dosageTimes[index] || ""}
                    onChange={handleOnChange}
                  >
                    <option value="">Select Time</option>
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            <div className="interval">
              <label>Dosage Interval: </label>
              <input type="text" />
            </div>
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
