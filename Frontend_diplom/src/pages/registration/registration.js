import styles from './registration.module.css';
import { useForm } from 'react-hook-form';
import { useResetForm } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { request } from '../../utils/request';
import { setUser } from '../../actions';
import { ROLE } from '../../constans';
import * as yup from 'yup';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUserRole } from '../../selectors';

export const Registration = () => {
	const regFormShema = yup.object().shape({
		login: yup
			.string()
			.required('Заполните логин')
			.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
			.min(3, 'Неверно заполнен логин. Минимум 3 символа')
			.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
		password: yup
			.string()
			.required('Заполните пароль')
			.matches(
				/^[\w#%]+$/,
				'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
			)
			.min(6, 'Неверно заполнен логин. Минимум 6 символа')
			.max(30, 'Неверно заполнен логин. Максимум 30 символов'),
		passcheck: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
			.required('Заполните поле повтора пароля'),
	});
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormShema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса:${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}
	return (
		<>
			<div className={styles.registration_container}>
				<div className={styles.registration_form}>
					<h1>Регистрация</h1>
					{errorMessage && (
						<div className={styles.auth_form_error}>{errorMessage}</div>
					)}
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							placeholder="Логин..."
							{...register('login', {
								onChange: () => {
									setServerError(null);
								},
							})}
						/>
						<input
							type="password"
							placeholder="Пароль..."
							{...register('password', {
								onChange: () => {
									setServerError(null);
								},
							})}
						/>
						<input
							type="password"
							placeholder="Повторите пароль..."
							{...register('passcheck', {
								onChange: () => {
									setServerError(null);
								},
							})}
						/>
						<button type="submit" disabled={!!formError}>
							Зарегестрироваться
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
