/* External dependencies */
import React from 'react'
import classNames from 'classnames/bind'

/* Internal dependencies */
import PopAnimation from 'components/PopAnimation'
import styles from './HomePage.module.scss'

const cx = classNames.bind(styles)

function HomePage() {
  return (
    <div className={cx('homepage-wrapper')}>
      <div className={cx('todo-list-wrapper')}>
        <PopAnimation duration={1.5} />
      </div>
    </div>
  )
}

export default HomePage
