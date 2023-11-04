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

This value represents the type filter visualized by Filter Tab component. Its type should be an enumeration type with possible values of `task-todo`, `task-completed`, `task-cancelled`, `event`, and `note`. Just like search input, this value is not a derivation of other states.

#### Bullet points

This value represents list of bullet points in a daily log. It can be implemented as a list of bullet point type. Bullet point type is an object with property of `id`, `type`, and `value`.

But wouldn't bullet points be filtered by search input and type filter, thus making it a derived value instead of a state? That's a fair argument. However, bullet points _the state_ is different to bullet points _the displayed_. The latter is what displayed to the user, and it is a derived value, not be a state. Why? Because it is dependent from all of the states we listed above.

That's all for the states, for now. We can proceed to the next step.
