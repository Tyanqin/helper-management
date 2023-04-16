/**
 * 预览文件
 */
import React, {Component, useCallback, useState} from "react";
import PDF from "react-pdf-js";
import {Button,Pagination} from 'antd'
import {CloseOutlined} from '@ant-design/icons';
import './index.css'

export default class PdfComponent extends Component {

    state={
        currentPage:1,
        pageNumber: 20
    }

    onDocumentLoadSuccess=(pages)=> {
        this.setState({currentPage:1,pageSize:pages})
    }

    handelPage=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:this.props.detailsData.pageNumber*10
        })
    }
render() {

    return (
        <div id = "pdf_wrap">
            <div className="pdf_box">
                <div>
                    <PDF
                        // scale = {1.1}
                        style={{width:"100%",height:400}}
                        file={this.props.detailsData.ruRegUrl}
                        onDocumentComplete={this.onDocumentLoadSuccess}
                        page={this.state.currentPage}
                    />
                </div>
            </div>
            <div>
            </div>
            <Pagination
                style={{
                    marginTop:"20px",
                    zIndex:5,position: 'absolute'
                }}
                total={this.props.detailsData.pageNumber}
                defaultCurrent={1}
                onChange={this.handelPage}
            />
        </div>
    )
}
}






// export default memo(() => {
//     const [pages, setPages] = useState({ page: 1, allPages: 1 });
//
//     const getAllPages = useCallback(
//         (pageNums) => {
//             setPages((prev) => ({ ...prev, allPages: pageNums }));
//         },
//         [pages]
//     );
//
//     const nextPage = useCallback(
//         (type) => {
//             let currentPage = pages["page"];
//             if (type == "next") {
//                 // 如果是下一页
//                 if (currentPage == pages["allPages"]) {
//                     alert("已经是最后一页了");
//                 } else {
//                     setPages((prev) => ({ ...prev, page: currentPage + 1 }));
//                 }
//             } else {
//                 // 如果是上一页
//                 if (currentPage == 1) {
//                     alert("已经是第一页了");
//                 } else {
//                     setPages((prev) => ({ ...prev, page: currentPage - 1 }));
//                 }
//             }
//         },
//         [pages]
//     );
//
//     return (
//         <div>
//             <p>
//                 <button onClick={() => nextPage("up")}>上一页</button>
//                 <span>
//           {pages["page"]}/{pages["allPages"]}页
//         </span>
//                 <button onClick={() => nextPage("next")}>下一页</button>
//             </p>
//             <PDF
//                 file={pdfs} //文件地址
//                 onDocumentComplete={getAllPages}
//                 page={pages["page"]} //文件页码
//             />
//         </div>
//     );
// });



