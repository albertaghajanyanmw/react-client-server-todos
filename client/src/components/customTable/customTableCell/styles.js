export default (theme) => ({
  tableCellAction: {
    padding: '6px 16px',
    color: theme.palette.primary.sideBarIconColor,
    opacity: '0.7',
    cursor: 'pointer',
    paddingRight: '18px!important',
    textAlign: 'center',
    '& > svg': {
      marginTop: '4px',
      padding: '6px!important',
      fontSize: '1.2rem'
    },
    '& > svg:hover': {
      background: 'rgba(61, 61, 61, 0.2)',
      borderRadius: '50%'
    },
  },
  tableCellItem: {
    wordBreak: 'break-word'
  }
});