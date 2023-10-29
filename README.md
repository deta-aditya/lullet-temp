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
5. User can click on a written task to cyclically finish it, cancel it and reset it to to do.
6. User can save an daily log card that has changed.

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

#### Folder Structure
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

#### Dummy Data

Since we don't have real data yet, dummy data will do the job for now. You can find them [here](https://github.com/deta-aditya/lullet-temp/blob/2-static-version/src/components/PageBody/constants.js).
