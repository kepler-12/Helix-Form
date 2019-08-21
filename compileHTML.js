module.exports = ({ notification, data }) => {
  const email = require(`../../src/emailTemplates/${notification.template}`);
  // const email = emails[notification.email]
  const html = email({ notification, data });
  return html;
};
