'use client'
import React, { useEffect, useState } from 'react'
import ProductList from '../_components/ProductList'
import ProductApis from '../_utils/ProductApis'
import {ArrowRight} from 'lucide-react'
function Products() {
	const [productList,setProductList]= useState([])
	useEffect(()=>{
		getLatestProducts_();
	},[])
	const getLatestProducts_= ()=>{
		ProductApis.getLatestProducts().then(  res=>{
 			  setProductList(res?.data.data)
		})
	}
	
	return (
		
		<div className='px-10 md:px-20'>
        <h2 className='font-bold text-[20px] my-3'>Products 
        
          </h2>		
          	<ProductList productList={productList}/>
			</div>
	)
}

export default Products