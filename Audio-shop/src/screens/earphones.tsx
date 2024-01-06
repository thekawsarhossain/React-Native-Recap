import React from 'react'
import { useSelector } from 'react-redux'
import { selectEarphones } from '../redux/products/selectors'
import { ProductList } from '../components/CategoryProductList'

export const EarphonesScreen = () => {

    const earphones = useSelector(selectEarphones)

    return (
        <ProductList title='earphones' products={earphones} />
    )
}
