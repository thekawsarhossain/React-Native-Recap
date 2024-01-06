import React from 'react'
import { useSelector } from 'react-redux'
import { selectSpeakers } from '../redux/products/selectors'
import { ProductList } from '../components/ProductList'

export const SpeakersScreen = () => {
  const speakers = useSelector(selectSpeakers)

  return (
    <ProductList title='speakers' products={speakers} />
  )
}
