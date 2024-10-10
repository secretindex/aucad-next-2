const ChangePassword = () => {
  return (
    <section>
      <h2>Mude sua senha</h2>
      <div>
        <form className="flex flex-row gap-2">
          <div>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
            />
          </div>
          <div>
            <button>Confirmar</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ChangePassword
