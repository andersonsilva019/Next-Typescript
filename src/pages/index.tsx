import { Title } from "../styles/pages/Home"
import { GetServerSideProps } from "next"

interface IProduct {
  id: string;
  title: string
}

interface IHomeProps {
  recammendedProducts: IProduct[]
}

export default function Home({ recammendedProducts }: IHomeProps) {

  const handleSum = async () => {

    const { sum } = (await import('../lib/math')).default

    alert(sum(3,3))
  }

  return (
    <div>
      <section>
        <Title>Product</Title>

        <ul>
          {recammendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
        <button onClick={handleSum} >Soma</button>
      </section>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`)
  const recammendedProducts = await response.json()

  return {
    props: {
      recammendedProducts
    }
  }
}