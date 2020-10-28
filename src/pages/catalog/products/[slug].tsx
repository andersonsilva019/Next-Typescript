import { useRouter } from 'next/router'
import { Title } from '~/styles/pages/Home'
import dynamc from 'next/dynamic'
import { useState } from 'react'

const AddToCartModal = dynamc(
  () => import('~/components/AddToCartModal'),
  {loading: () => <p>Carregando...</p>}
 )

export default function Produto(){

  const router = useRouter()

  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

  const handleAddToCart = () => {
    setIsAddToCartModalVisible(true)
  }

  return (
    <div>
      <Title>{router.query.slug}</Title>

      <button onClick={handleAddToCart}>Add to Cart</button>

      {isAddToCartModalVisible && <AddToCartModal/>}
    </div>
  )
}