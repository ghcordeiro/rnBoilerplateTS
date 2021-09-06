export default (name: string): string => {
  // console.log(name)
  if (name && name.length > 25) {
    let firstName = '';
    let secondName = '';
    let lastName = '';

    if (name && name.length > 0) {
      const nameTokens = name.match(/[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g) || [];
      if (nameTokens.length > 3) {
        firstName = nameTokens.slice(0, 2).join(' ');
      } else {
        firstName = nameTokens.slice(0, 1).join(' ');
      }

      if (nameTokens.length > 3) {
        lastName = nameTokens[nameTokens.length - 1];
        secondName = nameTokens.slice(-1).join(' ');
      } else {
        lastName = nameTokens[nameTokens.length - 1];
        secondName = '';
      }
    }
    // console.log(`${firstName} ${lastName}`)
    return `${firstName} ${lastName}`;
  }
  return name;
};
