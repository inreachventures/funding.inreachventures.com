export default Array.from(
  Array.from(new Array(101).keys()).map((i) => ({
    value: i.toString(),
    label: i.toString()
  }))
).concat({label: '101+', value: '101+'});
