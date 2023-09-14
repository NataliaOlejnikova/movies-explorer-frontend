import { NavLink } from "react-router-dom";
import './AccountButton.css'

export const AccountButton = ({ isMainPage }) => {

    let typeLink = isMainPage ? ' account-link_main' : '';

    const linkClassName = (`account-link${typeLink}`)

    return (
        <NavLink
            className={linkClassName}
            to="/profile"
        >Аккаунт</NavLink>
    )
}
export default AccountButton;