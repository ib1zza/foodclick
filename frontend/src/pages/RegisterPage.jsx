import { Link } from "react-router-dom";
import { Chevron } from "../components/icons";

function RegisterPage() {
  return (
    <main className="foodclick-page register-page">
      <section className="register-page__shell">
        <Link className="back-link" to="/">
          <Chevron direction="left" />
          На главную
        </Link>

        <div className="register-page__grid">
          <article className="register-page__hero">
            <span className="store-badge">Профиль</span>
            <h1>Регистрация</h1>
            <p>
              Создайте аккаунт, чтобы в будущем сохранять адреса, отслеживать
              заказы и быстрее повторять любимые покупки.
            </p>

            <div className="register-page__benefits">
              <div>
                <strong>Быстрый вход</strong>
                <span>По номеру телефона и паролю</span>
              </div>
              <div>
                <strong>История заказов</strong>
                <span>Появится после подключения backend-части</span>
              </div>
              <div>
                <strong>Персональные акции</strong>
                <span>Соберём в одном месте выгодные предложения</span>
              </div>
            </div>
          </article>

          <section className="register-card">
            <div className="register-card__header">
              <span>Новый аккаунт</span>
              <h2>Введите данные</h2>
            </div>

            <form className="register-form">
              <label className="register-field">
                <span>Телефон</span>
                <input type="tel" placeholder="+7 (999) 123-45-67" />
              </label>

              <label className="register-field">
                <span>Пароль</span>
                <input type="password" placeholder="Не менее 8 символов" />
              </label>

              <button className="register-form__submit" type="button">
                Зарегистрироваться
              </button>
            </form>

            <p className="register-card__note">Уже есть аккаунт? </p>
          </section>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
