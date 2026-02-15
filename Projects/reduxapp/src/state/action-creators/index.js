const depositMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "DEPOSIT",
            payload: amount
        })
    }
}

const withdrawMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "WITHDRAW",
            payload: amount
        })
    }
}

export { depositMoney, withdrawMoney }