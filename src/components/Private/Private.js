import React, {Component} from 'react'
import axios from 'axios'
import './Private.css'
import {connect} from 'react-redux'
import {updateUser} from '../../ducks/reducer'
import {clearUser} from '../../ducks/reducer'

class Private extends Component {
    componentDidMount() {
        this.getUser()

    }
    getUser = async () => {
        const {id} = this.props
        if(!id) {
            try {
                let res = await axios.get('/api/current')
                this.props.updateUser(res.data)
            } catch (err) {
                this.props.history.push('/')
            }
        }

        

    }
    logout = async () => {
        await axios.post('/auth/logout')
        this.props.clearUser()
        this.props.history.push('/')
    }

    render() {
        const {username, img, balance} = this.props
        return(
            <div>
                <h1>{username}</h1>
                <img src={img} alt='user' />
                <p>{balance}</p>
                <button onClick={this.logout}>Log Out</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState
}
const mapDispatchToProps ={
    clearUser,
    updateUser

}


export default connect(mapStateToProps, mapDispatchToProps)(Private);