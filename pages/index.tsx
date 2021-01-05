
export default function Home() {
  return (
    <div>
      <h1>
        Gerador de Imagens:
      </h1>

      <div>
        <img src="https://placehold.it/500x500?text=Passa a manteiga em cima do botão de like" />
        <img src="/api/image-generator?title=Imagem Gerada" />
      </div>

      <a href="/api/image-generator?title=Imagem Gerada">
        /api/image-generator?title=Imagem Gerada
      </a>
    </div>
  )
}
