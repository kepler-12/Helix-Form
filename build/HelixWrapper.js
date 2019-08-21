"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelixForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../config");

var _compileHTML = _interopRequireDefault(require("../compileHTML"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var HelixForm =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(HelixForm, _Component);

    // Specify the types of input elements this wrapper will look for in its children
    function HelixForm(props) {
      var _this;

      _classCallCheck(this, HelixForm);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(HelixForm).call(this, props)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleSubmit",
        function() {
          var data = {}; // Iterate through each input reference to retrieve user input values and add to data object

          _this.inputs.forEach(function(input) {
            if (input.current.type === "checkbox") {
              data[input.current.attributes.name.value] = input.current.checked;
            } else if (input.current.type === "radio") {
              if (input.current.checked) {
                data[input.current.attributes.name.value] = input.current.id;
              }
            } else {
              data[input.current.attributes.name.value] = input.current.value;
            }
          }); // run the array of notifications if notification not included run only default.

          var notifications = _this.props.notification
            ? _this.props.notification
            : ["default"];
          var promises = [];
          notifications.forEach(function(notificationKey) {
            var notification =
              _config.configuration.notifications[notificationKey];
            var payload = _config.configuration.payload;
            payload.method = _this.props.actionTypes
              ? _this.props.actionTypes
              : payload.method;
            payload.formData = data;

            if (_this.props.actionTypes.includes("email")) {
              payload.email.to = notification.to;
              payload.email.subject = notification.subject;
              payload.email.template = (0, _compileHTML.default)({
                notification: notification,
                data: data
              });
            } // actiontype store

            if (_this.props.actionTypes.includes("store")) {
              // Create payload for gql server
              var gqlPayload = {
                query: print(addFormMutation),
                headers: {
                  "content-type": "application/json"
                },
                variables: {
                  name: notification.formName,
                  date: Date().toLocaleString(),
                  data: JSON.stringify(payload.formData)
                }
              };
              payload.store = gqlPayload; // Test post direct to graphql server (Working)
              // https://stackoverflow.com/questions/51630137/post-mutation-to-graphql-with-axios
              // axios.post('http://stella-graphql-server.herokuapp.com/graphql', gqlPayload)
              //   .then(res => console.log("graphql server response", res.data))
              //   .catch(err => console.log(err))
            }

            console.log("payload created:", payload); // Post request to gateway specified by config file

            promises.push(
              _axios.default.post(_config.configuration.gateway.url, payload)
            ); // .then(res => {
            //   this.setState({ response: this.props.response || "" });
            //   console.log("form submit response", res.data);
            // })
            // .catch(err => console.log(err));
          });

          _axios.default
            .all(promises)
            .then(function(results) {
              _this.setState({
                response: _this.props.response || ""
              });

              console.log("appForm responses", results);
              return results;
            })
            .catch(function(error) {
              console.log(error);
              return error;
            });
        }
      );

      _this.inputs = [];
      _this.state = {
        response: "",
        form: ""
      };
      return _this;
    }

    _createClass(HelixForm, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.setState({
            form: this.addReactRef(this)
          });
        }
      },
      {
        key: "addReactRef",
        // Recursively add reference to each input type element so user input value can be recorded
        value: function addReactRef(element) {
          var _this2 = this;

          var inputTypes = ["input", "textarea"];

          if (element.props) {
            if (element.props.children !== undefined) {
              var newChildren = null;

              if (Array.isArray(element.props.children)) {
                newChildren = element.props.children.map(function(child, i) {
                  return _this2.addReactRef(child);
                });
              } else {
                newChildren = this.addReactRef(element.props.children);
              }

              if (_react.default.isValidElement(element)) {
                // Special case for the submit button, add onclick method
                if (element.props.type === "submit") {
                  return _react.default.cloneElement(
                    element,
                    { ...element.props, onClick: this.handleSubmit },
                    newChildren
                  );
                }

                return _react.default.cloneElement(
                  element,
                  element.props,
                  newChildren
                );
              } else {
                // Special case for the root element, cannot clone itself
                return newChildren;
              }
            }
          } // Base case when input types are found

          if (
            inputTypes.includes(element.type) &&
            element.props.type !== "submit"
          ) {
            // Create a new input reference
            this.inputs.push(_react.default.createRef()); // Add reference to the props of input type elements

            return _react.default.cloneElement(element, {
              ref: this.inputs[this.inputs.length - 1]
            });
          } else {
            // return original element if not an input type
            return element;
          }
        }
      },
      {
        key: "render",
        value: function render() {
          return _react.default.createElement(
            "div",
            null,
            this.state.form,
            this.state.response
          );
        }
      }
    ]);

    return HelixForm;
  })(_react.Component);

exports.HelixForm = HelixForm;
