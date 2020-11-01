import { useRouter } from 'next/router'
import { Title } from '~/styles/pages/Home'
import PrismicDOM from 'prismic-dom'
import { client } from '~/lib/prismic'
import { Document } from 'prismic-javascript/types/documents'
import { GetStaticPaths, GetStaticProps } from 'next'

interface ProductProps {
  product: Document;
}


export default function Produto({ product }: ProductProps) {

  const router = useRouter();

  if (router.isFallback) {
    return <p>Carrgando...</p>
  }

  return (
    <div>
      <Title>{PrismicDOM.RichText.asText(product.data.title)}</Title>
      <img src={product.data.thumbnail.url} width={300} alt={product.data.title} />
      <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description) }}></div>
      <p>Price: {product.data.price}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}