import React from 'react'

const User = (props) => {
    const { img, name } = props
    return (
        <div className="userBox">
            <img src={img} className="image" alt={`${name}`s image}/>
            {/* <a href={img}>Hey</a> */}
            <h3 className="userName">{name}</h3>
            <button><a href={`https://www.instagram.com/${name}`}>View user profile</a></button>
        </div>
    )
}

export default User
