export default function phoneNumber(value: string) {
  if (!value) {
    return '';
  }

  value = value.replace(/[^0-9]/g, '');

  const result = [];
  let restNumber = '';

  // xxx-yyyy-zzzz 또는 xxx-yyy-zzzz
  result.push(value.substr(0, 3));
  restNumber = value.substring(3);
  // }

  if (restNumber.length === 7) {
    // 7자리만 남았을 때는 xxx-yyyy
    result.push(restNumber.substring(0, 3));
    result.push(restNumber.substring(3));
  } else {
    result.push(restNumber.substring(0, 4));
    result.push(restNumber.substring(4));
  }

  return result.filter((val) => val).join('-');
}
