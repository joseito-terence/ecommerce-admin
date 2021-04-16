const dateToString = date => {
  return date.toDate().toString().slice(0, 24);
}

export default dateToString;