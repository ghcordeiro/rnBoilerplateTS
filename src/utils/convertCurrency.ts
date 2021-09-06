import { getLanguageByDevice } from '@translate';

export default (value?: number, prefix?: string, abbreviate = false) => {
  let label = '';
  if (abbreviate) {
    if (value) {
      if (value > 1000000000) {
        value /= 1000000000;
        label = 'bi';
      } else if (value > 1000000) {
        value /= 1000000;
        label = 'mi';
      } else if (value > 1000) {
        value /= 1000;
        label = 'mil';
      }
      return `${prefix} ${value
        .toFixed(2)
        .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
        .replace('.', ',')} ${label}`;
    }
    return `${prefix} 0`;
  }
  return new Intl.NumberFormat(getLanguageByDevice().replace('_', '-'), {
    style: 'currency',
    currency: 'BRL'
  })
    .format(Number(value))
    .replace(`${prefix}`, `${prefix} `);
};
