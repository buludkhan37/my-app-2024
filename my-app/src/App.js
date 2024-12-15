import styles from './App.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	let isOnFirstStep = activeIndex === 0;
	let isOnLastStep = activeIndex === steps.length - 1;

	const onClickGoForward = () => {
		if (!isOnLastStep) {
			setActiveIndex(activeIndex + 1);
		}
	};

	const onClickGoBack = () => {
		if (!isOnFirstStep) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const onClickStartOver = () => {
		setActiveIndex(0);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, index) => {
							console.log(item.id);
							let stepClasses = styles['steps-item'];
							if (index < activeIndex) stepClasses += ' ' + styles.done;
							if (index === activeIndex) stepClasses += ' ' + styles.active;

							return (
								<li key={item.id} className={stepClasses}>
									<button
										onClick={() => setActiveIndex(index)}
										className={styles['steps-item-button']}
									>
										{index + 1}
									</button>
									{item.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							onClick={onClickGoBack}
							className={styles.button}
							disabled={isOnFirstStep}
						>
							Назад
						</button>
						<button
							onClick={isOnLastStep ? onClickStartOver : onClickGoForward}
							className={styles.button}
						>
							{isOnLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
