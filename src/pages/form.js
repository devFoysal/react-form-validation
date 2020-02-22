import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(
    value => value.length > 0 && (valid = false)
  );

  Object.values(rest).forEach(value => value === null && (valid = false));

  return valid;
};

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      lname: null,
      email: null,
      password: null,
      formErrors: {
        fname: "",
        lname: "",
        email: "",
        password: ""
      }
    };
  }
  handelSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        ---Submit form ----
        First name: ${this.state.fname}
        Last name: ${this.state.lname}
        Email name: ${this.state.email}
        Password name: ${this.state.password}
      `);
    } else {
      console.error("Form Invalid - Display Error Message");
    }
  };
  handelChange = e => {
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "fname":
        formErrors.fname =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      case "lname":
        formErrors.lname =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;

      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Form</h2>
          </div>
          <div className="col-md-12">
            <Form onSubmit={this.handelSubmit} noValidate>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={this.handelChange}
                  type="text"
                  name="fname"
                  placeholder="First name"
                  className={formErrors.fname.length > 0 && "is-invalid"}
                />
                {formErrors.fname.length > 0 && (
                  <span className="invalid-feedback">{formErrors.fname}</span>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={this.handelChange}
                  type="text"
                  name="lname"
                  placeholder="Last name"
                  className={formErrors.lname.length > 0 && "is-invalid"}
                />
                {formErrors.lname.length > 0 && (
                  <span className="invalid-feedback">{formErrors.lname}</span>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={this.handelChange}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className={formErrors.email.length > 0 && "is-invalid"}
                />
                {formErrors.email.length > 0 && (
                  <span className="invalid-feedback">{formErrors.email}</span>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handelChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={formErrors.password.length > 0 && "is-invalid"}
                />
                {formErrors.password.length > 0 && (
                  <span className="invalid-feedback">
                    {formErrors.password}
                  </span>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
