export default function LoginPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder=""
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <div className="mt-3 text-center">
                <a href="#">Esqueceu a senha?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
