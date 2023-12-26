import styled from 'styled-components'
import { Size } from './index'

type ContainerStyledProps = {
  size: Size
  padding: number
  backgroundColor: string
}

export const ContainerStyled = styled.div<ContainerStyledProps>`
  padding: 0px ${(p) => p.padding}px;
  background: ${(props) => props.backgroundColor};
  .cont {
    max-width: ${(p) => {
      switch (p.size) {
        case 'xs':
          return '1096px'
        case 'mdsm':
          return '1209px'
        case 'sm':
          return '1320px'
        case 'md':
          return '1440px'
        case 'md-2':
          return '1550px'
        case 'lg':
          return '1780px'
        case 'xl':
          return '1900px'

        default:
          return ''
      }
    }};
    margin-right: auto;
    margin-left: auto;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.ipadpro - 1}px) {
    padding: 0px 16px;
  }
`
