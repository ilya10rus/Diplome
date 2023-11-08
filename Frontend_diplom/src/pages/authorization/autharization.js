import { Link, Navigate } from 'react-router-dom';
import styles from './autharization.module.css';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResetForm } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { request } from '../../utils/request';
import { setUser } from '../../actions';
import { ROLE } from '../../constans';

const authFormShema = yup.object().shape({
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
});

export const Autharization = () => {
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
		},
		resolver: yupResolver(authFormShema),
	});
	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса:${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}

	return (
		<div className={styles.authorization_container}>
			<div className={styles.authorization_form}>
				<h1>Авторизация</h1>
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
					<button type="submit" disabled={!!formError}>
						Авторизоваться
					</button>
				</form>
				<Link to="/registration">Зарегистрироваться</Link>
			</div>
		</div>
	);
};
