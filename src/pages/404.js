import React from 'react'
import { Card, CardContent, Typography } from 'material-ui'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  height: 100vh;
`

const StyledCard = styled(Card)`
  @media (max-width: 340px) {
    margin: 0 10px;
  }
  max-width: 800px;
  margin: 80px auto;
`

const StyledCardContent = styled(CardContent)`
  padding: 30px;
`

const NotFound = styled(Typography)`
  text-align: center;
`

export default () => (
  <FlexContainer>
    <StyledCard raised>
      <StyledCardContent>
        <NotFound type='display3'>404</NotFound>
        <Typography type='subheading'>Seite konnte nicht gefunden werden</Typography>
      </StyledCardContent>
    </StyledCard>
  </FlexContainer>
)