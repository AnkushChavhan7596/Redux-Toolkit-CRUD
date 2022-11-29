import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addExcercise,
  deleteExcercise,
  setExcercises,
  updateExcercise
} from "../../redux/excerciseSlice";

const Home = () => {
  const [excercise, setExcercise] = useState("");
  const [reps, setReps] = useState(0);

  const [update, setUpdate] = useState(false);
  const [currentExcercise, setCurrentExcercise] = useState("");
  const [currentReps, setCurrentReps] = useState("");
  const [currentId, setCurrentId] = useState("");

  const [newExcercise, setNewExcercise] = useState("");
  const [newReps, setNewReps] = useState("");

  const excercises = useSelector((state) => state.excercise.excercises);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/api/excercise/add", {
        excercise,
        reps,
      });

      if (res.status === 200) {
        dispatch(addExcercise(res.data.excercise));
      }
    } catch (err) {
      console.log(err);
    }
  };


  // handleDelete
  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/api/excercise/delete/${_id}`
      );

      if (res.status === 200) {
        dispatch(deleteExcercise(res.data.excercise));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // fetch all excercises
  const fetchExcercises = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/excercise/excercises"
      );
      dispatch(setExcercises(res.data.excercises));
    } catch (err) {
      console.log(err);
    }
  };

  // handle update
  const handleUpdate = (item) =>{
        setUpdate(true)
        console.log(item)
        setCurrentId(item?._id)
        setCurrentExcercise(item.excercise);
        setCurrentReps(item.reps);
  }

  // handle update submit
  const handleUpdateSubmit = async (e) =>{
    e.preventDefault();

    try{
        console.log(currentId)
      
       const res = await axios.patch(`http://localhost:8800/api/excercise/update/${currentId}`,{newExcercise, newReps})
        
       if(res.status === 200){
        setUpdate(false)
        dispatch(updateExcercise({_id : currentId, excercise : newExcercise, reps : newReps}))
        console.log("Excercise updated successfully ")
        console.log(res.data.excercise)
       }
    }catch(error){
        console.log(error);
    }
  }

  // fetching all excercises
  useEffect(() => {
    fetchExcercises();
  }, []);

  return (
    <div>
      <div className="heading">
        <h2>Gym Tracker</h2>
      </div>

      <div className="wrapper">
        <div className="left">
          {excercises?.map((item) => {
            return (
              <div className="item" key={item._id}>
                <p className="excersize_name">{item.excercise}</p>
                <p className="no_reps">Reps : {item.reps}</p>
                <div className="button_wrapper">
                  <button className="edit" onClick={() => handleUpdate(item)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="right">
          {!update && (
            <form onSubmit={handleSubmit}>
              <h2 className="add_excercise">Add Excercise </h2>
              <div className="field">
                <label>Excercise Name : </label>
                <input
                  type="text"
                  placeholder="Enter excercise name"
                  onChange={(e) => setExcercise(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label>Reps : </label>
                <input
                  type="number"
                  placeholder="Enter number of reps"
                  onChange={(e) => setReps(e.target.value)}
                  required
                />
              </div>
              <div className="add_wrapper">
                <button type="submit">Add</button>
              </div>
            </form>
          )}

          {update && (
            <form onSubmit={handleUpdateSubmit} className="udpateForm">
              <h2 className="add_excercise">Update Excercise </h2>
              <div className="field">
                <label>Excercise Name : </label>
                <input
                  type="text"
                  placeholder={currentExcercise}
                  onChange={(e) => setNewExcercise(e.target.value)}
                  
                />
              </div>
              <div className="field">
                <label>Reps : </label>
                <input
                  type="number"
                  placeholder={currentReps}
                  onChange={(e) => setNewReps(e.target.value)}
                  
                />
              </div>
              <div className="add_wrapper">
                <button type="submit">Update</button>
                <button className="cancel" onClick={() => setUpdate(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
