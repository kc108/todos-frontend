import React, { useState } from 'react';

// DESTRUCTURE OUT PROPS, INCLUDING ROUTER PROP HISTORY

const Form = ({ initialTodo, handleSubmit, buttonLabel, history }) => {

    ///////////////////////////////////
    // The Form Data State
    ///////////////////////////////////

    // Initialize the form with the initialTodo state
    const [formData, setFormData] = useState(initialTodo);

    ///////////////////////////////////
    // Functions
    ///////////////////////////////////

    // Standard React Form handleChange Function
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Function to run when form is submitted
    const handleSubmission = (event) => {
        // prevent form refresh
        event.preventDefault();
        // pass formData to handleSubmit prop function
        handleSubmit(formData);
        // push user back to main page
        history.push("/");
    };

    // Our Form, an input for the subject and details fields and a submit button


    return (
        <div>
           <form onSubmit={handleSubmission}>
            <input 
                type="text"
                onChange={handleChange}
                value={formData.subject}
                name="subject"
            />
            <input 
                type="text"
                onChange={handleChange}
                value={formData.details}
                name="details"
            />
            <input type="submit" value={buttonLabel} />
           </form>
        </div>
    )
}

export default Form;
