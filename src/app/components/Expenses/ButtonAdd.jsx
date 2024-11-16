function ButtonAdd(props) {
    return (
        <>
            <button className="btn btn-primary btn-floating m-4" onClick={props.handle}>
                <span>+</span>
            </button>
        </>
    )
}

export default ButtonAdd