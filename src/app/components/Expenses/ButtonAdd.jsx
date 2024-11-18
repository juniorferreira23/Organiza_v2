function ButtonAdd(props) {
    return (
        <>
            <button className="btn btn-primary btn-floating m-1" onClick={props.handle}>
                <span>+</span>
            </button>
        </>
    )
}

export default ButtonAdd