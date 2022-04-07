const getCellPadding = (cellPaddingRight, cellPaddingLeft) => {
  const newWidth = {paddingRight: cellPaddingRight ?? '24px', paddingLeft: cellPaddingLeft ?? '24px'};
  return newWidth;
}

const getWidth = (fieldWidth) => {
  const newWidth = fieldWidth ? { width: fieldWidth } : {width: '5%'};
  return newWidth;
}

export { getWidth, getCellPadding };
