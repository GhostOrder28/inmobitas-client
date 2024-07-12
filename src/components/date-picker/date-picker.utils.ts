
const handleDateSelection = (
  currentDate: Date | undefined, 
  newDate: Date | undefined,
  setter: (date: Date) => void
) => {
  if (!newDate) return;
  const date = new Date(newDate);
  if (currentDate) {
    date.setHours(currentDate.getHours());
    date.setMinutes(currentDate.getMinutes());
  }
  setter(date)
}

export {
  handleDateSelection
}
