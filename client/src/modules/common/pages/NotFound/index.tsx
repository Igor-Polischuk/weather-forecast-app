import { FC } from 'react';
import styles from './styles.module.scss';

export const NotFound: FC = () => {
    return (
        <div className={styles.page}>
            <h1>404</h1>
            <p>Oops! We are having trouble finding your page.</p>
        </div>
    );
};