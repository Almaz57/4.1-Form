import styles from './App.module.css';
import { useRef } from 'react';
import { Input } from '../../components';
import { useStore } from '../features/useStore';
import { useErrors } from '../features/useErrors';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const submitButtonRef = useRef(null);

	// Обновление данных
	const { getState, updateState, resetState } = useStore();
	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
		resetState();
	};
	const { email, password, repeatPassword } = getState();

	// Обновление ошибки
	const { onChange, onEmailBlur, emailError, passwordError, repeatPasswordError } = useErrors(
		updateState,
		submitButtonRef,
		password,
		repeatPassword,
	);

	return (
		<>
			<form className={styles.form} onSubmit={onSubmit}>
				<h2 className={styles['form-title']}>Регистрация</h2>

				<Input
					labelName="Email"
					error={emailError}
					type="email"
					name="email"
					placeholder="Почта"
					value={email}
					onChange={onChange}
					onBlur={onEmailBlur}
				></Input>

				<Input
					labelName="Пароль"
					error={passwordError}
					type="password"
					name="password"
					placeholder="Пароль"
					value={password}
					onChange={onChange}
				></Input>

				<Input
					labelName="Повторите пароль"
					error={repeatPasswordError}
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					value={repeatPassword}
					onChange={onChange}
				></Input>

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
