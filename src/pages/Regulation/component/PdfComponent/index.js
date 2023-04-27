import React, { memo, useCallback, useState } from "react";
//react预览pdf文件插件
import PDF from "react-pdf-js";
import './index.css'
import {Button, Pagination} from "antd";

export default memo((props) => {
    const [pages, setPages] = useState({ page: 1, allPages: 1 });

    const getAllPages = useCallback(
        (pageNums) => {
            setPages((prev) => ({ ...prev, allPages: pageNums }));
        },
        [pages]
    );

    const nextPage = useCallback(
        (type) => {
            let currentPage = pages["page"];
            if (type == "next") {
                // 如果是下一页
                if (currentPage == pages["allPages"]) {
                    alert("已经是最后一页了");
                } else {
                    setPages((prev) => ({ ...prev, page: currentPage + 1 }));
                }
            } else {
                // 如果是上一页
                if (currentPage == 1) {
                    alert("已经是第一页了");
                } else {
                    setPages((prev) => ({ ...prev, page: currentPage - 1 }));
                }
            }
        },
        [pages]
    );

   const handelExit=()=>{
        props.close()
       setPages((prev) => ({ ...prev, page: 1 }));
    }

    return (
        <div className="pdf_wrap">

            <PDF
                scale={1.1}
                file={props.detailsData.ruRegUrl} //文件地址
                onDocumentComplete={getAllPages}
                page={pages["page"]} //文件页码
            />

            <div className="pagination">
                <p>
                    <Button onClick={() => nextPage("up")}>上一页</Button>
                    <span>
          {pages["page"]}/{pages["allPages"]}页
           </span>
                    <Button onClick={() => nextPage("next")}>下一页</Button>
                    <Button type="primary" onClick={handelExit} style = {{width:120,marginLeft:30}}>
                        退出
                    </Button>
                </p>
            </div>

            {/*<Pagination*/}
                {/*style={{*/}
                    {/*marginTop:"20px",*/}
                    {/*zIndex:5,position: 'absolute'*/}
                {/*}}*/}
                {/*total={this.props.detailsData.pageNumber}*/}
                {/*defaultCurrent={1}*/}
                {/*onChange={this.handelPage}*/}
            {/*/>*/}
        </div>
    );
});

