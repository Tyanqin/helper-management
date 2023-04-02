import React, {Component,Fragment} from 'react';
import MenuComponent from '../../component/MenuComponent'
import './index.css'
export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <div id = "home_box">
                    <MenuComponent/>
                </div>
            </Fragment>

        );
    }

}




