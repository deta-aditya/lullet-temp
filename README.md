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

Another easy way to identify potential components is by its hierarchy. In the prototype, it is noticeable that the whole page is divided between header (yellow) and body (red), which are another great potential components.

<img width="846" alt="image" src="https://github.com/deta-aditya/lullet-temp/assets/14936837/a0f6923f-37c2-46de-9632-3d8d1f855cd1">

Now that we have identify the components, let's start building them.

### 2. Build the static version


