import React from 'react'
import { useSelector } from 'react-redux'
import { selectHeadphones } from '../redux/products/selectors'
import { ProductList } from '../components/ProductList'

export const HeadphonesScreen = () => {

    const headphones = useSelector(selectHeadphones)

    return (
        <ProductList title='headphones' products={headphones} />
    )
}
