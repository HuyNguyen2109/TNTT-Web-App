import variables from '../base.module.scss'

export const forgotForm = {
  icon: {
    color: variables.info,
  },
  primaryButton: {
    backgroundColor: 'transparent',
    color: variables.info,
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
