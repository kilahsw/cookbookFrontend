import React from "react";

const Form = (props) => {
    //STATE FOR THE FORM
    const [formData, setFormData] = React.useState(props.author);

    //FUNCTIONS
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent Form from Refreshing
        props.handleSubmit(formData); // Submit to Parents desired function -- will create and update dogs
        props.history.push("/api/authors"); //Push back to display page
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                firsName="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                lastName="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            <input
                type="text"
                title="title"
                value={formData.title}
                onChange={handleChange}
            />
            <input type="submit" value={props.label} />
        </form>
    );

}

export default Form
