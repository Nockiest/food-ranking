'use client'

type BoundaryProps ={
    error: Error,
    reset: () => {}
}
const ErrorBoundary: React.FC<BoundaryProps> = ({error, reset}) => {
  return (
    <div>Ypu encountered an error {error.message}</div>
  )
}

export default ErrorBoundary