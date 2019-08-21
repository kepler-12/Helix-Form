import React, { Component } from "react";
import axios from "axios";
import { configuration } from "../config";
import compileHTML from "../compileHTML";

export class HelixForm extends Component {
  // Specify the types of input elements this wrapper will look for in its children

  constructor(props) {
    super(props);
    this.inputs = [];
    this.state = {
      response: "",
      form: ""
    };
  }
  componentDidMount() {
    this.setState({
      form: this.addReactRef(this)
    });
  }

  // eslint-disable-next-line
  handleSubmit = () => {
    const data = {};

    // Iterate through each input reference to retrieve user input values and add to data object
    this.inputs.forEach(input => {
      if (input.current.type === "checkbox") {
        data[input.current.attributes.name.value] = input.current.checked;
      } else if (input.current.type === "radio") {
        if (input.current.checked) {
          data[input.current.attributes.name.value] = input.current.id;
        }
      } else {
        data[input.current.attributes.name.value] = input.current.value;
      }
    });

    // run the array of notifications if notification not included run only default.

    const notifications = this.props.notification
      ? this.props.notification
      : ["default"];

    const promises = [];

    notifications.forEach(notificationKey => {
      const notification = configuration.notifications[notificationKey];
      const payload = configuration.payload;
      payload.method = this.props.actionTypes
        ? this.props.actionTypes
        : payload.method;
      payload.formData = data;
      if (this.props.actionTypes.includes("email")) {
        payload.email.to = notification.to;
        payload.email.subject = notification.subject;
        payload.email.template = compileHTML({ notification, data });
      }

      // actiontype store
      if (this.props.actionTypes.includes("store")) {
        // Create payload for gql server
        const gqlPayload = {
          query: print(addFormMutation),
          headers: { "content-type": "application/json" },
          variables: {
            name: notification.formName,
            date: Date().toLocaleString(),
            data: JSON.stringify(payload.formData)
          }
        };
        payload.store = gqlPayload;

        // Test post direct to graphql server (Working)
        // https://stackoverflow.com/questions/51630137/post-mutation-to-graphql-with-axios
        // axios.post('http://stella-graphql-server.herokuapp.com/graphql', gqlPayload)
        //   .then(res => console.log("graphql server response", res.data))
        //   .catch(err => console.log(err))
      }

      console.log("payload created:", payload);

      // Post request to gateway specified by config file
      promises.push(axios.post(configuration.gateway.url, payload));
      // .then(res => {
      //   this.setState({ response: this.props.response || "" });
      //   console.log("form submit response", res.data);
      // })
      // .catch(err => console.log(err));
    });
    axios
      .all(promises)
      .then(results => {
        this.setState({ response: this.props.response || "" });
        console.log("appForm responses", results);
        return results;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };

  // Recursively add reference to each input type element so user input value can be recorded
  addReactRef(element) {
    const inputTypes = ["input", "textarea"];
    if (element.props) {
      if (element.props.children !== undefined) {
        var newChildren = null;
        if (Array.isArray(element.props.children)) {
          newChildren = element.props.children.map((child, i) => {
            return this.addReactRef(child);
          });
        } else {
          newChildren = this.addReactRef(element.props.children);
        }

        if (React.isValidElement(element)) {
          // Special case for the submit button, add onclick method
          if (element.props.type === "submit") {
            return React.cloneElement(
              element,
              { ...element.props, onClick: this.handleSubmit },
              newChildren
            );
          }

          return React.cloneElement(element, element.props, newChildren);
        } else {
          // Special case for the root element, cannot clone itself
          return newChildren;
        }
      }
    }

    // Base case when input types are found
    if (inputTypes.includes(element.type) && element.props.type !== "submit") {
      // Create a new input reference
      this.inputs.push(React.createRef());

      // Add reference to the props of input type elements
      return React.cloneElement(element, {
        ref: this.inputs[this.inputs.length - 1]
      });
    } else {
      // return original element if not an input type
      return element;
    }
  }

  render() {
    return (
      <div>
        {this.state.form}
        {this.state.response}
      </div>
    );
  }
}
