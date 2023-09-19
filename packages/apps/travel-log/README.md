# travel-log

## Overview
Travel Log - A travel log prototype.

It contains 2 app packages along with several library packages that support 
the apps' implementations.

## App packages

### `apps-travel-log-api-core`
Serves the core back-end API.

### `apps-travel-log-web`
Serves the front-end.

## Tech stack

### Back-end
The `apps-travel-log-api-core` app is written in
[TypeScript](https://www.typescriptlang.org/) using the
[NestJs](https://docs.nestjs.com/) back-end framework.

### Front-end
The `apps-travel-log-web` app is written in
[TypeScript](https://www.typescriptlang.org/) using the
[ReactJs](https://react.dev/) front-end framework.

Building and scaffolding is done with [Vite](https://vitejs.dev/).

The state of the app is managed using [Redux](https://redux.js.org/) but, 
instead of [Redux Toolkit](https://redux-toolkit.js.org/), an internal 
package is used for bootstrapping reducers and handling actions 
(`@js-modules/common-redux-utils-normalized-reducers`).

All front-end async logic is handled with
[Redux Saga](https://redux-saga.js.org/).

The app is built with
[Material UI](https://mui.com/material-ui/getting-started/) components and 
in most cases with [Font Awesome](https://fontawesome.com/icons) icons.

Routing is carried out using [React Router](https://reactrouter.com/en/main).

## Getting started
To start the core version of the travel-log app,
[Material UI SvgIcon](https://mui.com/material-ui/api/svg-icon/)
components should be created for custom icons and both 
app packages should be up and running:

1. Generate icon components:
  ```shell
  pnpm --filter @js-modules/apps-travel-log-web generate-icons
  ```
2. Run NestJs server `apps-travel-log-api-core`:
  ```shell
  pnpm --filter @js-modules/apps-travel-log-api-core dev
  ```
3. Run ReactJs front-end `apps-travel-log-web`:
  ```shell
  pnpm --filter @js-modules/apps-travel-log-web dev
  ```

**Please read the READMEs of both app packages for more information on their 
architecture and bootstraping process.**

## Architecture

### Constants
The `apps-travel-log-common-constants` library package defines and 
exports all constant values, which are relevant for more than one 
`travel-log` package.

One example of constant values which are exported by the
`apps-travel-log-common-constants` library package are all path 
sections for an API endpoint or a front-end route:

- protocol
- host
- port
- path
- subpath

**IMPORTANT**: This means that there must be NO HARD CODED paths or routes 
anywhere in the project's code!

### Back-end
The core version of the travel-log app includes a
[NestJs](https://docs.nestjs.com/) server with a series of modules.

Each backend module consists of a set of API endpoints, each of which is 
handled by a NestJs controller which then forwards each request to the 
corresponding NestJs service, where the relevant business logic takes place.

#### API spec and validation DTOs
API endpoint validation is done using the NestJs `ValidationPipe`, which 
uses DTOs to enforce validation of API request payloads.

The same DTOs are also consumed as parameter types by the service functions 
which the front-end uses to call on the back-end APIs. This is why NestJs 
modules are implemented in a separate package, namely 
`apps-travel-log-api-core-modules`, instead of 
`apps-travel-log-api-core`.

***REMINDER**: No package can be both an app and a library!

#### HBS templates for HTML controller responses
[NestJs](https://docs.nestjs.com/) offers a
[Model-View-Controller (MVC)](https://docs.nestjs.com/techniques/mvc)
solution which uses [Handelbars (HBS)](https://handlebarsjs.com/) as the
template engine.

HTML template files are stored in the 
`packages/apps/travel-log/apps-travel-log-api-core/views` 
directory and are prefixed with the name of the module, e.g.
`<module name><template name>.hbs`

### Front-end

#### Async / data layer
The `common-redux-utils-normalized-reducers` package serves as a strictly 
typed data layer which leverages the power of [Redux](https://redux.js.org/) 
and [Redux Saga](https://redux-saga.js.org/) to encapsulate all interactions 
with the Redux store, as well as **ALL** async logic that needs to happen in 
the front-end.

**IMPORTANT: No React component should contain any async logic meaning that 
no promises should exist in any React component code!** React components 
should **ALWAYS** render synchronously and async logic should only be triggered 
by reducer hooks and happen inside sagas.

The design considerations, guidelines, best practices and structure of 
normalized reducers can be found in the 
`common-redux-utils-normalized-reducers` package's `README`.

#### Reducer categories
Reducers are organized in two categories:

- `appState`: Reducers which contain arbitrary non-repeating metadata 
  necessary for the definition and composition of presentational components, 
  e.g. dialogs' display state, order metadata, payment state/metadata, etc.
- `entityData`: Reducers which contain multiple records of the same type,
  e.g. entries from a database table fetched from an API such as order items

#### Reducer implementation structure
Every reducer is defined alongside a set of artifacts and types which define 
all interactions between React components and the Redux store:

- Reducer path: The relative location of a reducer in the Redux store
- Reducer types: Types of all artifacts defined and/or exported by a reducer
- Initial state: The initial state of a reducer
- Actions types: Type definitions for all actions consumed by the reducer 
  function
- Action creator functions: Creator functions for all actions consumed by 
  the reducer function
- Reducer function: Function with an `action.type` switch which defines 
  handling logic for each action type
- Selectors: [Reselect](https://github.com/reduxjs/reselect) selectors to 
  memoize common reducer queries **made both by React components and Redux 
  Sagas**
- Hooks: Hook functions which leverage selectors to simplify common reducer 
  queries made by React components, as well as encapsulate the dispatch of 
  request actions and tracking of their async status
- Sagas: [Redux Saga](https://redux-saga.js.org/) generator functions which 
  intercept request actions and execute all required business data logic
- Service types: Response and any other types relevant to service functions
- Service functions: Functions responsible to carrying out AJAX API calls

##### Importing DTOs for API payload and response types
Unfortunately, importing some NestJs artifacts into the front-end app 
package causes [Vite](https://vitejs.dev/) build to fail. For this reason, 
API DTO files should be imported directly:

```typescript
import { DtoName } from '@js-modules/apps-nest-package-modules/src/modules/.../file.dto.ts';
```
instead of 
```typescript
import { DtoName } from '@js-modules/apps-nest-package-modules';
```

#### Request action handler hooks
Creating and dispatching request actions is how React components initiate query 
and mutation interactions with the Redux store. Since it is such a common 
process, it should be encapsulated in hook functions that return one of the 
request action handler hook types exported by the
`common-redux-utils-normalized-reducers` library package.

This means that React component should never call on action creators directly. 
Instead, React components should consume reducer hooks that return the 
callback which creates and dispatches the action, the request which is used 
to monitor the action's status, and the reducer props which are updated as a 
result of the request/success/fail actions that get dispatched during the 
process e.g.
```typescript
function useStateMainUpdatePartialReducerMetadata(): UseRequestReducerMetadata<
  StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata'],
  StateMainReducer['metadata'],
  (
    partialReducerMetadata: StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useStateMainRequest(requestId) as Request<
    StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']
  >;
  const reducerMetadata = useStateMainReducerMetadata();

  const callback = useCallback(
    (
      partialReducerMetadata: StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
    ) => {
      const action = createStateMainUpdatePartialReducerMetadataRequestAction(
        partialReducerMetadata,
      );
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch],
  );

  return {
    request,
    reducerMetadata,
    callback,
  };
}
```

#### Material UI
All React components rendered in the `apps-travel-log-web` app 
package are [Material UI](https://mui.com/material-ui/getting-started/) 
components.

Material UI offers a comprehensive suite of customizable and extendable UI 
tools, optimized for the requirements of scalable, high-performance, modern 
web applications.

##### Parameter space
Material UI's component API reduces the practically infinite spectrum of 
presentation and aesthetic parameter values to an optimal set with just enough 
variations to accommodate the requirements of all modern web applications.

##### Theme
Material UI components derive their default presentational and aesthetic state 
from the customizable Material UI
[theme](https://mui.com/material-ui/customization/theming/) passed to the
[`<ThemeProvider />`](https://mui.com/material-ui/customization/theming/#themeprovider)
component. Every other Material UI component can, of course, override or 
further customize the styles defined in the theme.

While Material UI comes with a 'standard' set of
[default theme values](https://mui.com/material-ui/customization/default-theme/),
most teams want to align the look and feel of their app with their design 
principles and corporate identity. It is important, however, that component 
styles be defined in the `theme` whenever possible, hence keeping the styles 
centralized and encapsulated in the theme layer. 

This approach allows for the quick implementation of minor or major design 
updates because once a change is made to the theme, all components will 
reflect it.

Naturally, there are cases where an instance of a component needs a set of 
styles that are different from all other instances. Thankfully, Material UI is 
designed to accommodate this common scenario as well.

##### `sx` prop
Every Material UI component accepts an
[`sx`](https://mui.com/system/getting-started/the-sx-prop/) prop. The `sx` 
prop is a versatile and powerful approach for working with Material UI 
component's styles.

It makes it possible to use TypeScript object syntax to set all possible CSS 
properties of a component and/or its children who match any CSS selectors. 
On top of that, as explained in the Material UI docs, it "lets you work with 
a superset of CSS that packages all of the style functions exposed in 
@mui/system. You can specify any valid CSS using this prop, as well as many 
theme-aware properties that are unique to MUI System."

So CSS properties in the `sx` prop accept special
[theme-aware values](https://mui.com/system/getting-started/the-sx-prop/#theme-aware-properties)
which means that even when a component's styles are defined when the 
component instance is declared, those styles can be set in terms of theme 
parameters. Hence, if the theme is ever updated to change the look and feel 
of the application, individual components' styles will inherit those changes 
as well.

#### Icons
Handling and scaling the consistent rendering of icons across a web application 
is not a trivial task. Icons can be used for a variety of purposes and a 
lack of consistency in their format and the approach towards mounting in 
Material UI components can cause hinder the app scalability.

##### Font Awesome & `<MuiFaIcon />`
[Font Awesome](https://fontawesome.com/icons) is the most popular icon 
library used by web applications. It offers 2000+ free icons and 26000+ 
premium icons. This basically covers all the basic icon needs of any web 
application.

But the value of Font Awesome is not limited to the amount of icons offered 
by the library. More importantly, the advantages of using Font Awesome as 
the icon solution for a web application are related to how conveniently the 
icons can be used and modified in React web applications.

Font Awesome publishes NPM packages with different free and premium subsets 
of their icon collection. These packages export artifacts which can be 
adapted to Material UI  components.

The `<MuiFaIcon />`, exported by the `@js-modules/web-react-components` 
library package is an adapter which accepts an `IconDefinition`, exported 
for evey icon in the FontAwesome library, as well as Font Awesome icon and 
Material UI `<SvgIcon />` properties. Using the `<MuiFaIcon />` adapter 
component enables all the functionality offered by both the Font Awesome and 
Material UI component APIs.

##### `apps-travel-log-web-mui-icons`
The `@js-modules/apps-travel-log-web-mui-icons` library package is 
responsible for encapsulating the automatic generation of Material UI 
`<SvgIcon />`s from a set of `svg` icon files. The package's purpose is to 
expedite and automatize the process of turning new `svg` assets into icons 
which can be consumed in the web app.

Hence, per the package's design, it is a straight forward process to use new 
icon assets as `<SvgIcon />`s in the application:

1. Add the icon's `svg` file to the 
   `/apps/travel-log/apps-travel-log-web-mui-icons/src/assets` 
   directory in kebab case
2. Execute the following command on the terminal:
  ```shell
  pnpm --filter @js-modules/apps-travel-log-web generate-icons
  ```
3. Use the `<SvgIcon />` component, exported as `<icon name in pascal 
   case>Icon`, e.g. `test-logo.svg` would get exported as `TestLogoIcon`
