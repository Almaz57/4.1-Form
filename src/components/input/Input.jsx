import styles from './input.module.css';

export const Input = ({ labelName, error, ...props }) => {
	return (
		<>
			<div className={styles['form-group']}>
				<label>{labelName}</label>
				<input className={styles['form-input']} {...props} />
				{error && <div className={styles['error-message']}>{error}</div>}
			</div>
		</>
	);
};
