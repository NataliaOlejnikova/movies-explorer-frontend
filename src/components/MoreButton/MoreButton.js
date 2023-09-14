import './MoreButton.css';

function MoreButton({ isShown, loadMore }) {
    const moreBtnShown = `cards__button ${isShown ? 'cards__button' : 'cards__button_hidden'}`;

    return (
        <div className="more">
        <button
            type='button'
            onClick={loadMore}
            className={moreBtnShown}>
            Ещё
        </button>
        </div>
    );
}

export default MoreButton;