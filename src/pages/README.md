## Client Side Fetching

É uma estratégia utilizada quando não precisamos que nossos dados 
não sejam indexados pelos motores de busca dos navegadores

## Server Side Rendering

Utilizamos esss estratégia quando queremos que nossos dados sejam
carregados, assim que a tela já estiver sido montada. Exemplo de SSR.

```ts
  export const getServerSideProps:GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended')
  const recammendedProducts = await response.json()

  return {
    props: {
      recammendedProducts
    }
  }
}
```
A função `getServerSideProps` não deve ser utilizada em todos os casos. Devemos realizar essa renderização pelo lado do servidor, quando queremos que apenas algumas informações estejam prontas para serem indexadas pelos motores de busca.