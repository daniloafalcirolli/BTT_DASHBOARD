import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubMenu.module.css';
import { FiCircle, FiChevronRight } from "react-icons/fi";

const SubMenu = ({ item, sidebar }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <li>
                <Link to={item.path} onClick={item.subNav && showSubnav} className={styles.sidebarLink}>
                    {item.icon}

                    {sidebar &&
                        <>
                            <span className={styles.sidebarLabel}>{item.title}</span>
                            <div>
                                {item.subNav && subnav
                                    ? <FiChevronRight className={styles.rotate} />
                                    : item.subNav
                                        ? <FiChevronRight />
                                        : null}
                            </div>
                        </>
                    }
                </Link>
                {subnav &&
                    <ul>
                        {
                            item.subNav.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={item.path} className={styles.dropdownLink}>
                                            <FiCircle />
                                            {sidebar && <span className={styles.sidebarLabel}>{item.title}</span>}
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                }
            </li>
        </>
    );
};

export default SubMenu;