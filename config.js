export const configuration = {
  inputTypes: ["input", "textarea"],
  gateway: {
    url: "https://stella-gateway.herokuapp.com/stella"
  },
  payload: {
    formData: {},
    service: "appForm",
    method: "email",
    email: {
      from: "Stella@kepler12.com"
    }
  },
  notifications: {
    default: {
      subject: "default Notification from kepler12",
      to: "dev@ttgmxd.com",
      formName: "Underwood's form",
      template: "formResponse"
    }
  },
  emailTemplateURI: `./emailTemplates`
};

export const setGateway = url => {
  configuration.gateway.url = url;
};

export const setNotification = (type, settings) => {
  configuration.notifications[type] = settings;
};

export const setFromEmail = email => {
  configuration.email.from = email;
};
