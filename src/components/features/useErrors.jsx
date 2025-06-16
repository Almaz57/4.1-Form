import { useState } from 'react';

const errValid = {
	email: {
		regex: {
			value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
			msg: 'Некорректный формат Email',
		},
		absent: {
			msg: 'Email обязателен для заполнения',
		},
	},
	pass: {
		regex: {
			value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).+$/,
			msg: 'Пароль должен содержать: цифру, заглавную и строчную буквы',
		},
		absent: {
			msg: 'Пароль обязателен для заполнения',
		},
		min: {
			value: 8,
			msg: 'Минимум 8 символов',
		},
	},
	repPass: {
		match: {
			msg: 'Пароли не совпадают',
		},
	},
};

export const useErrors = (updateState, submitButtonRef, password, repeatPassword) => {
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);

	const onEmailChange = (email) => {
		const regex = errValid.email.regex.value;
		if (regex.test(email)) setEmailError(null); // показать сразу, что нет ошибки
	};

	const onEmailBlur = ({ target }) => {
		const email = target.value;
		const regex = errValid.email.regex.value;
		let newError = null;
		if (!regex.test(email)) newError = errValid.email.regex.msg;
		if (!email) newError = errValid.email.absent.msg;
		setEmailError(newError); // показать потом, что есть ошибка
	};

	const onPasswordChange = (password) => {
		const regex = errValid.pass.regex.value;
		let newError = null;
		if (password.length < errValid.pass.min.value) newError = errValid.pass.min.msg;
		if (!regex.test(password)) newError = errValid.pass.regex.msg;
		if (!password) newError = errValid.pass.absent.msg;
		setPasswordError(newError);
	};

	const onRepeatPasswordChange = (pass) => {
		let newError = null;
		if (pass !== password && pass !== repeatPassword) newError = errValid.repPass.match.msg;
		setRepeatPasswordError(newError);
		if (!emailError && !newError) setTimeout(() => submitButtonRef.current.focus(), 0);
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
		if (target.name === 'email') onEmailChange(target.value);
		if (target.name === 'password') onPasswordChange(target.value);
		if (target.name !== 'email') onRepeatPasswordChange(target.value);
	};

	return {
		onChange,
		onEmailBlur,
		emailError,
		passwordError,
		repeatPasswordError,
	};
};
