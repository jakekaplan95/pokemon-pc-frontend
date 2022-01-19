// Import useState hook
import React, { useState } from "react";

//destructure out props, including router prop history
const Form = ({ initialPokemon, handleSubmit, buttonLabel, history }) => {
  ////////////////
  // The Form Data State
  ////////////////
  // Initiallize the form with the initialTodo state
  const [formData, setFormData] = useState(initialPokemon);

  //////////////////////////
  // Functions
  //////////////////////////

  // Standard React Form HandleChange Function
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to run when form is submitted
  const handleSubmisson = (event) => {
    //prevent form refresh
    event.preventDefault();
    //pass formData to handleSubmit prop function
    handleSubmit(formData);
    //push user back to main page
    history.push("/");
  };

  // Our Form, an input for the subject and details fields and a submit button
  return (
    <form onSubmit={handleSubmisson}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.subject}
        name="name"
        placeholder="name"
      />
      <input
        type="integer"
        onChange={handleChange}
        value={formData.details}
        name="identifier"
        placeholder="identifier"
      />
       <input
        type="text"
        onChange={handleChange}
        value={formData.details}
        name="ability"
        placeholder="ability"
      />
       <input
        type="integer"
        onChange={handleChange}
        value={formData.details}
        name="health"
        placeholder="health"
      />
       <input
        type="integer"
        onChange={handleChange}
        value={formData.details}
        name="attack"
        placeholder="attack"
      />
       <input
        type="integer"
        onChange={handleChange}
        value={formData.details}
        name="defense"
        placeholder="defense"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;