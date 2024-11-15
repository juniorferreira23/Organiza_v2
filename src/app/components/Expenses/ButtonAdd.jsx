function ButtonAdd(props) {
    return (
        <>
            <button className="btn btn-primary btn-floating" onClick={props.handle}>
                <span>+</span>
            </button>
        </>
    )
}

export default ButtonAdd