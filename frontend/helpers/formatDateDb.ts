function formatDateDb(dateString: string) {
  const date = new Date(dateString);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  //@ts-ignore
  return date.toLocaleDateString("en-US", options);
}

export default formatDateDb;
