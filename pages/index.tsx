
export default function Home() {
  return (
    <div>
      <h1>
        Gerador de Imagens:
      </h1>

      <div>
        <img src="http://localhost:3000/api/image-generator?title=Imagem Gerada" />
      </div>

      <a href="http://localhost:3000/api/image-generator?title=Imagem Gerada">
        http://localhost:3000/api/image-generator?title=Imagem Gerada
      </a>
    </div>
  )
}
