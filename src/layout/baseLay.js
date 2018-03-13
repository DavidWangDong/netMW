import React, { Component } from 'react'

class BaseLay extends Component {
    constructor(props) {
        super(props)
        
    }

    render () {
        return <div className={`component ${this.props.displayName} before`}>
                    <div className={`${this.props.displayName}-inner`}>
                        {this.props.children}
                    </div>
               </div>
    }
    
}

export default BaseLay