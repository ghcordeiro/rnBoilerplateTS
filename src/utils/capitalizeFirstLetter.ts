export default (string: string): string =>
  string
    ? string.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      })
    : string;
