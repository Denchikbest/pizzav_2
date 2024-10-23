import React from 'react';

import styles from './HotFaundBlock.module.scss'

export const HotFaundBlock: React.FC= () => {
  return (
    <div className= {styles.root}>
      <h1 >
        <span>❤</span>
        <br /> no man
      </h1>
    <p className={styles.description}> Она временно закрыта , но откроется в ближайщее время</p>

    </div>
  );
};
export default HotFaundBlock;