import styled from 'styled-components'

type LoaderComponentStyledProps = {
  isFullPage?: boolean
}

export const LoaderComponentStyled = styled.div<LoaderComponentStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  font-weight: 300;
  height: 42px;
  color: var(--black);
  height: ${({ isFullPage }) => (isFullPage ? '100vh' : 'auto')};
  background-color: ${({ isFullPage }) =>
    isFullPage ? 'rgba(0,0,0,0.5)' : ''};
`
