import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Text } from 'rebass'

import { Currency, Percent, Price } from '@uniswap/sdk'

import { ONE_BIPS } from '../../constants'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'

import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const theme = useContext(ThemeContext)
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1} style={{ marginBottom: '6px' }}>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </Text>
          <TYPE.black>{price?.toSignificant(6) ?? '-'}</TYPE.black>
        </AutoColumn>
        <AutoColumn justify="center">
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1} style={{ marginBottom: '6px' }}>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </Text>
          <TYPE.black>{price?.invert()?.toSignificant(6) ?? '-'}</TYPE.black>
        </AutoColumn>
        <AutoColumn justify="center">
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1} style={{ marginBottom: '6px' }}>
            Share of Pool
          </Text>
          <TYPE.black>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TYPE.black>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}
