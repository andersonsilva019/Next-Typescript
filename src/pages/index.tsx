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
      </section>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended')
  const recammendedProducts = await response.json()

  return {
    props: {
      recammendedProducts
    }
  }
}