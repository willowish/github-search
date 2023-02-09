import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  button: defineStyle({
    background: '#f2f2f2',
    marginBottom: '3px'
  }),
})

export const accordionTheme = defineMultiStyleConfig({ baseStyle })
