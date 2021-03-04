import variables from '../base.module.scss'

export const forgotForm = {
  icon: {
    color: variables.info,
  },
  primaryButton: {
    backgroundColor: variables.primary,
    color: '#fff',
    boxShadow: 'none',
  },
  primaryButtonDisabled: {
    backgroundColor: 'transparent',
    color: 'grey',
    boxShadow: 'none',
  },
  errorMessage: {
    color: 'red',
    fontStyle: 'italic'
  }
}

export const bioForm = {
  icon: {
    color: variables.info
  },
  closeButton: {
    backgroundColor: variables.primary,
    color: '#fff',
  },
  container: {
    maxHeight: '800px',
    margin: 'auto'
  }
}
