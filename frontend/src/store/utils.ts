export type ActionTracker = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  errorMessage: string
  successMessage: string
}

export const initialActionTracker: ActionTracker = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
  successMessage: '',
}
