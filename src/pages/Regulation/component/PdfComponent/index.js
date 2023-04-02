import React, {Component} from 'react';
import {Button,Pagination} from 'antd'
import {CloseOutlined} from '@ant-design/icons';
import PDF from 'react-pdf-js';
import './index.css'

export default class PdfComponent extends Component {

    state={
        currentPage:1,
        pageNumber: 900
    }

    render() {
        console.log("this.props.detailsData.ruRegUrl====》》》》",this.props.detailsData.ruRegUrl)
        console.log("this.props.detailsData.ruRegUrl====》》》》",this.props.detailsData.pageNumber)

        return (
            <div id = "pdf_wrap" style = {{display:this.props.display}}>
                <Pagination
                    style={{
                        marginTop:"743px",
                        zIndex:5,position: 'absolute'
                    }}
                    total={this.state.pageNumber}
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
                            // file={this.props.detailsData.ruRegUrl}
                            file={`http://127.0.0.1:9000/test/1680423452612.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YU2EDPS56OLT0HPQ92S3%2F20230402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230402T123325Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJZVTJFRFBTNTZPTFQwSFBROTJTMyIsImV4cCI6MTY4MDQ2NjI5MCwicGFyZW50IjoibWluaW9hZG1pbiJ9.sjvGJEZp1YfSNF5WIiCSCxNYwHuKhgpir9pVwVtFklu--Fa_iA7DVV8RPwiENNIjV0isVyyMrFtgj1zgw8_y0A&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=bd655522daccfbb24ac487a14edb1f156fd8146f78bc1d4876c8d3b93971bbaa`}
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
        this.setState({currentPage:1,pageSize:pages})
    }

    handelPage=(page,pageSize)=>{
        console.log("page====>>>>",page)
        console.log("pageSize====>>>>",pageSize)
        this.setState({currentPage:page,pageSize:pageSize})
    }
}
