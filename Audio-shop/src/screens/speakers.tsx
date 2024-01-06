import React from 'react'
import { useSelector } from 'react-redux'
import { selectSpeakers } from '../redux/products/selectors'
import { NavigationProps } from '../Types/NavigationTypes'
import { ProductList } from '../components/ProductList'


export const SpeakersScreen: React.FC<NavigationProps<'Speakers'>> = ({ navigation }) => {
  const speakers = useSelector(selectSpeakers)

  return (
    <ProductList title='speakers' products={speakers} />
  )
}
