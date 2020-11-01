import { useRouter } from 'next/router'
import { Title } from '~/styles/pages/Home'
import { GetStaticProps, GetStaticPaths } from 'next'
import PrismicDOM from 'prismic-dom'
import Prismic from 'prismic-javascript'
import { client } from '~/lib/prismic'
import { Document } from 'prismic-javascript/types/documents'
import Link from 'next/link'

interface ICategoryProps {
  category: Document;
  products: Document[];
}

export default function Category({ products, category }: ICategoryProps) {

  const router = useRouter()

  if (router.isFallback) {
    return <p>Carrgando...</p>
  }

  return (
    <div>
      <Title>{PrismicDOM.RichText.asText(category.data.title)}</Title>
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              <Link href={`/catalog/products/${product.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(product.data.title)}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {

  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ])

  const paths = categories.results.map(category => {
    return {
      params: { slug: category.uid }
    }
  })
  return {
    paths,
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<ICategoryProps> = async (context) => {
  const { slug } = context.params;

  const category = await client().getByUID('categor', String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id)
  ])

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  }
}