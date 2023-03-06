import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData/SidebarData';
import SubMenu from './SubMenu/SubMenu';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const [sidebar, setSidebar] = React.useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className={`${ styles.sidebar } ${ sidebar && styles.sidebarActive }`}>
                <div className={styles.nav}>
                    <Link to='#'>
                        <button onClick={showSidebar} className={`${ styles.iconMenu } ${ sidebar && styles.iconMenuActive }`}></button>
                    </Link>
                </div>
                <nav className={styles.sidebarNav}>
                    <ul className={styles.sidebarWrap}>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} sidebar={sidebar} />;
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;