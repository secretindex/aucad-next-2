const CreateAddText = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">Título</label>
          <input type="text" name="title" id="title" placeholder="Digite um título" />
        </div>
        <div>
          <label htmlFor="title">Mensagem</label>
          <input type="text" name="title" id="title" placeholder="Digite uma boa mensagem de recusa" />
        </div>
        <button className="">
          Enviar
        </button>
      </form>
    </div>
  )
}