import { FC } from "react";
import { PostsDataType } from "../../types/types";


type PropsType = {
    newsPosts : Array<PostsDataType>
}

let News: FC<PropsType> = (props) => {
    

    let postsElements = props.newsPosts.map((el) => <Post newsPosts={props.newsPosts}>)

    return (
        <div>
            
        </div>
    )
}

export default News;