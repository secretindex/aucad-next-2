// TODO: When census table is available, display a select with all available census and add user to the list;

const AddUserTo = () => {
  // Just a template/placeholder for the add user popup

  return (
    <div className="rounded-lg shadow-md">
      <form>
        <div>
          <label htmlFor="title">Usuário</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o nome do usuário"
          />
        </div>
        <div>
          <label htmlFor="title">Censo</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o nome do censo"
          />
        </div>
      </form>
    </div>
  )
}

export default AddUserTo
