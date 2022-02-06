import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from '@pancakeswap/uikit'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  surfix?: string
  bold?: boolean
  color?: string
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '40px',
  lineHeight = '1',
  prefix = '',
  surfix = '',
  bold = true,
  color = 'text',
}) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <Text bold={bold} fontSize={fontSize} style={{ lineHeight }} color={color}>
      {prefix}
      {countUp}
      {surfix}
    </Text>
  )
}

export default CardValue