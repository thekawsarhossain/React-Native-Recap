import React from 'react'
import { useSelector } from 'react-redux'
import { selectHeadphones } from '../redux/products/selectors'
import { NavigationProps } from '../Types/NavigationTypes'
import { ProductList } from '../components/ProductList'

export const HeadphonesScreen: React.FC<NavigationProps<'Headphones'>> = ({ navigation }) => {

    const headphones = useSelector(selectHeadphones)

    return (
        <ProductList title='headphones' products={headphones} />
    )
}
