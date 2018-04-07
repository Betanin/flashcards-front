import React, { Component } from 'react';
import styles from './Box.css';

class Box extends Component {

    render() {

        const { extraStyle } = this.props;

        return (
            <div className={styles.container}>
                <div className={[styles.box, extraStyle].join(' ')}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default Box;
