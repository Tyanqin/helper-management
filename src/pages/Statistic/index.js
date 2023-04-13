import React, {Component} from 'react';
import * as echarts from 'echarts';
import Auth from '../../utils/auth'
import './index.css'

export default class Statistic extends Component {

    componentDidMount() {
        Auth()
        let myChart = echarts.init(document.getElementById('main'));
        let option = {
            title: {
                text: 'XXXXXX'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis:{
                type: 'category',
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        };
        myChart.setOption(option);
    }
    render() {
        return (
            <div id = "stat_box">
                <div style ={{height:10}}/>
                <div id="main" style={{ width: 450, height: 400 }}></div>
            </div>

        );
    }
}
