export default function randomizeNotification(): any {
  const selections = [
    {
      title: "Info",
      subtitle: "This is some more info",
      variant: "info",
    },
    {
      title: "Success",
      subtitle: "This is some more info",
      variant: "success",
    },
    {
      title: "Warning",
      subtitle: "This is some more info",
      variant: "warning",
    },
    {
      title: "Danger",
      subtitle: "This is some more info",
      variant: "danger",
    },
  ];

  const randomIndex = Math.floor(Math.random() * selections.length);

  return selections[randomIndex];
}
