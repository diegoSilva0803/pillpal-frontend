// import "./MedFormTable.scss";
// import "../../pages/User/User.scss";
// import { IoIosClose } from "react-icons/io";
// import { useState, useEffect } from "react";

// const timeOptions = [];
// for (let hour = 0; hour < 24; hour++) {
//   const hourStr = hour.toString().padStart(2, "0");
//   timeOptions.push({
//     value: `${hourStr}:00`,
//     label: `${hourStr}:00 ${hour < 12 ? "AM" : "PM"}`,
//   });
// }

// export default function MedFormTable({
//   handleSave,
//   handleOnChange,
//   handleClose,
//   formData,
//   setFormData,
// }) {
//   const [numTimes, setNumTimes] = useState([]);
//   const [numTimeInputFields, setNumTimeInputFields] = useState([]);
//   //   console.log(numTimeInputFields);
//   //   console.log(numTimeInputFields[0]);

//   const onChangeTimes = (event) => {
//     const myArr = [];
//     for (let x = 0; x < event.target.value || 0; x++) {
//       myArr.push(x);
//     }

//     setNumTimes(myArr || []);
//     handleOnChange(event);
//   };

//   useEffect(() => {
//     setNumTimeInputFields(
//       numTimes.map((dosageTime, index) => {
//         return (
//           <div key={index}>
//             <select
//               className=""
//               name={`dosageTimes[${dosageTime}]`} // Update name based on index
//               defaultValue={formData.dosageTimes[dosageTime] || ""}
//               onChange={handleOnChange}
//             >
//               <option value="">Select Time</option>
//               {timeOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );
//       })
//     );
//   }, [formData.dosageTimes, handleOnChange, numTimes]);

//   return (
//     <div className="addContainer">
//       <form id="medForm" onSubmit={handleSave}>
//         <div className="close-btn" onClick={handleClose}>
//           <IoIosClose />
//         </div>
//         <label htmlFor="med-name">Medication name: </label>
//         <input
//           type="text"
//           id="med-name"
//           name="medName"
//           placeholder="medication"
//           onChange={handleOnChange}
//           required
//           defaultValue={formData.medName}
//         />
//         <label htmlFor="freq">Number of times per day: </label>
//         <input
//           type="number"
//           min="0"
//           max="6"
//           minLength={0}
//           maxLength={6}
//           id="freq"
//           name="freq"
//           placeholder="number of times"
//           onChange={onChangeTimes}
//           required
//           defaultValue={formData.freq}
//         />

//         <label htmlFor="startDate">Start Date: </label>
//         <input
//           type="date"
//           id="startDate"
//           name="startDate"
//           onChange={handleOnChange}
//           required
//           defaultValue={formData.startDate}
//         />

//         <label htmlFor="endDate">End Date (Optional): </label>
//         <input
//           type="date"
//           id="endDate"
//           name="endDate"
//           onChange={handleOnChange}
//           defaultValue={formData.endDate}
//         />

//         {formData.freq > 0 && (
//           <div>
//             <label>Dosage Start Time: </label>

//             {numTimeInputFields}
//           </div>
//         )}

//         <div className="form-btn">
//           <button type="submit" className="btn">
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
