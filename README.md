# React Reportr

Easiest notification spawner of all time, highly customizable!

## Installation

With NPM:

```sh
npm install @oyvindher/react-reportr
```

or with Yarn:

```sh
yarn add @oyvindher/react-reportr
```

## Usage

```tsx
import {
  NotificationProvider,
  useNotification,
} from "@oyvindher/react-reportr";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <Example />
    </NotificationProvider>
  );
};

const Example: React.FC = () => {
  const { spawn } = useNotification();

  return (
    <div>
      <button
        onClick={() =>
          spawn({
            title: "Hey, I am a notification",
          })
        }
      >
        Spawn notification!
      </button>
    </div>
  );
};
```

Tip: If your app doesn't support hooks yet, you can always use regular Context from the exported `NotificationContext` in `React Reportr`.

## API

### NotificationProvider

On the provider, you can specify a settings props to customize even more to your own needs.

```tsx
<NotificationProvider settings={mysettings}></NotificationProvider>
```

Settings options

| Option              | Type                                   | Default | Required |
| ------------------- | -------------------------------------- | ------- | -------- |
| despawnTime         | `number`                               | 2400    | false    |
| verticalDirection   | `top`, `bottom`                        | top     | false    |
| horizontalDirection | `left`, `right`                        | right   | false    |
| customNotification  | `React.FC<NotificationStackInterface>` | null    | false    |

---

The default design of the notifications might not suit your app. Here's an example of making a custom one!

```tsx
const MyCustomNotifcation: React.FC<NotificationStackInterface> = ({
  id,
  title,
  subtitle,
  variant,
  despawning, // used for animations on unmounting
}) => {
  return (
    <div>
      <h2>{title} 👋</h2>
      <small>{subtitle}</small>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <NotificationProvider
      settings={{
        customNotification: MyCustomNotifcation,
      }}
    >
      {/*....app code*/}
    </NotificationProvider>
  );
};
```

### useNotification

useNotification is a helpful React hook to easily make notifications across your code base. It gives you a way of spawning and despawning notifications. It also gives you the list of spawned notifications, mostly for reference.

```tsx
const { spawn, despawn, notifications } = useNotification();
```

#### spawn

| Option   | Type                                           | Default   | Required |
| -------- | ---------------------------------------------- | --------- | -------- |
| id       | `string`                                       | 2400      | false    |
| title    | `string`                                       |           | true     |
| subtitle | `string`                                       | undefined | false    |
| variant  | `info`, `success`, `warning`, `danger`, `info` | info      | false    |

#### despawn

| Option | Type     | Default   | Required |
| ------ | -------- | --------- | -------- |
| id     | `string` | undefined | true     |
