import React,{useState,useEffect,useCallback,Component} from 'react'
import { useParams } from 'react-router-dom'
import {Button,Pagination} from 'antd'
import {CloseOutlined} from '@ant-design/icons';
import PDF from 'react-pdf-js';
import './index.css'
// import {regGetId} from "../../../../api/req";


 // const PdfComponent=()=>{
 //
 //    const params = useParams()
 //
 //
 //    useEffect(()=>{
 //        console.log('pdf组件参数：', params)
 //        handelGetDetails()
 //    },[])
 //
 //
 //    const handelGetDetails=async()=>{
 //         console.log("text===>>>",params.id)
 //         const result = await regGetId(params.id)
 //         if(result.status === 200){
 //             console.log("result===>>>",result)
 //
 //         }
 //     }
 //
 //    return(
 //        <div id = "pdf_wrap">
 //            {/*<Pagination*/}
 //                {/*style={{*/}
 //                    {/*marginTop:"743px", zIndex:5,position: 'absolute'*/}
 //                {/*}}*/}
 //                {/*// total={this.props.detailsData.pageNumber}*/}
 //                {/*defaultCurrent={1}*/}
 //                {/*// onChange={this.handelPage}*/}
 //            {/*/>*/}
 //            {/*<Button*/}
 //                {/*type="primary"*/}
 //                {/*id = "pdf_wrap_close"*/}
 //                {/*icon={<CloseOutlined />}*/}
 //                {/*// onClick = {this.handelClose}*/}
 //            {/*>关闭*/}
 //            {/*</Button>*/}
 //            {/*<div className="pdf_box">*/}
 //                {/*<div>*/}
 //                    {/*<PDF*/}
 //                        {/*scale={1.2}*/}
 //                        {/*// style={{width:"50%"}}*/}
 //                        {/*// file={this.props.detailsData.ruRegUrl}*/}
 //                        {/*file={`http://192.168.197.139:9000/test-bucket2/1680490449579.pdf`}*/}
 //                        {/*onDocumentComplete={this.onDocumentLoadSuccess}*/}
 //                        {/*page={this.state.currentPage}*/}
 //                    {/*/>*/}
 //                {/*</div>*/}
 //            {/*</div>*/}
 //            {/*<div>*/}
 //
 //            {/*</div>*/}
 //        </div>
 //    )



// }
// export default PdfComponent



export default class PdfComponent extends Component {


    componentDidMount() {

    }

    state={
        currentPage:1,
        pageNumber: 20
    }


    render() {
        return (
            <div id = "pdf_wrap"
                 style = {{display:this.props.display}}>
                <Pagination
                    style={{
                        marginTop:"743px",
                        zIndex:5,position: 'absolute'
                    }}
                    total={this.props.detailsData.pageNumber}
                    defaultCurrent={1}
                    onChange={this.handelPage}
                />
                <Button
                    type="primary"
                    id = "pdf_wrap_close"
                    icon={<CloseOutlined />}
                    onClick = {this.handelClose}
                >关闭
                </Button>
                <div className="pdf_box">
                    <div>
                        <PDF
                            scale={1.2}
                                // style={{width:"50%"}}
                            file={this.props.detailsData.ruRegUrl}
                            // file={`http://192.168.197.139:9000/test-bucket2/1680490449579.pdf`}
                            onDocumentComplete={this.onDocumentLoadSuccess}
                            page={this.state.currentPage}
                        />
                    </div>
                </div>
                <div>
                </div>
            </div>
        );
    }

     //不显示PDF
    handelClose=()=>{
        this.props.handelDisPlay()
    }

    onDocumentLoadSuccess=(pages)=> {
        console.log("page==>>>>",pages)
        this.setState({currentPage:1,pageSize:pages})
    }

    handelPage=(page,pageSize)=>{
        console.log("page====>>>>",page)
        console.log("pageSize====>>>>",pageSize)
        this.setState({
            currentPage:page,
            pageSize:this.props.detailsData.pageNumber*10
        })
    }
}
