# Template for Lullet

This is a template for building Lullet, a simple web-based bullet journal app.

## How to Run

```
npm install
npm run dev
```

## Background

The objective of this project is to build Lullet following the Thinking in React principle.

## Prototype

<img width="846" alt="image" src="https://github.com/deta-aditya/lullet-temp/assets/14936837/747f7a02-cb36-4cbf-96f8-9a4ea015626c">

## Use Cases

1. User can filter the bullet points' text by entering a text via search bar.
2. User can filter the bullet points' type by clicking the filter tab chips.
3. User can type in a new bullet point in a daily log card, be it a new one or existing.
4. User can press \e to change the bullet point into event, \n into note, and \t into task.
5. User can click on a written task to cyclically finish it, cancel it and reset it to todo.
6. User can save a daily log card that has changed.

## Steps

### 1. Break the UI into components

Before we jump into making any of the feature, let's try to identify the components from the prototype.

There is no exact rule in identifying components. To keep things consistent, I advise on figuring out which parts of the UI has multiple "variants". These are the potential components, such as:

- Search Input (green)
- Filter Tab (red)
- Daily Log Card (yellow)
- Bullet Item (blue)

<img width="846" alt="image" src="https://github.com/deta-aditya/lullet-temp/assets/14936837/f0c8cafb-d7dd-4d76-a4ff-54d16e2375fd">

Another way to identify potential components is by its hierarchy. In the prototype, it is noticeable that the whole page can be described as a hierarcy of smaller UI components as follows:

<img width="500" alt="image" src="https://github.com/deta-aditya/lullet-temp/assets/14936837/3967a12e-114d-4639-bea2-da45a13c2b0d">

Now that the components have been identified, let's start building them.

### 2. Build the static version

We'll be using [Chakra UI](https://chakra-ui.com/)https://chakra-ui.com/ to ease up the stying. Check the diff [here](https://github.com/deta-aditya/lullet-temp/compare/main...2-static-version#diff-d274a54187c91ba0f532df2a9e194e27ab50e988f5e4c33f5a7893918320c661) to see the code changes.

#### Folder structure

Making the folder structure to reflect the hierarcy of the UI components can help our future self and other teammates in finding them.

```
src/
└── components/
    ├── PageHeader/
    │   └── components/
    │       ├── FilterTab/
    │       └── SearchInput/
    └── PageBody/
        └── components/
            └── DailyLogCard/
                └── components/
                    └── BulletPoint/
```

#### Constraints

In this step, we focus on building the static version of the UI components. This means, we should not think about states, events, or effects yet. Props are alright, especially if they are fed with static dummy data. The result will only render UI without any behavior, and that is expected.

For example, take a look at the static `DailyLogCard` component:

```js
function DailyLogCard({ dailyLog }) {
  return (
    <Card width="480px">
      <CardHeader display="flex" alignItems="center" gap="16px">
        <Heading fontSize="24px">{dailyLog.dateFormatted}</Heading>
        <Button
          variant="unstyled"
          px="16px"
          py="4px"
          bg="blue.100"
          h="auto"
          borderRadius="8px"
        >
          Save
        </Button>
      </CardHeader>
      <CardBody>
        {dailyLog.bulletPoints.map((bulletPoint) => (
          <BulletPoint key={bulletPoint.id} bulletPoint={bulletPoint} />
        ))}
      </CardBody>
    </Card>
  );
}
```

This component accepts a props of `dailyLog`, which is an object with `dateFormatted` and `bulletPoints`. Those values are either rendered or passed to the next components. Notice how there is no single states or callbacks/events in the code.

Do the same for other components and we're good to go.

#### Dummy data

Since we don't have real data yet, dummy data will do the job for now. You can find them [here](https://github.com/deta-aditya/lullet-temp/blob/2-static-version/src/components/PageBody/constants.js).

### 3. Find the states

In this step, we need to identify which independent values are changing over time. Often, these values are fewer than we initially imagine. This is because most values that we thought are always changing are derived, and thus, not independent. Identifying these is very important, since not everything that changes is always a state.

This step is an analysis stage, thus, there are no code changes.

The candidate for states according to the UI are:

#### Search Input

Not to be confused with Search Input component, this value represents user's search input. It will be a string value, probably with some extra rules. Most importantly, it can't be derived from other states.

#### Type filter

This value represents the type filter visualized by Filter Tab component. Its type should be an enumeration type with possible values of `all`, `task-todo`, `task-completed`, `task-cancelled`, `event`, and `note`. Just like search input, this value is not a derivation of other states.

#### Bullet points

This value represents list of bullet points in a daily log. It can be implemented as a list of bullet point type. Bullet point type is an object with property of `id`, `type`, and `value`.

But wouldn't bullet points be filtered by search input and type filter, thus making it a derived value instead of a state? That's a fair argument. However, bullet points _the state_ is different to bullet points _the displayed_. The latter is what displayed to the user, and it is a derived value, not a state. Why? Because it is dependent of all of the states we listed above.

<img width="500" alt="image" src="https://github.com/deta-aditya/lullet-temp/assets/14936837/11f50d3f-117e-4303-8a64-c97aded70017">

That's all for the states, for now. We can proceed to the next step.

### 4. Identify where the states should live

In this step, we'll analyze the suitable location for each states and write some code. Check [here](https://github.com/deta-aditya/lullet-temp/compare/2-static-version...4-write-states) to see the code changes.

#### Identifying states location

1. **Search Input**. This state is used by Search Input component and Daily Log Card component for filtering the values. The common ancestor of those components are App, which happens to be the root component. That's where the state should live.

2. **Type Filter**. It is used by Filter Tab component and once Daily Log Card component for displaying values of a certain type. Same as above, the common parents for those components are App. Therefore, it should live in App component.

3. **Bullet Points**. This is the state that will be used to represent bullet points inside a Daily Log Card component. Since we'll have multiple Daily Log Card components, we may be able to put this state at Page Body component, its parent. However, bullet points from one daily log is not used by another. It makes more sense to put the state inside Daily Log Card, because it is the only user of the state, for now.

(Illustrate)

#### Writing the code

We'll use React's `useState` function to create a state. It will return a tuple (which is represented by a fixed-sized JavaScript array) whose first value is the state itself, and second value is the state setter function. For now, let's **ignore** the setter function and focus only on the state value.

Here is the `App` component after the states are added.

```js
function App() {
  const [searchQuery] = useState();
  const [typeFilter] = useState();

  return (
    <Flex h="100vh" flexDir="column">
      <PageHeader searchQuery={searchQuery} typeFilter={typeFilter} />
      <PageBody searchQuery={searchQuery} typeFilter={typeFilter} />
    </Flex>
  );
}
```

In addition to adding states, new props should be added to `PageHeader` and `PageBody` so they can use the state's value. Keep adding props as needed until each of the state value reaches the bottom of the component tree where it is needed.

Right now, you might be wondering, why are we ignoring the "prop drilling" and "re-render" issue? These are a slightly more advanced topics that need their own articles. For now, we should focus on making it work without error first, using only Thinking in React principle.

#### Default value

Each states should have their own default value. React's `useState` allows us to pass a default value as the first parameter. In fact, if we don't pass any default value, it will `undefined`. This can cause a lot of headaches in the future, because `undefined` should not be a valid value for our states.

```js
const [searchQuery] = useState(); // default value is `undefined`
const [searchQuery] = useState(""); // default value is ""
```

Preventing invalid value from entering our states is important to reduce bugs and incorrectness of our code. One of the approach to solve it by introducing static typing such as TypeScript. But that's a topic for another day, since it is a whole new language to learn. While using JavaScript forces us to be extra careful, it is still enough to make a working product. Just like what we said before, let's focus on making the whole app works!

The default values for each of states are as follows:

| State          | Default Value           |
| -------------- | ----------------------- |
| `searchInput`  | `""`                    |
| `typeFilter`   | `"all"`                 |
| `bulletPoints` | `dailyLog.bulletPoints` |

For `bulletPoints` state, its default value is given by the props `dailyLog`. Check [the code](https://github.com/deta-aditya/lullet-temp/blob/8a9d3e3162df3bfb64113f98ea5af14951105d9b/src/components/PageBody/components/DailyLogCard/index.jsx#L6) to see how it is written.

### 5. Add inverse data flow

So far, we have only coded the downward flow of our React app. In this step, we will be adding the upward flow. What's the difference between the two flows?

In a React-based web application, data flows in one direction. Downward flow is a term for data that flows from states to components and to its children components. This happens during the render (when displaying things to the browser). Upward flow means the opposite, which is a term for data that flows from components to its parents, and eventually, to states. It is triggered when a component dispatched an event, such as click, keydown, etc.

(Illustrate)

This part involves a lot of coding. As usual, you can check the code changes [here](https://github.com/deta-aditya/lullet-temp/compare/4-write-states...5-handle-events).

#### Component's events

Components may have events. An event is something that may happen inside a component, usually the result of user interaction or its children's event. These events can be handled by the component's user. In React, an event is represented as props that accepts function. To handle it, the component's user must pass a "callback" function to the event props. To differentiate data vs event props, usually event props are prefixed with `on`, such as `onClick`, `onOpen`, etc.

Lullet's components will have their own events that can be handled by their parent component. Most of the time, states are mutated during event handling. If it's still confusing, here is the table of events for each components in Lullet:

| Component     | Events                | Mutates        |
| ------------- | --------------------- | -------------- |
| `PageHeader`  | `onSearchQueryChange` | `searchQuery`  |
|               | `onTypeFilterChange`  | `typeFilter`   |
| `SearchInput` | `onSearchQueryChange` | `searchQuery`  |
| `BulletPoint` | `onTextChange`        | `bulletPoints` |
|               | `onRequestNewPoint`   | `bulletPoints` |
|               | `onFirstTimeFocus`    | `bulletPoints` |
|               | `onTransformToType`   | `bulletPoints` |

Turns out, only `PageHeader`, `SearchInput`, and `BulletPoint` trigger handleable events. Even `onSearchQueryChange` event is not `PageHeader`'s original, as it is forwarded from `SearchInput`.

Each events contains its own logic to mutate states. Some of them are as simple as just changing a value with new one, while others (especially in `DailyLogCard` component) seem pretty complicated. Try reading the code slowly, and you'll realize it's actually not _that_ complicated. All they do is just changing bullet point's object fields or adding a new one.

Also don't forget to add the second tuple value to the states. These second values are setter functions that trigger re-render and changes the content of their respective first tuple values with a new one.

```js
const [searchQuery, setSearchQuery] = useState("");
const [typeFilter, setTypeFilter] = useState("all");
```

And that's it! The web should work alright for now.
