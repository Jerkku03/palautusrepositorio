import React from "react";

const HaeMaat = ({haku, handleChange}) => {
    return (
    <form>
        find countries:<input value={haku} onChange={handleChange} />
      </form>
    )
}

export default HaeMaat