import { useStore } from '../features/useStore';
import styles from './App.module.css';
import { useRef, useState } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	// Валидация почты и пароля
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);
	const submitButtonRef = useRef(null);

	const onEmailChange = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		if (regex.test(email)) setEmailError(null); // показать сразу, что нет ошибки
	};

	const onEmailBlur = ({ target }) => {
		const email = target.value;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		let newError = null;
		if (!regex.test(email)) newError = 'Некорректный формат Email';
		if (!email) newError = 'Email обязателен для заполнения';
		setEmailError(newError); // показать потом, что есть ошибка
	};

	const onPasswordChange = (password) => {
		const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).+$/;
		let newError = null;
		if (password.length < 8) newError = 'Минимум 8 символов';
		if (!regex.test(password))
			newError = 'Пароль должен содержать: цифру, заглавную и строчную буквы';
		if (!password) newError = 'Пароль обязателен для заполнения';
		setPasswordError(newError);
	};

	const onRepeatPasswordChange = (pass) => {
		let newError = null;
		if (pass !== password && pass !== repeatPassword) newError = 'Пароли не совпадают';
		setRepeatPasswordError(newError);
		if (!emailError && !newError) setTimeout(() => submitButtonRef.current.focus(), 0);
	};

	// Обновление данных
	const { getState, updateState } = useStore();
	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};
	const { email, password, repeatPassword } = getState();
	const onChange = ({ target }) => {
		updateState(target.name, target.value);
		if (target.name === 'email') onEmailChange(target.value);
		if (target.name === 'password') onPasswordChange(target.value);
		if (target.name !== 'email') onRepeatPasswordChange(target.value);
	};

	return (
		<>
			<form className={styles.form} onSubmit={onSubmit}>
				<h2 className={styles['form-title']}>Регистрация</h2>

				<div className={styles['form-group']}>
					<label>Email</label>
					<input
						className={styles['form-input']}
						name="email"
						type="email"
						placeholder="Почта"
						value={email}
						onChange={onChange}
						onBlur={onEmailBlur}
					/>
					{emailError && <div className={styles['error-message']}>{emailError}</div>}
				</div>

				<div className={styles['form-group']}>
					<label>Пароль</label>
					<input
						className={styles['form-input']}
						name="password"
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={onChange}
					/>
					{passwordError && (
						<div className={styles['error-message']}>{passwordError}</div>
					)}
				</div>

				<div className={styles['form-group']}>
					<label>Повторите пароль</label>
					<input
						className={styles['form-input']}
						name="repeatPassword"
						type="password"
						placeholder="Повторите пароль"
						value={repeatPassword}
						onChange={onChange}
					/>
					{repeatPasswordError && (
						<div className={styles['error-message']}>{repeatPasswordError}</div>
					)}
				</div>

				<button
					ref={submitButtonRef}
					className={styles['submit-btn']}
					type="submit"
					disabled={!!passwordError || !!repeatPasswordError || !!emailError}
				>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
};
