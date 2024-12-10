import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const onInputButtonClick = () => {
		let promtValue = prompt('Введите значениe');
		if (promtValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setValue('');
		} else {
			setValue(promtValue);
			setError('');
		}
	};

	const isValueValid = value.length >= 3;

	const currentDate = new Date();
	const formatedDate = ` - ${String(currentDate.getDate())}.${String(currentDate.getMonth() + 1)}.${String(currentDate.getFullYear())} ${String(currentDate.getHours())}:${String(currentDate.getMinutes())}:${String(currentDate.getSeconds())}`;
	const updatedList = [...list, { id: Date.now(), value, createdAt: formatedDate }];

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			setList(updatedList);
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles.buttonsContainer}>
				<button onClick={onInputButtonClick} className={styles.button}>
					Ввести новое
				</button>
				<button
					onClick={onAddButtonClick}
					className={styles.button}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length === 0 && (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				)}
				<ul className={styles.list}>
					{list.map((item) => (
						<li key={item.id} className={styles.listItem}>
							{item.value}
							<span>{item.createdAt}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
