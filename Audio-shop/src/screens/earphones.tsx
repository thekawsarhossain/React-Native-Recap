import React from 'react'
import { useSelector } from 'react-redux'
import { selectEarphones } from '../redux/products/selectors'
import { NavigationProps } from '../Types/NavigationTypes'
import { ProductList } from '../components/ProductList'

export const EarphonesScreen: React.FC<NavigationProps<'Earphones'>> = ({ navigation }) => {

    const earphones = useSelector(selectEarphones)

    return (
        <ProductList title='earphones' products={earphones} />
    )
}
