module.exports = {
  brand: 'Supreme',
  baseUrl: 'http://localhost:9873',
  packTypes: [
    { value: '1', label: 'Box' },
    { value: '2', label: 'Pouch' },
    { value: '3', label: 'Packet' },
    { value: '4', label: 'Other' },
  ],
  packTypesMap: {
    1: 'Box',
    2: 'Pouch',
    3: 'Packet',
    4: 'Other',
  },
  tablePageSize: 20,
  emailRegularExpression: /\S+@\S+\.\S+/,
};
