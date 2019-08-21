# Helix Appform Wrapper

#### Wrapper Package For Form Communication with Nebula System.

### Installation

```
npm install github:kepler-12/Helix-Form#versiontag
```

current version: 1.0.15

```
npm install github:kepler-12/Helix-Form#1.0.15
```

### Configuration

prior to using the wrapper configuration is needed in the application. This can be done in the root of the application or in the template where the wrapper is being used.

#### Configuration Functions

| Function Name   | Properties                       | Purpose                                                   |
| --------------- | -------------------------------- | --------------------------------------------------------- |
| setGateway      | (url: string)                    | Sets the url of the gateway for the wrapper               |
| setNotification | (type: string, settings: object) | sets the email settings for a notification type of _type_ |
| setFromEmail    | {email: string}                  | sets the from email account for all emails sent out.      |

#### Notification Object

the Notification object for the setNotification function must follow this example with the following keys and values:

```
{
  subject: "Underwood's Form Submit",
  to: "info@underwoodjewelers.com",
  formName: "Underwood's form"
  template: "{the folder name the index.js file for the template being used}"
}
```

currently the to field is NOT dynamic however is planned in a future build.

### Email Template Requirements

emailTemplates folder must be in a `src/` directory in the same level as `node_modules/` folder. (plans to use `__dirname` in the future but currently not working) to ensure webpack and babel load the files and folders correctly the folder must have the following:

- each template in its own folder with a corresponding index.js file to load all email parts.
- a root index.js file in the emailTemplates directory that exports a require of each template to ensure webpack includes the template correctly.
- App.js or index.js of the react website must import the index.js. It does not need to be used just imported so webpack loads in the files.

### Examples

#### File Tree Example

```
+ src/
  + emailTemplates/
    + templateName/
      | entries.js
      | footer.js
      | head.js
      | index.js
      | title.js
    + templateName2/
      | body.js
      | header.js
      | index.js
    | index.js
```

#### emailTemplates/index.js Example

```
module.exports = {
  templateName = require('./templateName'),
  templateName2 = require('./templateName2')
}
```

#### template/index.js Example

```
const head = require('./head')
const title = require('./title')
const entries = require('./entries')
const footer = require('./footer')
module.exports = ({notification, data}) => {
  return head(notification.logo) + title(notification) + entries({data}) + footer()
}
```

#### Configuration Exmple

src/index.js

```
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { setGateway, setNotification } from "appform-wrapper";
import { emailTemplates } from "./emailTemplates";

setGateway("https://helix-gateway.herokuapp.com/stella");
setNotification("test", {
  subject: "Test from nondefault notification",
  to: "cliff@careerdevs.com",
  formName: "Contact Us",
  template: "contactUs"
});

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
```

#### Wrapper Example

```
import React, {Component} from 'react';
import { HelixForm } from 'appform-wrapper'

class FormPage extends Component {
  render() {
    return (
      <div>
        <HelixForm
          notification={['test']}
          actionTypes={['email']}
          response={
            <p style={{ display: "block", textAlign: "center" }}>
              Form Submitted
            </p>
          }
        >
          <div key="1">
            <div key="name">
              <p key="uniquekey">form name</p>
              <input key="first" name="first" placeholder="first name" />
              <input key="last" name="last" placeholder="last name" />
              <button key="submit" type="submit">
                Submit
              </button>
            </div>
          </div>
        </HelixForm>
      </div>
    )
  }
}
```

#### Notes

System may warn you about an unexpected token. This can be ignored and is planned to be removed. This is due to the package being developed without babel translation and then being translated prior to push. index.js loads from the babel compiled file.
