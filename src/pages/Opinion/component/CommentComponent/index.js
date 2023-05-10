import { Comment, Avatar, Tooltip} from 'antd';
import React from 'react';
import { UserOutlined} from '@ant-design/icons';


export default class CommentComponent extends React.Component{

    render(){
        let {problemData} = this.props
        return(
            <>
                {
                    problemData.map(item=>{
                        return(<ExampleComment item = {item}/>)
                    })
                }
            </>
        )
    }






}

const ExampleComment = (props) => {
     let {item}= props
        return <Comment
            actions={[<span key="comment-nested-reply-to">回复:</span>]}
            author={<span style = {{fontSize:14}}>{item.proUserName}</span>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <div>
                    <p>{item.proDesc}</p>
                    <p className="content" style={{color:"red"}}>监督要点</p>
                    <p  className="content" style={{marginTop:10}}>{item.rule == undefined || item.rule == null?"无":item.rule.keyPoint.trim()}</p>
                </div>


            }
        >
            {
                item.replys.map((item)=>{
                    return(
                        <Comment
                            author={<span style = {{fontSize:14}}>{item.userName}</span>}
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={<p>{item.replyContent}</p>}
                            >
                        </Comment>
                    )
                })
            }
            <hr/>
        </Comment>


};

