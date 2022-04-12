# Lifestyle UI cristi

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development for core tenant ( _main )

```
yarn dev
```

### Compiles and hot-reloads for development for tenant

name of the tenant is the name of the folder from src/tenants
```
yarn dev --tenant={folderName}
```


### Compiles and minifies for production for all the tenants

```
yarn build
```

### Compiles and minifies for production for one tenant

```
yarn build:{folderName}
```

### Run your unit tests

```
yarn run test:unit
```

### Run your end-to-end tests

```
yarn run test:e2e
```

### Lints and fixes files

```
yarn run lint
```

### Sync i18next translation files ( base language is EN )

```
node ./tasks/i18NextSync.js -sync
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Environment file

- Copy .env.example and rename to .env
- Ask for the VUE_APP_PROXY_API_KEY key

### Add new tenant

- Copy folder: /src/tenants/{tenant_name}

- Add job on package.json

```
dev:{tenant_name}": "vue-cli-service serve src/tenants/{tenant_name}/main.js --tenant={tenant_name}
build:{tenant_name}": "vue-cli-service build src/tenants/{tenant_name}/main.js --dest=dist/{tenant_name} --tenant={tenant_name}
```

- Update URL to assets

- Update assets

- Update logo

- Update text on the landing page: /src/tenants/{tenant_name}/locales

- Update all fonts /src/tenants/{tenant_name}/public/fonts.css

- Update the color schema: /src/tenants/{tenant_name}/config.js

- Check all pages

- Devops:
  - generate build and check

  - add {tenant_name} on the /src/tenants/{tenant_name}/public/index.html

  - add url in helm.test.values.yaml and helm.uat.values.yaml

  ```
  {tenant_name}.ui.test.lifestyle.shipyardlabs.io
  {tenant_name}.ui.uat.lifestylesolutionsteam.com
  ```
- After deploy tell BE team to create new domain for new tenant.

### More branding configuration

See [Document Branding](https://gitlab.com/lifestyle-product/lifestyle-ui/-/wikis/home).


### Developing methodology - inside Lifestyle/Hotels

#### Develop
1. Before task
- create checklist ( as detail as possible ). Raise flag if the new estimation will overcome the origin estimation
2. During task
- end of day
  - update the checklist
  - push all the modifications on git
  - add hours on timeline
- Raise flag if the effort will overcome the origin estimation
3. End task
- self review
- check all items from the checklist
4. After review
- Create an commit for each review
#### Estimations
- Add on the last task of the story that have an estimation longer than 2 days, between 2-4 hours only for validate all the ACs

#### Create API service

create new file ./src/core/api/apiService<SERVICE_NAME>.js (e.g: apiServiceEvents.js)

```
import { createApiService } from '@core/api/_utils';

let api = {
  getCancelRequest: fetch.getCancelRequest,
  <SERVICE_NAME>: {
    service methods ( e.g: get( params ) => { ... } )
  }
}

export default async function ( config ) {
    return createApiService( config, api );
}
```

When exporting service you can configure which type of data to return:
1. 'mockup' - will return only mock data
2. 'mockupAndApi' - will get mock data and overwrite with real values
3. 'apiAndMockup' - will get real values and overwrite with mock data
4. '' - default: will return real values

When handling errors make sure to add all new error codes with a proper naming in `src/core/utils/constants/api.js`, under the `ERROR_CODES` key in order to have all standard errors (codes + naming) in a centralized place.

### REVIEW CHECKLIST

#### Styling

1. Use existing functions (eg font-size) instead of mixins.
2. Implement mobile version after desktop version.
3. Don't use vuetify classes if you have a custom class for an element.
4. General layout should be in the HTML part, not in the CSS part.
5. Components inside core should be without scope and inside views should be with scope.
6. Use BEM (exception: more than two levels of nesting. In this case you don't apply the parents classes anymore).
7. Use nesting for the styling part like the html.

#### Vue

1. Internationalization.
2. Component name.
3. Css class should match the name of the component.
4. $watch should also have $unwatch.
5. Use compute if you have more than 2 conditions.
6. Use mixins to extract logic from big components (eg form mixins for handling data).
7.

#### Naming convention

1. Mixins should be have as suffix 'mixin'.
2. Subcomponents inside component folder should not be prefixed with the component name and the css class should contain the component name if the css is not scoped.
3. SVGs id's should be named as following: `gst-svg—<svg_name>`.
4. SVGs id's that belong to a tenant should be named as following: `gst-svg—<tenant_name>—<file_name>`.
5. In the Vue template on each element classes we can have one of the following
  - "[{vuetify classes}]" - any vuetify classes - first all classe related to { display position }
  - "{component_class} [vuetify classes] - vuetify class only for position (display, position) and all the other will be declared inside the {component_class} style. This way we will get an picture about how component looks without scrolling to the CSS style

#### Tenant
1. The only change is in charts ( uat, development, production ) and tenant folder

### Email Template
In order to keep the changes of the email template / test data tracked we added them into **email** folder
- Every change made to the email template in sendgrid (https://mc.sendgrid.com/) should be followed by a pull request with the template.html/testData.json synced