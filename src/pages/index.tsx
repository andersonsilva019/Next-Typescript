import { Title } from "~/styles/pages/Home"
import Link from 'next/link'
import { GetServerSideProps } from "next"
import SEO from "~/components/SEO"
import { client } from "~/lib/prismic"
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents'

interface IHomeProps {
  recammendedProducts: Document[]
}

export default function Home({ recammendedProducts }: IHomeProps) {
  return (
    <div>

      <SEO
        title="DevCommerce, o seu melhor e-commerce"
        shouldExcludeTitleSuffix
        image="cart.png"
      />
      <section>
        <Title>Product</Title>

        <ul>
          {recammendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recammendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])
  return {
    props: {
      recammendedProducts: recammendedProducts.results,
    }
  }
}